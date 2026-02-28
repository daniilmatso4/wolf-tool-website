'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X, HelpCircle } from 'lucide-react';
import { PRICING_TIERS } from '@/lib/constants';

const faqs = [
  {
    q: 'Is Wolf Tool really free?',
    a: 'Yes! The core app is 100% free — pipeline management, lead tracking, gamification, analytics, and more. You only pay if you want to unlock the AI agents for automated prospecting.',
  },
  {
    q: 'What do the AI agents do?',
    a: 'Our AI agents browse LinkedIn in real-time, find prospects matching your criteria, and craft personalized outreach messages. You review and approve every message before it\'s sent.',
  },
  {
    q: 'What is the 7-day free trial?',
    a: 'The Pro plan comes with a 7-day free trial. No credit card required. You get full access to all 3 AI agents during the trial.',
  },
  {
    q: 'Is my LinkedIn account safe?',
    a: 'Yes. Wolf Tool uses a human-in-the-loop approach where every action requires your approval. We never send messages without your explicit consent.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Absolutely. No contracts, no cancellation fees. Cancel from your account dashboard and your subscription ends at the current billing period.',
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async (tierId: string) => {
    if (tierId === 'free') return;
    setCheckoutLoading(true);
    setCheckoutError(null);
    const interval = annual ? 'annual' : 'monthly';
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tierId, interval }),
      });
      const data = await res.json();
      if (res.status === 401) {
        // Not signed in — redirect to sign-in with return URL
        window.location.href = '/sign-in?redirect=/pricing';
        return;
      }
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setCheckoutError('Network error. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Free to Use. </span>
            <span className="gold-gradient">Pay for AI.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Wolf Tool is completely free. Upgrade to Pro only if you want AI agents
            automating your outreach.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!annual ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${annual ? 'bg-gold' : 'bg-navy-600'}`}
            >
              <div
                className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${annual ? 'translate-x-7' : 'translate-x-0.5'}`}
              />
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-white' : 'text-gray-500'}`}>
              Annual
              <span className="ml-1 text-xs text-green-400">(Save 17%)</span>
            </span>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-24">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`card p-8 relative ${
                tier.popular ? 'border-gold/40 ring-1 ring-gold/20' : 'border-navy-700'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-gold-dark to-gold rounded-full text-navy-950 text-xs font-bold">
                  Unlock AI Agents
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-1">{tier.name}</h3>
                <p className="text-sm text-gray-400">{tier.description}</p>
              </div>

              <div className="mb-6">
                {tier.free ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-white">$0</span>
                    <span className="text-gray-400">forever</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-extrabold text-white">
                        ${annual ? tier.annualPrice : tier.monthlyPrice}
                      </span>
                      <span className="text-gray-400">/mo</span>
                    </div>
                    {annual && (
                      <p className="text-xs text-green-400 mt-1">
                        Billed annually (${tier.annualPrice * 12}/yr)
                      </p>
                    )}
                  </>
                )}
              </div>

              {tier.free ? (
                <Link
                  href="/download"
                  className="btn-outline w-full py-3 rounded-lg font-semibold text-sm text-center block"
                >
                  {tier.cta}
                </Link>
              ) : (
                <>
                  <button
                    onClick={() => handleCheckout(tier.id)}
                    disabled={checkoutLoading}
                    className="btn-gold w-full py-3 rounded-lg font-semibold text-sm disabled:opacity-50"
                  >
                    {checkoutLoading ? 'Redirecting...' : tier.cta}
                  </button>
                  {checkoutError && (
                    <p className="text-red-400 text-xs mt-2 text-center">{checkoutError}</p>
                  )}
                </>
              )}

              <div className="mt-6 pt-6 border-t border-navy-700/50 space-y-3">
                {tier.features.map((feature) => (
                  <div key={feature.text} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-gray-600 mt-0.5 shrink-0" />
                    )}
                    <span className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-white text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="card border-navy-700/50 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className="flex items-center justify-between p-4">
                  <span className="text-white font-medium text-sm">{faq.q}</span>
                  <HelpCircle className={`w-4 h-4 text-gray-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </div>
                {openFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
