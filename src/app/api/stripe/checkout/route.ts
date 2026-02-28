import { NextResponse } from 'next/server';
import { getStripe, PRICE_IDS } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { tierId, interval } = await request.json();
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get or create Stripe customer
    let customerId: string;
    const { data: customer } = await supabase
      .from('customers')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    if (customer?.stripe_customer_id) {
      customerId = customer.stripe_customer_id;
    } else {
      const stripeCustomer = await getStripe().customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      });
      customerId = stripeCustomer.id;

      await supabase.from('customers').upsert({
        user_id: user.id,
        stripe_customer_id: customerId,
      });
    }

    // Get price ID
    const tierPrices = PRICE_IDS[tierId as keyof typeof PRICE_IDS];
    if (!tierPrices) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }
    const priceId = interval === 'annual' ? tierPrices.annual : tierPrices.monthly;

    // Create checkout session
    const session = await getStripe().checkout.sessions.create({
      customer: customerId,
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
      subscription_data: {
        trial_period_days: 7,
        metadata: { supabase_user_id: user.id },
      },
      metadata: { supabase_user_id: user.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
