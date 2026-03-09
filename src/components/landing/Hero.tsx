'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Play, Zap, Target, Mail, DollarSign, Flame, Gem, TrendingUp } from 'lucide-react';
import WolfLogo from '@/components/icons/WolfLogo';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const } },
};

export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute top-20 left-[10%] w-[500px] h-[500px] bg-gold/[0.04] rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-10 right-[5%] w-[400px] h-[400px] bg-blue-500/[0.03] rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/[0.02] rounded-full blur-[120px]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center"
      >
        {/* Badge */}
        <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gold/[0.08] border border-gold/20 mb-10 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-sm font-semibold tracking-wide">AI-Powered Sales Agents</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 variants={fadeUp} className="text-6xl sm:text-7xl lg:text-8xl font-black leading-[0.95] mb-8 tracking-tight">
          <span className="text-white">Sell Like a </span>
          <span className="gold-gradient">Wolf</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p variants={fadeUp} className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          Deploy AI agents that prospect on LinkedIn, craft personalized outreach,
          and close deals&mdash;while you level up with a gamified sales pipeline
          inspired by Wall Street.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/download"
            className="btn-gold text-lg px-10 py-4 flex items-center gap-2.5 group"
          >
            Download Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
          <Link
            href="/#features"
            className="btn-outline text-lg px-10 py-4 flex items-center gap-2.5"
          >
            <Play className="w-5 h-5" />
            See How It Works
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.p variants={fadeUp} className="mt-8 text-gray-500 text-sm">
          Free to download &mdash; no credit card required
        </motion.p>

        {/* App preview mockup */}
        <motion.div
          variants={fadeUp}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="relative group">
            {/* Glow behind the mockup */}
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-gold/5 to-gold/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative rounded-2xl overflow-hidden border border-navy-700/50 shadow-2xl shadow-navy-950/50 bg-navy-950">
              {/* Browser chrome */}
              <div className="bg-navy-950 px-5 py-3.5 flex items-center gap-3 border-b border-navy-700/30">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 rounded-md bg-navy-800/50 border border-navy-700/30">
                    <span className="text-xs text-gray-500 font-mono">wolfengine.co</span>
                  </div>
                </div>
                <div className="w-[52px]" />
              </div>

              {/* Mock dashboard */}
              <div className="bg-gradient-to-b from-navy-900 to-navy-950 p-6 sm:p-8">
                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Leads Found', value: '1,247', change: '+24%', Icon: Target, color: 'text-blue-400', glowColor: 'bg-blue-400' },
                    { label: 'Messages Sent', value: '856', change: '+18%', Icon: Mail, color: 'text-emerald-400', glowColor: 'bg-emerald-400' },
                    { label: 'Deals Closed', value: '47', change: '+32%', Icon: DollarSign, color: 'text-gold', glowColor: 'bg-gold' },
                  ].map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.0 + i * 0.15, duration: 0.5 }}
                      className="card flex items-center gap-4 p-4"
                    >
                      <div className="relative">
                        <div className={`absolute inset-0 ${stat.glowColor}/20 rounded-xl blur-md`} />
                        <div className="relative w-11 h-11 rounded-xl bg-navy-800 border border-navy-700/50 flex items-center justify-center">
                          <stat.Icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.label}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                        <span className="text-xs text-emerald-400 font-semibold">{stat.change}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Agent status row */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Jordan Belfort', role: 'Prospecting...', Icon: WolfLogo, color: 'border-gold/30', iconColor: 'text-gold', dotColor: 'bg-gold' },
                    { name: 'Donnie Azoff', role: 'Following up...', Icon: Flame, color: 'border-blue-400/30', iconColor: 'text-blue-400', dotColor: 'bg-blue-400' },
                    { name: 'Naomi Lapaglia', role: 'Analyzing brand...', Icon: Gem, color: 'border-purple-400/30', iconColor: 'text-purple-400', dotColor: 'bg-purple-400' },
                  ].map((agent, i) => (
                    <motion.div
                      key={agent.name}
                      initial={{ opacity: 0, y: 15 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.4 + i * 0.12, duration: 0.5 }}
                      className={`card flex items-center gap-3 flex-1 min-w-[200px] p-3.5 border ${agent.color}`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-navy-800 flex items-center justify-center">
                        {agent.Icon === WolfLogo ? (
                          <agent.Icon size={18} className={agent.iconColor} />
                        ) : (
                          <agent.Icon className={`w-[18px] h-[18px] ${agent.iconColor}`} />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{agent.name}</p>
                        <p className="text-xs text-gray-500">{agent.role}</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${agent.dotColor} animate-pulse`} />
                        <span className="text-[10px] text-gray-500 hidden sm:inline">Active</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
