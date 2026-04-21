'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

const benefits = [
  {
    title: 'Science-Backed',
    description: 'Sodium bicarbonate buffering proven by peer-reviewed research for endurance performance.',
    stat: '15+ Studies'
  },
  {
    title: 'Zero Calories',
    description: 'Clean formula with no sugar, no fillers. Just pure performance enhancement.',
    stat: '0 Cal'
  },
  {
    title: 'Vegan & Clean',
    description: 'Plant-based ingredients. No animal products. Third-party tested for purity.',
    stat: '100% Vegan'
  },
  {
    title: 'Easy Dosing',
    description: 'Convenient pouches. S/M/L doses for different body weights and training loads.',
    stat: '15 Pouches'
  }
];

export function BenefitsGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="benefits" className="bg-dark-surface py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-space-grotesk text-4xl md:text-6xl font-bold text-text-primary mb-4">
            Why Athletes Choose BFFR
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Backed by science, trusted by endurance athletes worldwide.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.1, duration: 0.5 }}
              className="bg-dark-surface-2/50 border border-border-subtle rounded-2xl p-8
                         hover:border-neon-green/50 transition-colors duration-300"
            >
              {/* Stat Badge */}
              <div className="inline-block bg-neon-green/15 text-neon-green px-4 py-2 rounded-full text-sm font-bold mb-6">
                {benefit.stat}
              </div>

              {/* Title */}
              <h3 className="font-space-grotesk text-2xl font-bold text-text-primary mb-3">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-text-muted leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
