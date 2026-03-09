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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] as const } },
};

export default function FeatureGrid() {
  return (
    <section id="features" className="py-28 relative section-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-gold/70 text-sm font-semibold tracking-widest uppercase mb-4">Features</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
            <span className="text-white">Everything You Need to </span>
            <span className="gold-gradient">Close</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A complete sales prospecting suite powered by AI, wrapped in a gamified experience
            that makes selling addictive.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariant}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="card p-6 group cursor-default"
            >
              <div className="relative mb-5">
                <div className="absolute inset-0 w-12 h-12 bg-gold/10 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative w-12 h-12 rounded-xl bg-gold/[0.08] border border-gold/10 flex items-center justify-center group-hover:bg-gold/15 group-hover:border-gold/20 transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-gold group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <h3 className="text-white font-semibold mb-2 text-[15px]">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
