import { NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import Stripe from 'stripe';

const relevantEvents = new Set([
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'checkout.session.completed',
]);

// Helper to safely convert Stripe timestamps (number or null) to ISO string
function toISO(ts: number | null | undefined): string | null {
  return ts ? new Date(ts * 1000).toISOString() : null;
}

async function upsertSubscription(subscription: Stripe.Subscription) {
  const userId = subscription.metadata.supabase_user_id;
  if (!userId) return;

  const item = subscription.items.data[0];
  const priceId = item?.price?.id;

  // Use type assertion to access period fields that may exist in the raw API response
  // but aren't typed in newer Stripe SDK versions
  const sub = subscription as unknown as Record<string, unknown>;

  await getSupabaseAdmin().from('subscriptions').upsert({
    id: subscription.id,
    user_id: userId,
    status: subscription.status,
    price_id: priceId,
    quantity: item?.quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    current_period_start: toISO(sub.current_period_start as number | null),
    current_period_end: toISO(sub.current_period_end as number | null),
    created_at: toISO(sub.created as number | null) ?? new Date().toISOString(),
    ended_at: toISO(sub.ended_at as number | null),
    cancel_at: toISO(sub.cancel_at as number | null),
    canceled_at: toISO(sub.canceled_at as number | null),
    trial_start: toISO(sub.trial_start as number | null),
    trial_end: toISO(sub.trial_end as number | null),
  });
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (!relevantEvents.has(event.type)) {
    return NextResponse.json({ received: true });
  }

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await upsertSubscription(subscription);
        break;
      }
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.subscription) {
          const subscription = await getStripe().subscriptions.retrieve(
            session.subscription as string
          );
          // Ensure user ID is in subscription metadata
          if (!subscription.metadata.supabase_user_id && session.metadata?.supabase_user_id) {
            await getStripe().subscriptions.update(subscription.id, {
              metadata: { supabase_user_id: session.metadata.supabase_user_id },
            });
            subscription.metadata.supabase_user_id = session.metadata.supabase_user_id;
          }
          await upsertSubscription(subscription);
        }
        break;
      }
    }
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
