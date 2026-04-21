'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface ProductProtocolProps {
  productType: 'green-tea' | 'tropical' | 'subscription';
}

const protocolMap = {
  'green-tea': [
    { step: '1', title: 'Daily Loading Phase', description: 'Take 1 pouch (size based on body weight) daily for 3-5 days to build buffer levels.' },
    { step: '2', title: 'Maintenance', description: 'Continue daily supplementation to maintain optimal bicarb levels year-round.' },
    { step: '3', title: 'No Timing Required', description: 'Take anytime - designed for consistent daily use, not acute dosing.' },
  ],
  'tropical': [
    { step: '1', title: 'Pre-Race Timing', description: 'Take 45-60 minutes before your race or hard training session.' },
    { step: '2', title: 'Size Selection', description: 'Choose S/M/L based on body weight and training intensity.' },
    { step: '3', title: 'Peak Performance', description: 'Experience buffering effects during high-intensity efforts lasting 1-10 minutes.' },
  ],
  'subscription': [
    { step: '1', title: 'Monthly Delivery', description: 'Receive 2 containers (Green Tea + Tropical) automatically each month.' },
    { step: '2', title: 'Mix & Match', description: 'Use Green Tea for daily loading, Tropical for race days. Adjust ratio based on racing calendar.' },
    { step: '3', title: 'Manage Online', description: 'Pause, skip, or cancel your subscription anytime through your account.' },
  ]
};

export function ProductProtocol({ productType }: ProductProtocolProps) {
  const prefersReducedMotion = useReducedMotion();
  const protocol = protocolMap[productType];

  return (
    <div className="bg-dark-surface-2 rounded-2xl p-8 border border-border-subtle">
      <h2 className="font-space-grotesk text-3xl font-bold text-text-primary mb-8">
        How to Use
      </h2>
      
      <div className="space-y-6">
        {protocol.map((item, index) => (
          <motion.div
            key={item.step}
            initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="flex gap-4"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neon-green/20 border border-neon-green flex items-center justify-center">
              <span className="text-neon-green font-bold">{item.step}</span>
            </div>
            <div>
              <h3 className="font-space-grotesk text-lg font-bold text-text-primary mb-2">
                {item.title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
