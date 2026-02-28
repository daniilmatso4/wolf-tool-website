'use client';

import { motion } from 'framer-motion';
import { LEVELS, ACHIEVEMENTS } from '@/lib/constants';
import { Trophy, Star, Flame, TrendingUp, Phone, PhoneCall, Mail, Send, Inbox, DollarSign, Banknote, CircleDollarSign, Zap, Dumbbell, Handshake, Globe, Search, Target, Gem } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  PhoneCall,
  Phone,
  Flame,
  Trophy,
  Mail,
  Send,
  Inbox,
  DollarSign,
  Banknote,
  CircleDollarSign,
  Zap,
  Dumbbell,
  Handshake,
  Globe,
  Search,
  Target,
  Gem,
};

export default function GamificationSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Level Up Your </span>
            <span className="gold-gradient">Sales Game</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every call, email, and deal earns XP. Climb the ranks from Intern to
            Wolf of Wall Street and unlock achievements along the way.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Leveling system */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card p-6 border-gold/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">10 Ranks to Conquer</h3>
                <p className="text-sm text-gray-400">From Intern to Wolf of Wall Street</p>
              </div>
            </div>

            <div className="space-y-3">
              {LEVELS.map((level, index) => (
                <div key={level.level} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold
                    ${index === LEVELS.length - 1 ? 'bg-gold/20 text-gold' : 'bg-navy-700/50 text-gray-400'}`}>
                    {level.level}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${index === LEVELS.length - 1 ? 'text-gold' : 'text-gray-300'}`}>
                        {level.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {level.xp_required.toLocaleString()} XP
                      </span>
                    </div>
                    <div className="mt-1 h-1.5 bg-navy-700/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gold-dark to-gold rounded-full transition-all"
                        style={{ width: `${(index / (LEVELS.length - 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card p-6 border-gold/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">17 Achievements</h3>
                <p className="text-sm text-gray-400">Unlock badges as you crush your goals</p>
              </div>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {ACHIEVEMENTS.map((achievement, index) => {
                const IconComponent = iconMap[achievement.icon];
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className="group relative"
                  >
                    <div className="w-full aspect-square rounded-xl bg-navy-900 border border-navy-700/50 flex items-center justify-center hover:border-gold/30 hover:bg-gold/5 transition-all cursor-default">
                      {IconComponent && <IconComponent className="w-6 h-6 text-gray-400 group-hover:text-gold transition-colors" />}
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-navy-950 border border-navy-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      <p className="text-xs font-semibold text-white">{achievement.name}</p>
                      <p className="text-xs text-gray-400">{achievement.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* XP rules */}
            <div className="mt-6 pt-4 border-t border-navy-700/50">
              <p className="text-sm font-medium text-gray-300 mb-3">Earn XP for every action:</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { action: 'Phone Call', xp: '+10 XP', Icon: Phone },
                  { action: 'Email Sent', xp: '+5 XP', Icon: Mail },
                  { action: 'Meeting', xp: '+25 XP', Icon: Handshake },
                  { action: 'Deal Closed', xp: '+100 XP', Icon: DollarSign },
                ].map((rule) => (
                  <div key={rule.action} className="flex items-center gap-2 bg-navy-900/50 rounded-lg px-3 py-2">
                    <rule.Icon className="w-4 h-4 text-gold" />
                    <span className="text-xs text-gray-400">{rule.action}</span>
                    <span className="ml-auto text-xs font-semibold text-gold">{rule.xp}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { icon: Star, label: 'Levels', value: '10' },
            { icon: Trophy, label: 'Achievements', value: '17' },
            { icon: Flame, label: 'Streak Tracking', value: '30d' },
            { icon: TrendingUp, label: 'Max XP', value: '20K' },
          ].map((stat) => (
            <div key={stat.label} className="card p-4 text-center">
              <stat.icon className="w-6 h-6 text-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-gray-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
