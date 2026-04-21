'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { BentoCardProps } from './types';

const benefits = [
  {
    size: 'large',
    title: 'Science-Backed',
    description: 'Sodium bicarbonate buffering proven by peer-reviewed research',
    icon: '🔬'
  },
  {
    size: 'small',
    title: 'Vegan',
    description: 'Plant-based, no animal products',
    icon: '🌱'
  },
  {
    size: 'small',
    title: 'Zero Cal',
    description: 'No sugar, no calories',
    icon: '⚡'
  },
  {
    size: 'medium',
    title: 'Athlete Trusted',
    description: 'Used by endurance athletes worldwide',
    icon: '🏆'
  }
] as const;

export function BentoGrid() {
  return (
    <section className="bg-deep-field py-24" aria-labelledby="benefits-heading">
      <div className="container mx-auto px-6">
        <h2 id="benefits-heading" className="font-space-grotesk text-5xl font-bold text-off-white mb-12">
          Why BFFR?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <BentoCard key={i} {...benefit} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ size, title, description, icon, index }: BentoCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const gridSpan = size === 'large' ? 'md:col-span-2' : size === 'medium' ? 'md:col-span-2' : 'md:col-span-1';
  
  return (
    <motion.div
      initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
      viewport={{ once: true }}
      className={`${gridSpan} bg-black/50 border border-sage-mist/20 rounded-2xl p-8 hover:border-buffer-green transition-colors
                  focus-within:outline-none focus-within:ring-2 focus-within:ring-buffer-green`}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="font-space-grotesk text-2xl font-bold text-off-white mb-2">
        {title}
      </h3>
      <p className="text-sage-mist">
        {description}
      </p>
    </motion.div>
  );
}
