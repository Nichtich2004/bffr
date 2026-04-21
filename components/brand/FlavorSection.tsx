'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { clsx } from 'clsx';

const flavors = [
  {
    name: 'Green Tea',
    handle: 'green-tea',
    tagline: 'Morning Loading',
    features: ['Subtle Taste', '0 Calories', 'No Caffeine', 'Vegan'],
    image: '/grrentea_splash.png',
    colorClass: 'text-brand-green',
    buttonClass: 'bg-brand-green hover:bg-brand-green/90 focus:ring-brand-green',
    borderClass: 'border-brand-green/30',
  },
  {
    name: 'Tropical',
    handle: 'tropical',
    tagline: 'Pre-Race Power',
    features: ['Bold Flavor', 'With Caffeine', 'Pre-Effort', 'Vegan'],
    image: '/tropical_splash.png',
    colorClass: 'text-tropical-orange',
    buttonClass: 'bg-tropical-orange hover:bg-tropical-orange/90 focus:ring-tropical-orange',
    borderClass: 'border-tropical-orange/30',
  }
];

export function FlavorSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="flavors" className="bg-dark-bg py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-space-grotesk text-4xl md:text-6xl font-bold text-text-primary mb-4">
            Two Formulas.
            <br />
            One Goal.
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Choose your protocol: daily loading or race-day performance.
          </p>
        </motion.div>

        {/* Flavors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {flavors.map((flavor, index) => (
            <motion.div
              key={flavor.handle}
              initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.2, duration: 0.6 }}
            >
              <Link href={`/product/${flavor.handle}`} className="group block">
                <div className={clsx(
                  'bg-dark-surface rounded-3xl overflow-hidden border border-border-subtle',
                  'hover:border-neon-green/30 transition-all duration-300',
                  'hover:shadow-glow-subtle'
                )}>
                  {/* Product Image */}
                  <div className="relative h-96 bg-gradient-to-b from-dark-surface-2/30 to-transparent">
                    <Image
                      src={flavor.image}
                      alt={flavor.name}
                      fill
                      className="object-contain p-12 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Title */}
                    <h3 className={clsx(
                      'font-space-grotesk text-4xl font-bold mb-2',
                      flavor.colorClass
                    )}>
                      {flavor.name}
                    </h3>
                    <p className="text-text-primary text-xl font-semibold mb-6">
                      {flavor.tagline}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2 mb-8">
                      {flavor.features.map((feature) => (
                        <li key={feature} className="flex items-center text-text-muted">
                          <svg className="w-5 h-5 text-neon-green mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-text-primary">$6</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={clsx(
                          'text-dark-bg px-8 py-3 rounded-lg font-bold',
                          'transition-opacity',
                          'focus:outline-none focus:ring-2 focus:ring-offset-2',
                          'focus:ring-offset-dark-surface',
                          flavor.buttonClass
                        )}
                        aria-label={`Shop ${flavor.name}`}
                      >
                        Shop Now
                      </motion.button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
