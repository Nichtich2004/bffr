'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface ProductFeaturesProps {
  productType: 'green-tea' | 'tropical' | 'subscription';
}

const featuresMap = {
  'green-tea': [
    { title: 'Subtle Green Tea Taste', description: 'Pleasant flavor profile for daily use without overwhelming your palate.' },
    { title: 'Morning Loading Protocol', description: 'Designed for consistent daily supplementation to maintain optimal buffer levels.' },
    { title: 'Zero Caffeine', description: 'Won\'t interfere with your sleep or caffeine strategy.' },
    { title: '0 Calories', description: 'Clean performance enhancement without added calories.' },
  ],
  'tropical': [
    { title: 'Bold Tropical Flavor', description: 'Energizing taste designed for pre-race rituals.' },
    { title: 'Pre-Race Formula', description: 'Optimized timing for peak performance when it matters most.' },
    { title: 'With Caffeine', description: 'Additional stimulant for race-day energy and focus.' },
    { title: '0 Calories', description: 'Pure performance without compromising your nutrition plan.' },
  ],
  'subscription': [
    { title: 'Both Formulas', description: 'Green Tea for daily loading, Tropical for race day.' },
    { title: 'Save 15%', description: 'Recurring delivery at a discounted price.' },
    { title: 'Flexible Mix', description: 'Adjust your mix ratio based on training cycles.' },
    { title: 'Cancel Anytime', description: 'No commitments, manage your subscription online.' },
  ]
};

export function ProductFeatures({ productType }: ProductFeaturesProps) {
  const prefersReducedMotion = useReducedMotion();
  const features = featuresMap[productType];

  return (
    <div className="space-y-6">
      <h2 className="font-space-grotesk text-3xl font-bold text-text-primary">
        What's Inside
      </h2>
      
      <div className="grid gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: prefersReducedMotion ? 1 : 0, x: prefersReducedMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-dark-surface border border-border-subtle rounded-xl p-6 hover:border-neon-green/30 transition-colors"
          >
            <h3 className="font-space-grotesk text-lg font-bold text-text-primary mb-2">
              {feature.title}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
