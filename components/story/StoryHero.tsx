'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface StatItem {
  value: string;
  label: string;
}

interface StoryHeroProps {
  title: string;
  subtitle: string;
  stats: StatItem[];
}

export function StoryHero({ title, subtitle, stats }: StoryHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-dark-bg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-neon-green/20 via-transparent to-transparent opacity-40" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-neon-green/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <p className="text-neon-green text-sm font-bold tracking-widest uppercase mb-6">
            Our Story
          </p>
          <h1 className="font-space-grotesk text-6xl md:text-7xl lg:text-8xl font-bold text-text-primary mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-text-muted max-w-3xl mx-auto mb-16 leading-relaxed">
            {subtitle}
          </p>

          <motion.div
            initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: prefersReducedMotion ? 1 : 0, scale: prefersReducedMotion ? 1 : 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: prefersReducedMotion ? 0 : 0.3 + index * 0.1 }}
                className="relative p-6 rounded-lg bg-dark-surface/50 backdrop-blur border border-border-subtle/30 hover:border-neon-green/50 transition-colors"
              >
                <div className="font-space-grotesk text-3xl md:text-4xl font-bold text-neon-green mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-text-muted font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
