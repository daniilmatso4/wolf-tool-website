'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Bell, ExternalLink, Sparkles, Bug, Lightbulb } from 'lucide-react';

interface ChangelogEntry {
  version: string;
  date: string;
  title: string;
  type: 'release' | 'beta';
  changes: string[];
}

const fallbackEntries: ChangelogEntry[] = [
  {
    version: '1.0.0',
    date: '2026-02-15',
    title: 'Initial Release',
    type: 'release',
    changes: [
      'Launch of Wolf Tool desktop application',
      '3 AI agents: Jordan, Donnie, and Naomi',
      'LinkedIn integration for prospect discovery',
      'Gamification system with 10 levels and 17 achievements',
      'Sales pipeline management with Kanban board',
      'Real-time analytics dashboard',
    ],
  },
  {
    version: '0.9.0',
    date: '2026-01-28',
    title: 'Beta Release',
    type: 'beta',
    changes: [
      'Beta testing with early access users',
      'Performance improvements to AI agent processing',
      'Bug fixes for LinkedIn session management',
      'UI polish and animation improvements',
    ],
  },
];

const communityChannels = [
  {
    icon: MessageSquare,
    name: '#general',
    description: 'Chat with fellow wolves about sales strategies and tips',
    members: 342,
  },
  {
    icon: Lightbulb,
    name: '#feature-requests',
    description: 'Suggest new features and vote on community ideas',
    members: 156,
  },
  {
    icon: Bug,
    name: '#bug-reports',
    description: 'Report issues and help us improve Wolf Tool',
    members: 89,
  },
  {
    icon: Sparkles,
    name: '#showcase',
    description: 'Share your wins, achievements, and success stories',
    members: 218,
  },
];

export default function CommunityPage() {
  const [changelogEntries, setChangelogEntries] = useState<ChangelogEntry[]>(fallbackEntries);

  useEffect(() => {
    fetch('/api/releases')
      .then((res) => res.json())
      .then((data) => {
        if (data.entries && data.entries.length > 0) {
          setChangelogEntries(data.entries);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Join the </span>
            <span className="gold-gradient">Wolf Pack</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Connect with fellow closers, share strategies, get support, and stay updated
            on the latest Wolf Tool features.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Discord section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card p-6 border-purple-500/20 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Discord Community</h2>
                  <p className="text-sm text-gray-400">500+ members and growing</p>
                </div>
              </div>

              <a
                href="https://discord.gg/bFYDEgUBfe"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold w-full py-3 flex items-center justify-center gap-2 mb-6"
              >
                Join Discord Server
                <ExternalLink className="w-4 h-4" />
              </a>

              <div className="space-y-3">
                {communityChannels.map((channel) => (
                  <div key={channel.name} className="bg-navy-900 rounded-lg p-4 border border-navy-700/50">
                    <div className="flex items-center gap-3">
                      <channel.icon className="w-5 h-5 text-purple-400" />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-white">{channel.name}</span>
                        <p className="text-xs text-gray-400">{channel.description}</p>
                      </div>
                      <span className="text-xs text-gray-500">{channel.members} members</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Changelog section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="card p-6 border-gold/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                  <Bell className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Changelog</h2>
                  <p className="text-sm text-gray-400">What&apos;s new in Wolf Tool</p>
                </div>
              </div>

              <div className="space-y-6">
                {changelogEntries.map((entry) => (
                  <div key={entry.version} className="relative pl-6 border-l-2 border-navy-700/50">
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-gold border-2 border-navy-800" />
                    <div className="mb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-white">v{entry.version}</span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          entry.type === 'release'
                            ? 'bg-green-500/10 text-green-400'
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {entry.type === 'release' ? 'Release' : 'Beta'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{entry.date}</p>
                      <p className="text-sm font-medium text-gold mt-1">{entry.title}</p>
                    </div>
                    <ul className="space-y-1.5">
                      {entry.changes.map((change, i) => (
                        <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="text-gold mt-1.5 text-xs">&#9679;</span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
