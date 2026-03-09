'use client';

import { motion } from 'framer-motion';
import { AGENTS } from '@/lib/constants';
import { Bot, MessageSquare, Target, Brain, Flame, Gem } from 'lucide-react';
import WolfLogo from '@/components/icons/WolfLogo';

const agentCapabilities = {
  jordan: [
    { icon: Target, text: 'LinkedIn prospect discovery' },
    { icon: MessageSquare, text: 'Personalized opening messages' },
    { icon: Bot, text: 'Automated outreach sequences' },
  ],
  donnie: [
    { icon: MessageSquare, text: 'Intelligent follow-ups' },
    { icon: Target, text: 'Pipeline velocity tracking' },
    { icon: Bot, text: 'Deal momentum analysis' },
  ],
  naomi: [
    { icon: Brain, text: 'Brand positioning analysis' },
    { icon: MessageSquare, text: 'Custom outreach strategies' },
    { icon: Target, text: 'Competitive intelligence' },
  ],
} as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const } },
};

export default function AgentShowcase() {
  return (
    <section className="py-28 relative section-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-gold/70 text-sm font-semibold tracking-widest uppercase mb-4">Your AI Team</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
            <span className="text-white">Meet Your </span>
            <span className="gold-gradient">Wolf Pack</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Three AI agents working in parallel to fill your pipeline, close deals,
            and make you the wolf of your industry.
          </p>
        </motion.div>

        {/* Agent cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {AGENTS.map((agent) => (
            <motion.div
              key={agent.id}
              variants={cardVariant}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`card p-7 border ${agent.borderColor} group relative overflow-hidden`}
            >
              {/* Hover glow */}
              <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                ${agent.id === 'jordan' ? 'bg-gold/10' : agent.id === 'donnie' ? 'bg-blue-400/10' : 'bg-purple-400/10'}`}
              />

              <div className="relative">
                {/* Avatar & name */}
                <div className="flex items-center gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-2xl ${agent.bgColor} flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform duration-300`}>
                    {agent.avatar === 'WolfLogo' && <WolfLogo size={30} />}
                    {agent.avatar === 'Flame' && <Flame className={`w-7 h-7 ${agent.color}`} />}
                    {agent.avatar === 'Gem' && <Gem className={`w-7 h-7 ${agent.color}`} />}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${agent.color}`}>{agent.name}</h3>
                    <p className="text-gray-500 text-sm font-medium">{agent.title}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {agent.description}
                </p>

                {/* Capabilities */}
                <div className="space-y-3">
                  {agentCapabilities[agent.id as keyof typeof agentCapabilities].map((cap, i) => (
                    <div key={i} className="flex items-center gap-3 group/cap">
                      <div className={`w-8 h-8 rounded-lg ${agent.bgColor} flex items-center justify-center shrink-0 group-hover/cap:scale-105 transition-transform`}>
                        <cap.icon className={`w-4 h-4 ${agent.color}`} />
                      </div>
                      <span className="text-gray-400 text-sm">{cap.text}</span>
                    </div>
                  ))}
                </div>

                {/* Status indicator */}
                <div className="mt-7 pt-5 border-t border-navy-700/30 flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-50" />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Ready to deploy</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
