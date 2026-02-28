'use client';

import { motion } from 'framer-motion';
import { PIPELINE_STAGES } from '@/lib/constants';
import { ArrowRight } from 'lucide-react';

export default function PipelineDemo() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-950 to-navy-900" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Your Pipeline, </span>
            <span className="gold-gradient">Visualized</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Watch leads flow through your pipeline in real-time. From first contact to closed deal,
            every stage is tracked.
          </p>
        </motion.div>

        {/* Pipeline visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card p-6 sm:p-8 border-navy-700/50"
        >
          <div className="flex flex-col sm:flex-row items-stretch gap-4">
            {PIPELINE_STAGES.map((stage, index) => (
              <div key={stage.name} className="flex items-center gap-4 flex-1">
                <div className="flex-1">
                  <div className="bg-navy-900 rounded-lg p-4 border border-navy-700/50 hover:border-gold/20 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                      <span className="text-sm font-medium text-white">{stage.name}</span>
                    </div>
                    <p className="text-3xl font-bold text-white">{stage.count}</p>
                    <p className="text-xs text-gray-500 mt-1">leads</p>

                    {/* Mini lead cards */}
                    <div className="mt-3 space-y-1.5">
                      {[...Array(Math.min(3, stage.count))].map((_, i) => (
                        <div
                          key={i}
                          className="h-2 rounded-full bg-navy-700/50"
                          style={{ width: `${100 - i * 20}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                {index < PIPELINE_STAGES.length - 1 && (
                  <ArrowRight className="w-5 h-5 text-navy-600 hidden sm:block shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Conversion rate bar */}
          <div className="mt-8 pt-6 border-t border-navy-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Overall Conversion Rate</span>
              <span className="text-sm font-semibold text-gold">20.8%</span>
            </div>
            <div className="h-2 bg-navy-700/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '20.8%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-gold-dark to-gold rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
