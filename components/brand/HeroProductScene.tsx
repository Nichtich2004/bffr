'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { Flavor, FlavorConfig, FlavorChipProps } from './types';

export function HeroProductScene() {
  const [flavor, setFlavor] = useState<Flavor>('green-tea');
  const prefersReducedMotion = useReducedMotion();
  
  const flavorConfig: Record<Flavor, FlavorConfig> = {
    'green-tea': {
      bg: 'from-deep-field to-black',
      image: '/grrentea_splash.png',
      headline: 'Buffer Smarter.',
      subline: 'Perform Harder.',
      glow: 'shadow-glow-green'
    },
    'tropical': {
      bg: 'from-warm-accent to-black',
      image: '/tropical_splash.png',
      headline: 'Race Ready.',
      subline: 'No Compromise.',
      glow: 'shadow-glow-orange'
    }
  };

  const config = flavorConfig[flavor];

  return (
    <section className={`relative min-h-[90vh] bg-gradient-to-b ${config.bg} overflow-hidden`}>
      {/* Ambient Glow Layer */}
      <div className={`absolute inset-0 opacity-20 ${config.glow}`} />
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left: Headlines */}
          <motion.div
            initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
          >
            <h1 className="font-space-grotesk text-4xl md:text-5xl lg:text-7xl font-bold text-off-white mb-4 leading-tight">
              {config.headline}
            </h1>
            <p className="font-space-grotesk text-2xl md:text-3xl lg:text-5xl text-sage-mist mb-8">
              {config.subline}
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Shop ${flavor === 'green-tea' ? 'Green Tea' : 'Tropical'} for $6`}
              className="bg-buffer-green text-black px-8 py-4 rounded-lg font-bold text-lg
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-buffer-green
                         focus:ring-offset-black min-h-[44px]"
            >
              Shop Now — $6
            </motion.button>
          </motion.div>

          {/* Right: Floating Product */}
          <motion.div
            initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1, delay: prefersReducedMotion ? 0 : 0.3 }}
            className="relative"
          >
            <motion.div
              animate={{
                y: prefersReducedMotion ? 0 : [0, -20, 0],
                rotate: prefersReducedMotion ? 0 : [0, 2, 0]
              }}
              transition={{
                duration: prefersReducedMotion ? 0 : 4,
                repeat: prefersReducedMotion ? 0 : Infinity,
                ease: "easeInOut"
              }}
              className={`relative ${config.glow}`}
            >
              <Image
                src={config.image}
                alt={flavor}
                width={600}
                height={800}
                className="w-full h-auto"
                priority
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Flavor Switcher */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
          <FlavorChip
            label="Green Tea"
            active={flavor === 'green-tea'}
            onClick={() => setFlavor('green-tea')}
          />
          <FlavorChip
            label="Tropical"
            active={flavor === 'tropical'}
            onClick={() => setFlavor('tropical')}
          />
        </div>
      </div>
    </section>
  );
}

function FlavorChip({ label, active, onClick }: FlavorChipProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-pressed={active}
      aria-label={`Switch to ${label} flavor`}
      className={`px-6 py-3.5 rounded-full font-bold transition-colors
                  min-h-[44px] min-w-[44px]
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-buffer-green
                  ${active 
                    ? 'bg-buffer-green text-black' 
                    : 'bg-deep-field text-sage-mist border border-sage-mist hover:border-buffer-green'
                  }`}
    >
      {label}
    </motion.button>
  );
}
