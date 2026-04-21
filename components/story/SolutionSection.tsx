'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface SolutionSectionProps {
  headline: string;
  subtitle: string;
  steps: Step[];
}

const benefits = [
  'No GI Distress — Buccal delivery bypasses the stomach',
  'Faster Onset — Peak buffering in 30–45 minutes',
  '10× Cheaper — $6 vs $60+ per dose',
  'Easy to Use — Single pouch, no mixing',
  'Vegan & Clean — Plant-based ingredients',
  'Paris 2024 Proven — Elite athletes trust BFFR',
];

export function SolutionSection({ headline, subtitle, steps }: SolutionSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-dark-bg py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-space-grotesk text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            {headline}
          </h2>
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.15 }}
              className="relative"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-24 left-[60%] w-[calc(100%-40px)] h-1 bg-gradient-to-r from-neon-green/50 to-neon-green/20" />
              )}

              <div className="relative p-8 rounded-xl bg-dark-surface border border-border-subtle/30 hover:border-neon-green/50 transition-all hover:shadow-glow-green/20">
                <div className="absolute -top-6 left-8 w-12 h-12 rounded-full bg-neon-green/20 border-2 border-neon-green flex items-center justify-center">
                  <span className="font-space-grotesk text-lg font-bold text-neon-green">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-space-grotesk text-2xl font-bold text-text-primary mb-3 mt-6">
                  {step.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-8 md:p-12 rounded-xl bg-gradient-to-br from-dark-surface to-dark-surface-2 border border-border-subtle/50">
            <h3 className="font-space-grotesk text-2xl font-bold text-text-primary mb-8">
              Why BFFR Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-text-muted leading-relaxed">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
