'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { PIPELINE_STAGES } from '@/lib/constants';
import { ArrowRight, ChevronRight } from 'lucide-react';

function AnimatedCount({ value, inView }: { value: number; inView: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
      className="text-3xl font-bold text-white tracking-tight"
    >
      {inView ? value : 0}
    </motion.span>
  );
}

export default function PipelineDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/0 via-navy-950 to-navy-950/0" />

      <div ref={ref} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-gold/70 text-sm font-semibold tracking-widest uppercase mb-4">Pipeline</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 tracking-tight">
            <span className="text-white">Your Pipeline, </span>
            <span className="gold-gradient">Visualized</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Watch leads flow through your pipeline in real-time. From first contact to closed deal,
            every stage is tracked.
          </p>
        </motion.div>

        {/* Pipeline visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="card p-6 sm:p-8 border-navy-700/30"
        >
          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            {PIPELINE_STAGES.map((stage, index) => (
              <div key={stage.name} className="flex items-center gap-3 flex-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.12, duration: 0.5 }}
                  className="flex-1"
                >
                  <div className="bg-navy-900/80 rounded-xl p-5 border border-navy-700/30 hover:border-gold/15 transition-all duration-300 group">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                      <span className="text-sm font-medium text-gray-300">{stage.name}</span>
                    </div>
                    <AnimatedCount value={stage.count} inView={isInView} />
                    <p className="text-xs text-gray-600 mt-1 font-medium">leads</p>

                    {/* Mini lead bars */}
                    <div className="mt-4 space-y-1.5">
                      {[...Array(Math.min(3, stage.count))].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ width: 0, opacity: 0 }}
                          animate={isInView ? { width: `${100 - i * 20}%`, opacity: 1 } : {}}
                          transition={{ delay: 0.5 + index * 0.12 + i * 0.08, duration: 0.6 }}
                          className={`h-1.5 rounded-full ${stage.color} opacity-20`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
                {index < PIPELINE_STAGES.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.12, duration: 0.3 }}
                    className="hidden sm:flex items-center"
                  >
                    <ChevronRight className="w-5 h-5 text-navy-600" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Conversion rate bar */}
          <div className="mt-8 pt-6 border-t border-navy-700/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-400 font-medium">Overall Conversion Rate</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.4 }}
                className="text-sm font-bold text-gold"
              >
                20.8%
              </motion.span>
            </div>
            <div className="h-2.5 bg-navy-800/80 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '20.8%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
                className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light rounded-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
