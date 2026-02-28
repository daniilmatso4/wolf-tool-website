-- Wolf Tool Website Database Schema
-- Run this in your Supabase SQL editor

-- Profiles table (synced from Supabase Auth)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Customers table (Stripe customer mapping)
create table if not exists public.customers (
  user_id uuid references auth.users on delete cascade primary key,
  stripe_customer_id text unique not null,
  created_at timestamptz default now()
);

alter table public.customers enable row level security;

create policy "Users can view own customer record" on public.customers
  for select using (auth.uid() = user_id);

-- Subscriptions table (synced via Stripe webhooks)
create table if not exists public.subscriptions (
  id text primary key,
  user_id uuid references auth.users on delete cascade not null,
  status text not null,
  price_id text,
  quantity integer,
  cancel_at_period_end boolean default false,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  ended_at timestamptz,
  cancel_at timestamptz,
  canceled_at timestamptz,
  trial_start timestamptz,
  trial_end timestamptz
);

alter table public.subscriptions enable row level security;

create policy "Users can view own subscriptions" on public.subscriptions
  for select using (auth.uid() = user_id);

-- Index for quick subscription lookups
create index if not exists idx_subscriptions_user_id on public.subscriptions(user_id);
create index if not exists idx_subscriptions_status on public.subscriptions(status);

-- Downloads tracking table
create table if not exists public.downloads (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  version text not null,
  platform text not null default 'windows',
  downloaded_at timestamptz default now()
);

alter table public.downloads enable row level security;

create policy "Users can view own downloads" on public.downloads
  for select using (auth.uid() = user_id);

create policy "Users can insert own downloads" on public.downloads
  for insert with check (auth.uid() = user_id);

-- Changelog table
create table if not exists public.changelog (
  id uuid default gen_random_uuid() primary key,
  version text not null,
  title text not null,
  description text,
  type text not null default 'release',
  changes jsonb default '[]'::jsonb,
  published_at timestamptz default now()
);

alter table public.changelog enable row level security;

create policy "Anyone can view changelog" on public.changelog
  for select using (true);

-- Allow service role to manage subscriptions and customers (for webhooks)
-- These are needed because webhooks don't have a user context

create policy "Service role can manage subscriptions" on public.subscriptions
  for all using (true) with check (true);

create policy "Service role can manage customers" on public.customers
  for all using (true) with check (true);

create policy "Service role can manage downloads" on public.downloads
  for all using (true) with check (true);
