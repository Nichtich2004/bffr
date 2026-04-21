'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function MechanismSection() {
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    {
      number: '01',
      title: 'Buccal Absorption',
      description: 'Bicarb dissolves and absorbs directly through the highly vascularized buccal mucosa into systemic circulation. The stomach is completely bypassed.'
    },
    {
      number: '02',
      title: 'Blood Buffer Elevation',
      description: 'Blood bicarbonate concentration rises, creating a stronger pH buffer system ready to neutralize acid buildup during intense exercise.'
    },
    {
      number: '03',
      title: 'H+ Neutralization',
      description: 'During high-intensity effort, hydrogen ions (H+) accumulate in muscles. Elevated bicarbonate neutralizes these ions, delaying fatigue and extending time to exhaustion.'
    }
  ];

  return (
    <section className="bg-dark-surface py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-text-primary mb-4">
            How It Works
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Sodium bicarbonate's buffering mechanism explained
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.2 }}
              className="relative"
            >
              {/* Step Number */}
              <div className="text-neon-green/20 font-space-grotesk text-7xl font-bold mb-4">
                {step.number}
              </div>
              
              {/* Content */}
              <h3 className="font-space-grotesk text-2xl font-bold text-text-primary mb-3">
                {step.title}
              </h3>
              <p className="text-text-muted leading-relaxed">
                {step.description}
              </p>

              {/* Arrow to next step (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 -right-6 text-neon-green/30">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Visual Mechanism Schema */}
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20"
        >
          <div className="bg-dark-bg/50 border border-border-subtle rounded-2xl overflow-hidden p-8 md:p-12">
            <h3 className="font-space-grotesk text-3xl font-bold text-text-primary mb-6 text-center">
              The Buffering Effect Visualized
            </h3>
            
            <div className="relative w-full aspect-video rounded-xl overflow-hidden">
              <Image
                src="/science.png"
                alt="BFFR Bicarbonate Buffering Mechanism - Blood bicarbonate buffer neutralizes H+ accumulation in muscle, delaying fatigue and enabling higher performance output"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-block p-3 bg-error/10 rounded-lg mb-3">
                  <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h4 className="font-bold text-text-primary mb-2">H+ Accumulation</h4>
                <p className="text-sm text-text-muted">
                  High-intensity exercise produces hydrogen ions, causing muscle fatigue and performance decline
                </p>
              </div>

              <div className="text-center">
                <div className="inline-block p-3 bg-neon-green/10 rounded-lg mb-3">
                  <svg className="w-8 h-8 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-bold text-text-primary mb-2">Bicarbonate Buffer</h4>
                <p className="text-sm text-text-muted">
                  BFFR's buccal delivery raises blood bicarbonate levels, creating a powerful pH buffer system
                </p>
              </div>

              <div className="text-center">
                <div className="inline-block p-3 bg-neon-green/10 rounded-lg mb-3">
                  <svg className="w-8 h-8 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-text-primary mb-2">Delayed Fatigue</h4>
                <p className="text-sm text-text-muted">
                  Buffer neutralizes H+ ions, extending time to exhaustion and enabling higher performance output
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
