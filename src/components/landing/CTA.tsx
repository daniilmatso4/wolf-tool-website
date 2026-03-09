'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Clock } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Layered glow effects */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[500px] bg-gold/[0.04] rounded-full blur-[120px] animate-glow-pulse" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[400px] h-[300px] bg-gold/[0.06] rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gold/70 text-sm font-semibold tracking-widest uppercase mb-6"
          >
            Get Started
          </motion.p>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-8 tracking-tight leading-[0.95]">
            <span className="text-white">Ready to Become<br />the </span>
            <span className="gold-gradient">Wolf?</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Download Wolf Tool for free. Get the full sales toolkit &mdash;
            pipeline, leads, gamification, analytics. Add AI agents when you&apos;re ready.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              href="/download"
              className="btn-gold text-lg px-12 py-5 inline-flex items-center gap-3 group"
            >
              Download Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500"
          >
            {[
              { Icon: Zap, text: '100% free core app' },
              { Icon: Shield, text: 'No credit card required' },
              { Icon: Clock, text: 'AI agents available as upgrade' },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <Icon className="w-4 h-4 text-gold/60" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
