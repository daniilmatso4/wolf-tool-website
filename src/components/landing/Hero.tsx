'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Zap, Target, Mail, DollarSign, Flame, Gem } from 'lucide-react';
import WolfLogo from '@/components/icons/WolfLogo';

const socialProofIcons = [
  { Icon: WolfLogo, color: 'text-gold' },
  { Icon: Flame, color: 'text-orange-400' },
  { Icon: Gem, color: 'text-purple-400' },
  { Icon: Zap, color: 'text-yellow-400' },
  { Icon: Target, color: 'text-blue-400' },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-8"
        >
          <Zap className="w-4 h-4 text-gold" />
          <span className="text-gold text-sm font-medium">AI-Powered Sales Agents</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
        >
          <span className="text-white">Sell Like a </span>
          <span className="gold-gradient">Wolf</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Deploy AI agents that prospect on LinkedIn, craft personalized outreach,
          and close deals&mdash;while you level up with a gamified sales experience
          inspired by Wall Street.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/download"
            className="btn-gold text-lg px-8 py-3 flex items-center gap-2 group"
          >
            Download Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/#features"
            className="btn-outline text-lg px-8 py-3 flex items-center gap-2"
          >
            <Play className="w-5 h-5" />
            See How It Works
          </Link>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <div className="flex -space-x-2">
            {socialProofIcons.map(({ Icon, color }, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-navy-800 border-2 border-navy-700 flex items-center justify-center"
              >
                {Icon === WolfLogo ? (
                  <Icon size={20} className={color} />
                ) : (
                  <Icon className={`w-5 h-5 ${color}`} />
                )}
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm">
            Free to download &mdash; start closing today
          </p>
        </motion.div>

        {/* App preview mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="relative rounded-xl overflow-hidden border border-navy-700/50 shadow-2xl shadow-gold/5">
            {/* Browser chrome */}
            <div className="bg-navy-950 px-4 py-3 flex items-center gap-2 border-b border-navy-700/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-gray-500">Wolf Tool</span>
              </div>
            </div>
            {/* Mock dashboard */}
            <div className="bg-navy-900 p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Leads Found', value: '1,247', change: '+24%', Icon: Target, color: 'text-blue-400' },
                  { label: 'Messages Sent', value: '856', change: '+18%', Icon: Mail, color: 'text-green-400' },
                  { label: 'Deals Closed', value: '47', change: '+32%', Icon: DollarSign, color: 'text-gold' },
                ].map((stat) => (
                  <div key={stat.label} className="card flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-navy-800 flex items-center justify-center">
                      <stat.Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-gray-400">{stat.label}</p>
                    </div>
                    <span className="ml-auto text-xs text-green-400 font-medium">{stat.change}</span>
                  </div>
                ))}
              </div>
              {/* Agent status row */}
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Jordan', Icon: WolfLogo, status: 'Prospecting...', color: 'border-gold/40', iconColor: 'text-gold' },
                  { name: 'Donnie', Icon: Flame, status: 'Following up...', color: 'border-blue-400/40', iconColor: 'text-blue-400' },
                  { name: 'Naomi', Icon: Gem, status: 'Analyzing brand...', color: 'border-purple-400/40', iconColor: 'text-purple-400' },
                ].map((agent) => (
                  <div key={agent.name} className={`card flex items-center gap-2 flex-1 min-w-[200px] border ${agent.color}`}>
                    {agent.Icon === WolfLogo ? (
                      <agent.Icon size={20} className={agent.iconColor} />
                    ) : (
                      <agent.Icon className={`w-5 h-5 ${agent.iconColor}`} />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-white">{agent.name}</p>
                      <p className="text-xs text-gray-400">{agent.status}</p>
                    </div>
                    <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
