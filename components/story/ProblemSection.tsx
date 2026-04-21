'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface ProblemCard {
  value: string;
  label: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface ProblemSectionProps {
  headline: string;
  body: string;
  problemCards: ProblemCard[];
  testimonial: Testimonial;
}

export function ProblemSection({ headline, body, problemCards, testimonial }: ProblemSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-dark-bg py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="font-space-grotesk text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            {headline}
          </h2>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed">
            {body}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {problemCards.map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
              className="group relative p-8 rounded-xl bg-dark-surface border border-border-subtle/30 hover:border-neon-green/50 hover:bg-dark-surface-2 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-radial from-neon-green/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 rounded-xl transition-opacity" />
              
              <div className="relative z-10">
                <div className="font-space-grotesk text-4xl md:text-5xl font-bold text-neon-green mb-3">
                  {card.value}
                </div>
                <div className="font-bold text-text-primary mb-2">
                  {card.label}
                </div>
                <p className="text-sm text-text-muted leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, scale: prefersReducedMotion ? 1 : 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative p-8 md:p-12 rounded-xl bg-gradient-to-br from-dark-surface to-dark-surface-2 border border-border-subtle/50 backdrop-blur">
            <div className="absolute top-4 left-6 text-neon-green/20 font-space-grotesk text-6xl font-bold">
              "
            </div>

            <blockquote className="relative z-10 pt-4">
              <p className="text-lg md:text-xl text-text-primary mb-6 italic leading-relaxed">
                {testimonial.quote}
              </p>
              <footer className="text-text-muted">
                <div className="font-bold text-text-primary">{testimonial.author}</div>
                <div className="text-sm">{testimonial.role}</div>
              </footer>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
