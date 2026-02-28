'use client';

import { motion } from 'framer-motion';
import {
  Linkedin,
  BarChart3,
  Users,
  Shield,
  Zap,
  Trophy,
  MessageSquare,
  Target,
} from 'lucide-react';

const features = [
  {
    icon: Linkedin,
    title: 'LinkedIn Integration',
    description: 'AI agents browse LinkedIn in real-time, finding and engaging prospects that match your ideal customer profile.',
  },
  {
    icon: MessageSquare,
    title: 'Smart Outreach',
    description: 'Personalized messages crafted by AI that sound human. Review and approve before sending.',
  },
  {
    icon: Target,
    title: 'Lead Discovery',
    description: 'Automated prospect research with brand analysis, competitive intelligence, and fit scoring.',
  },
  {
    icon: BarChart3,
    title: 'Sales Pipeline',
    description: 'Kanban-style pipeline management. Drag leads through stages from New to Closed Won.',
  },
  {
    icon: Trophy,
    title: 'Gamification',
    description: 'Level up from Intern to Wolf of Wall Street. Earn XP, unlock achievements, and maintain streaks.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Invite your team, share pipelines, and compete on leaderboards. Perfect for sales teams.',
  },
  {
    icon: Shield,
    title: 'Human-in-the-Loop',
    description: 'Every outreach message requires your approval. Stay in control while AI does the heavy lifting.',
  },
  {
    icon: Zap,
    title: 'Real-time Analytics',
    description: 'Track calls, emails, meetings, and deals. Daily stats and streak tracking keep you accountable.',
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Everything You Need to </span>
            <span className="gold-gradient">Close</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A complete sales prospecting suite powered by AI, wrapped in a gamified experience
            that makes selling addictive.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="card p-6 hover:border-gold/20 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <feature.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
