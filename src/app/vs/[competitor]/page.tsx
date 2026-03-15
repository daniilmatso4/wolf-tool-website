'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X, Minus, ArrowRight, Trophy, Zap, Shield, Crown, Download } from 'lucide-react';
import { COMPETITORS } from '@/lib/constants';
import type { Competitor } from '@/lib/constants';
import WolfLogo from '@/components/icons/WolfLogo';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const rowVariant = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

function FeatureValue({ value }: { value: string | boolean }) {
  if (value === true) {
    return (
      <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center">
        <Check className="w-4 h-4 text-emerald-400" />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="w-7 h-7 rounded-full bg-red-500/10 flex items-center justify-center">
        <X className="w-4 h-4 text-red-400" />
      </div>
    );
  }
  return <span className="text-sm text-gray-400">{value}</span>;
}

export default function CompetitorPage() {
  const params = useParams();
  const slug = params.competitor as string;
  const data: Competitor | undefined = COMPETITORS[slug];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Competitor not found</h1>
          <p className="text-gray-400 mb-8">We don&apos;t have a comparison for that product yet.</p>
          <Link href="/" className="btn-gold px-6 py-3">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          {/* Logos */}
          <div className="flex items-center justify-center gap-6 mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
              <WolfLogo size={36} className="text-gold" />
            </div>
            <span className="text-2xl font-bold text-navy-600">vs</span>
            <div className="w-16 h-16 rounded-2xl bg-navy-800 border border-navy-700/50 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-400">{data.name.charAt(0)}</span>
            </div>
          </div>

          <p className="text-gold/70 text-sm font-semibold tracking-widest uppercase mb-4">Comparison</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
            <span className="text-white">Wolf Tool vs </span>
            <span className="gold-gradient">{data.name}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {data.tagline}
          </p>
        </motion.div>

        {/* Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="card p-7 border-navy-700/30 mb-12"
        >
          <p className="text-gray-300 leading-relaxed">{data.description}</p>
        </motion.div>

        {/* Pricing comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16"
        >
          <div className="card p-6 border-gold/20">
            <div className="flex items-center gap-3 mb-4">
              <WolfLogo size={22} className="text-gold" />
              <h3 className="text-lg font-bold text-white">Wolf Tool</h3>
            </div>
            <p className="text-3xl font-black text-gold mb-1">Free</p>
            <p className="text-sm text-gray-500">Core app free forever. Premium with AI agents at $50/mo.</p>
          </div>
          <div className="card p-6 border-navy-700/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-6 rounded-md bg-navy-700 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-400">{data.name.charAt(0)}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-300">{data.name}</h3>
            </div>
            <p className="text-3xl font-black text-gray-300 mb-1">{data.price}</p>
            <p className="text-sm text-gray-500">Paid plans required for core features.</p>
          </div>
        </motion.div>

        {/* Feature comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
            Feature-by-Feature <span className="gold-gradient">Comparison</span>
          </h2>

          <div className="card p-0 overflow-hidden border-navy-700/30">
            {/* Table header */}
            <div className="grid grid-cols-3 bg-navy-800/50 border-b border-navy-700/30 px-6 py-4">
              <span className="text-sm font-semibold text-gray-400">Feature</span>
              <div className="text-center">
                <span className="text-sm font-bold text-gold">Wolf Tool</span>
              </div>
              <div className="text-center">
                <span className="text-sm font-bold text-gray-400">{data.name}</span>
              </div>
            </div>

            {/* Table rows */}
            <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {data.features.map((row, i) => (
                <motion.div
                  key={row.feature}
                  variants={rowVariant}
                  className={`grid grid-cols-3 items-center px-6 py-4 ${
                    i % 2 === 0 ? 'bg-navy-900/30' : ''
                  } ${i < data.features.length - 1 ? 'border-b border-navy-700/20' : ''}`}
                >
                  <span className="text-sm text-gray-300 font-medium">{row.feature}</span>
                  <div className="flex justify-center">
                    <FeatureValue value={row.wolf} />
                  </div>
                  <div className="flex justify-center">
                    <FeatureValue value={row.competitor} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Why Wolf Tool wins */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-7 border-gold/15"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <Crown className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Why Wolf Tool Wins</h3>
            </div>
            <div className="space-y-4">
              {data.wolfAdvantages.map((advantage, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{advantage}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card p-7 border-navy-700/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Minus className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Where {data.name} Falls Short</h3>
            </div>
            <div className="space-y-4">
              {data.competitorWeaknesses.map((weakness, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 text-red-400" />
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{weakness}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-16 relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[500px] h-[300px] bg-gold/[0.04] rounded-full blur-[100px]" />
          </div>
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-white">Ready to switch from </span>
              <span className="gold-gradient">{data.name}?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-lg mx-auto mb-8">
              Download Wolf Tool for free and see the difference AI agents make.
            </p>
            <Link
              href="/download"
              className="btn-gold text-lg px-10 py-4 inline-flex items-center gap-2.5 group"
            >
              <Download className="w-5 h-5" />
              Download Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-gold/60" />
                Free forever core
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-gold/60" />
                No credit card
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-gold/60" />
                Switch in 5 minutes
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other comparisons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-t border-navy-700/20 pt-12"
        >
          <h3 className="text-lg font-semibold text-white text-center mb-6">Other Comparisons</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.values(COMPETITORS)
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/vs/${c.slug}`}
                  className="px-5 py-2.5 rounded-xl bg-navy-800/50 border border-navy-700/30 text-sm text-gray-400 hover:text-white hover:border-gold/20 transition-all duration-200"
                >
                  vs {c.name}
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
