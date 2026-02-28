import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return _stripe;
}

export const PRICE_IDS = {
  premium: {
    monthly: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_MONTHLY_PRICE_ID!,
    annual: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_ANNUAL_PRICE_ID!,
  },
} as const;
