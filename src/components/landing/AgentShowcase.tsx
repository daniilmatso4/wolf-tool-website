'use client';

import { motion } from 'framer-motion';
import { AGENTS } from '@/lib/constants';
import { Bot, MessageSquare, Target, Brain } from 'lucide-react';

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

export default function AgentShowcase() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Meet Your </span>
            <span className="gold-gradient">Wolf Pack</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Three AI agents working in parallel to fill your pipeline, close deals,
            and make you the wolf of your industry.
          </p>
        </motion.div>

        {/* Agent cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AGENTS.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`card p-6 border ${agent.borderColor} hover:border-opacity-60 transition-all duration-300 group`}
            >
              {/* Avatar & name */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-xl ${agent.bgColor} flex items-center justify-center text-3xl`}>
                  {agent.avatar}
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${agent.color}`}>{agent.name}</h3>
                  <p className="text-gray-400 text-sm">{agent.title}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                {agent.description}
              </p>

              {/* Capabilities */}
              <div className="space-y-3">
                {agentCapabilities[agent.id as keyof typeof agentCapabilities].map((cap, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <cap.icon className={`w-4 h-4 ${agent.color} shrink-0`} />
                    <span className="text-gray-400 text-sm">{cap.text}</span>
                  </div>
                ))}
              </div>

              {/* Status indicator */}
              <div className={`mt-6 pt-4 border-t border-navy-700/50 flex items-center gap-2`}>
                <div className={`w-2 h-2 rounded-full bg-green-400 animate-pulse`} />
                <span className="text-xs text-gray-500">Ready to deploy</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
