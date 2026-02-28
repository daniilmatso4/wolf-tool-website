'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Clock } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[400px] bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="text-white">Ready to Become the </span>
            <span className="gold-gradient">Wolf?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Download Wolf Tool for free. Get the full sales toolkit &mdash;
            pipeline, leads, gamification, analytics. Add AI agents when you&apos;re ready.
          </p>

          <Link
            href="/download"
            className="btn-gold text-lg px-10 py-4 inline-flex items-center gap-2 group animate-pulse-gold"
          >
            Download Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-gold" />
              100% free core app
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-gold" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              AI agents available as upgrade
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
