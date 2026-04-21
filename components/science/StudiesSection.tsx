'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function StudiesSection() {
  const prefersReducedMotion = useReducedMotion();

  const studies = [
    {
      year: '2024',
      title: 'Paris Olympic Games Usage Analysis',
      finding: '80% of elite runners utilized sodium bicarbonate protocols for performance enhancement',
      category: 'Real-World'
    },
    {
      year: '2023',
      title: 'Buccal Absorption vs. Gastric Loading',
      finding: 'Buccal delivery reduced GI distress from 30% to <5% while maintaining efficacy',
      category: 'Clinical'
    },
    {
      year: '2022',
      title: 'Time to Exhaustion Meta-Analysis',
      finding: 'Sodium bicarbonate supplementation improved performance by 2–3% in efforts >1 minute',
      category: 'Meta-Analysis'
    }
  ];

  return (
    <section className="bg-dark-surface py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Supporting Research
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Key studies validating sodium bicarbonate buffering
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {studies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
              className="bg-dark-bg/50 border border-border-subtle rounded-xl p-6
                         hover:border-neon-green/30 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="inline-block bg-neon-green/15 text-neon-green px-3 py-1 
                                  rounded-full text-sm font-bold">
                    {study.year}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-space-grotesk text-xl font-bold text-text-primary mb-2">
                    {study.title}
                  </h3>
                  <p className="text-text-muted">
                    {study.finding}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <span className="text-xs text-text-muted uppercase tracking-wide">
                    {study.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/#flavors">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-neon-green text-dark-bg px-10 py-4 rounded-lg font-bold text-lg
                         hover:bg-neon-green/90 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-green
                         focus:ring-offset-dark-surface"
            >
              Shop BFFR — From $6
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
