'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function ScienceHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-dark-bg overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-radial from-neon-green/10 via-transparent to-transparent opacity-30" />
      
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-neon-green text-sm font-bold tracking-widest uppercase mb-4">
            Evidence-Based Performance
          </p>
          <h1 className="font-space-grotesk text-5xl md:text-7xl font-bold text-text-primary mb-6">
            The Science Behind BFFR
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            Sodium bicarbonate buffering proven by peer-reviewed research. 
            BFFR's buccal delivery eliminates GI distress while maximizing performance gains.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
