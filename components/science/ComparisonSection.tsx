'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function ComparisonSection() {
  const prefersReducedMotion = useReducedMotion();

  const comparison = [
    {
      feature: 'GI Distress',
      traditional: '30% severe issues',
      bffr: 'Zero reported',
      winner: 'bffr'
    },
    {
      feature: 'Onset Time',
      traditional: '90 minutes',
      bffr: '30–45 minutes',
      winner: 'bffr'
    },
    {
      feature: 'Cost per Dose',
      traditional: '$20 (Maurten)',
      bffr: '$6',
      winner: 'bffr'
    },
    {
      feature: 'Portability',
      traditional: 'Bulky packaging',
      bffr: 'Pocket-sized pouch',
      winner: 'bffr'
    },
    {
      feature: 'Absorption Route',
      traditional: 'Gastric (stomach)',
      bffr: 'Buccal (direct)',
      winner: 'bffr'
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
            BFFR vs. Traditional Methods
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            How buccal delivery solves the problems of traditional bicarbonate loading
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-dark-bg/50 border border-border-subtle rounded-2xl overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 p-6 border-b border-border-subtle bg-dark-surface-2/30">
              <div className="font-bold text-text-muted text-sm uppercase tracking-wide">
                Feature
              </div>
              <div className="font-bold text-text-muted text-sm uppercase tracking-wide text-center">
                Traditional
              </div>
              <div className="font-bold text-neon-green text-sm uppercase tracking-wide text-center">
                BFFR
              </div>
            </div>

            {/* Rows */}
            {comparison.map((row, index) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                className="grid grid-cols-3 gap-4 p-6 border-b border-border-subtle last:border-b-0
                           hover:bg-dark-surface-2/20 transition-colors"
              >
                <div className="font-semibold text-text-primary">
                  {row.feature}
                </div>
                <div className="text-text-muted text-center">
                  {row.traditional}
                </div>
                <div className="text-text-primary text-center font-semibold">
                  {row.bffr}
                  {row.winner === 'bffr' && (
                    <span className="ml-2 text-neon-green">✓</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
