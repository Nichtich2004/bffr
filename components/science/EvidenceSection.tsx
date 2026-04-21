'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function EvidenceSection() {
  const prefersReducedMotion = useReducedMotion();

  const stats = [
    {
      value: '2–3%',
      label: 'Performance Gain',
      description: 'Proven increase in time to exhaustion during high-intensity exercise'
    },
    {
      value: '80%',
      label: 'Olympic Usage',
      description: 'Paris 2024 runners used sodium bicarbonate for performance enhancement'
    },
    {
      value: '15+',
      label: 'Peer Studies',
      description: 'Published research validating bicarbonate buffering effectiveness'
    },
    {
      value: '2/3',
      label: 'Medal Winners',
      description: 'Paris 2024 Olympic running medalists used bicarb protocols'
    }
  ];

  return (
    <section className="bg-dark-bg py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Evidence & Performance
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Real-world results from elite athletes and controlled studies
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: prefersReducedMotion ? 1 : 0, scale: prefersReducedMotion ? 1 : 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
              className="text-center"
            >
              <div className="font-space-grotesk text-5xl md:text-6xl font-bold text-neon-green mb-2">
                {stat.value}
              </div>
              <div className="font-bold text-text-primary mb-2">
                {stat.label}
              </div>
              <p className="text-sm text-text-muted leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
