-- Discord & Gamification Schema
-- Links Discord users to Wolf Tool accounts and stores synced gamification data

-- Discord user verification table
create table if not exists public.discord_users (
  discord_id text primary key,
  user_id uuid references auth.users on delete cascade not null,
  email text not null,
  verified_at timestamptz not null default now(),
  guild_id text not null
);

alter table public.discord_users enable row level security;

create policy "Service role full access on discord_users"
  on public.discord_users for all using (true) with check (true);

create index if not exists idx_discord_users_user_id on public.discord_users(user_id);

-- Gamification profiles (synced from Electron app)
create table if not exists public.gamification_profiles (
  user_id uuid references auth.users on delete cascade primary key,
  username text not null default 'Broker',
  xp integer not null default 0,
  level integer not null default 1,
  streak_days integer not null default 0,
  total_calls integer not null default 0,
  total_emails integer not null default 0,
  total_meetings integer not null default 0,
  total_deals integer not null default 0,
  total_leads integer not null default 0,
  synced_at timestamptz default now()
);

alter table public.gamification_profiles enable row level security;

create policy "Service role full access on gamification_profiles"
  on public.gamification_profiles for all using (true) with check (true);

create policy "Users can view own gamification profile"
  on public.gamification_profiles for select using (auth.uid() = user_id);

create index if not exists idx_gamification_profiles_xp on public.gamification_profiles(xp desc);

-- Gamification achievements (synced from Electron app)
create table if not exists public.gamification_achievements (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  achievement_id text not null,
  achievement_name text not null,
  achievement_description text,
  unlocked_at timestamptz not null default now(),
  announced boolean not null default false,
  unique(user_id, achievement_id)
);

alter table public.gamification_achievements enable row level security;

create policy "Service role full access on gamification_achievements"
  on public.gamification_achievements for all using (true) with check (true);

create policy "Users can view own achievements"
  on public.gamification_achievements for select using (auth.uid() = user_id);

create index if not exists idx_gamification_achievements_user on public.gamification_achievements(user_id);
create index if not exists idx_gamification_achievements_unannounced on public.gamification_achievements(announced) where announced = false;
