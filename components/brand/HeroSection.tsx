'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen bg-dark-bg flex items-center justify-center overflow-hidden">
      {/* Fullscreen Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.png"
          alt="BFFR Bicarb Pouches - Green Tea and Tropical"
          fill
          className="object-cover opacity-60"
          priority
          quality={100}
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/95 via-dark-bg/50 to-transparent" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-6 py-32 text-center">
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Eyebrow */}
          <p className="text-neon-green text-sm md:text-base font-bold tracking-widest uppercase mb-4">
            Sodium Bicarbonate Performance
          </p>

          {/* Main Headline */}
          <h1 className="font-space-grotesk text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary mb-6 leading-tight">
            Buffer Smarter.
            <br />
            Perform Harder.
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10">
            Science-backed bicarb pouches for endurance athletes.
            <br />
            Zero calories. Vegan. Results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#flavors">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-neon-green text-dark-bg px-10 py-4 rounded-lg font-bold text-lg
                           hover:bg-neon-green/90 transition-colors
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-green
                           focus:ring-offset-dark-bg min-h-[56px] min-w-[200px]"
                aria-label="Shop BFFR pouches starting at $6"
              >
                Shop Now — From $6
              </motion.button>
            </Link>
            <Link href="#benefits">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent text-text-primary border-2 border-text-primary px-10 py-4 rounded-lg font-bold text-lg
                           hover:bg-text-primary/10 transition-colors
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-text-primary
                           focus:ring-offset-dark-bg min-h-[56px] min-w-[200px]"
                aria-label="Learn about BFFR benefits"
              >
                Learn More
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-text-muted rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-1.5 bg-text-muted rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}
