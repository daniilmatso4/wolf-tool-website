'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { LEVELS, ACHIEVEMENTS } from '@/lib/constants';
import { Trophy, Star, Flame, TrendingUp, Phone, PhoneCall, Mail, Send, Inbox, DollarSign, Banknote, CircleDollarSign, Zap, Dumbbell, Handshake, Globe, Search, Target, Gem } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  PhoneCall, Phone, Flame, Trophy, Mail, Send, Inbox, DollarSign, Banknote,
  CircleDollarSign, Zap, Dumbbell, Handshake, Globe, Search, Target, Gem,
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};

const badgeVariant = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 300, damping: 20 } },
};

export default function GamificationSection() {
  const levelsRef = useRef(null);
  const levelsInView = useInView(levelsRef, { once: true, margin: '-80px' });

  return (
    <section className="py-28 relative section-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-gold/70 text-sm font-semibold tracking-widest uppercase mb-4">Gamification</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
            <span className="text-white">Level Up Your </span>
            <span className="gold-gradient">Sales Game</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Every call, email, and deal earns XP. Climb the ranks from Intern to
            Wolf of Wall Street and unlock achievements along the way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leveling system */}
          <motion.div
            ref={levelsRef}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="card p-7 border-gold/10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-gold/[0.08] border border-gold/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">10 Ranks to Conquer</h3>
                <p className="text-sm text-gray-500">From Intern to Wolf of Wall Street</p>
              </div>
            </div>

            <div className="space-y-3">
              {LEVELS.map((level, index) => {
                const isTop = index === LEVELS.length - 1;
                return (
                  <motion.div
                    key={level.level}
                    initial={{ opacity: 0, x: -20 }}
                    animate={levelsInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.06, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0
                      ${isTop ? 'bg-gold/20 text-gold border border-gold/30' : 'bg-navy-800/80 text-gray-500 border border-navy-700/30'}`}>
                      {level.level}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-medium ${isTop ? 'text-gold' : 'text-gray-300'}`}>
                          {level.title}
                        </span>
                        <span className="text-xs text-gray-600 font-mono">
                          {level.xp_required.toLocaleString()} XP
                        </span>
                      </div>
                      <div className="h-1.5 bg-navy-800/80 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={levelsInView ? { width: `${(index / (LEVELS.length - 1)) * 100}%` } : {}}
                          transition={{ delay: 0.3 + index * 0.08, duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
                          className={`h-full rounded-full ${isTop ? 'bg-gradient-to-r from-gold-dark via-gold to-gold-light' : 'bg-gradient-to-r from-gold-dark/60 to-gold/60'}`}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="card p-7 border-gold/10"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-11 h-11 rounded-xl bg-gold/[0.08] border border-gold/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">17 Achievements</h3>
                <p className="text-sm text-gray-500">Unlock badges as you crush your goals</p>
              </div>
            </div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              className="grid grid-cols-4 sm:grid-cols-5 gap-3"
            >
              {ACHIEVEMENTS.map((achievement) => {
                const IconComponent = iconMap[achievement.icon];
                return (
                  <motion.div
                    key={achievement.id}
                    variants={badgeVariant}
                    className="group relative"
                  >
                    <div className="w-full aspect-square rounded-xl bg-navy-900/80 border border-navy-700/30 flex items-center justify-center hover:border-gold/30 hover:bg-gold/[0.06] transition-all duration-300 cursor-default group-hover:shadow-[0_0_20px_rgba(212,168,67,0.08)]">
                      {IconComponent && <IconComponent className="w-5 h-5 text-gray-500 group-hover:text-gold group-hover:scale-110 transition-all duration-300" />}
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 px-3 py-2 bg-navy-950 border border-navy-700/50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-10 shadow-xl">
                      <p className="text-xs font-semibold text-white">{achievement.name}</p>
                      <p className="text-[11px] text-gray-400">{achievement.description}</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px w-2 h-2 bg-navy-950 border-r border-b border-navy-700/50 rotate-45" />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* XP rules */}
            <div className="mt-7 pt-5 border-t border-navy-700/30">
              <p className="text-sm font-semibold text-gray-300 mb-3">Earn XP for every action:</p>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { action: 'Phone Call', xp: '+10 XP', Icon: Phone },
                  { action: 'Email Sent', xp: '+5 XP', Icon: Mail },
                  { action: 'Meeting', xp: '+25 XP', Icon: Handshake },
                  { action: 'Deal Closed', xp: '+100 XP', Icon: DollarSign },
                ].map((rule) => (
                  <div key={rule.action} className="flex items-center gap-2.5 bg-navy-900/50 border border-navy-700/20 rounded-xl px-3.5 py-2.5 hover:border-gold/10 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-gold/[0.08] flex items-center justify-center shrink-0">
                      <rule.Icon className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <span className="text-xs text-gray-400">{rule.action}</span>
                    <span className="ml-auto text-xs font-bold text-gold">{rule.xp}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { icon: Star, label: 'Levels', value: '10' },
            { icon: Trophy, label: 'Achievements', value: '17' },
            { icon: Flame, label: 'Streak Tracking', value: '30d' },
            { icon: TrendingUp, label: 'Max XP', value: '20K' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="card p-5 text-center group hover:border-gold/15"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/[0.08] border border-gold/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-5 h-5 text-gold" />
              </div>
              <p className="text-2xl font-bold text-white tracking-tight">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
