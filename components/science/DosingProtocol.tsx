'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

export function DosingProtocol() {
  const prefersReducedMotion = useReducedMotion();

  const protocols = [
    {
      size: 'S',
      label: 'Light Dose',
      bodyWeight: '<70 kg',
      pouches: '1 pouch',
      timing: '45–60 min pre-effort',
      color: 'brand-green'
    },
    {
      size: 'M',
      label: 'Standard Dose',
      bodyWeight: '70–85 kg',
      pouches: '1–2 pouches',
      timing: '45–60 min pre-effort',
      color: 'neon-green'
    },
    {
      size: 'L',
      label: 'Heavy Dose',
      bodyWeight: '>85 kg',
      pouches: '2 pouches',
      timing: '45–60 min pre-effort',
      color: 'tropical-orange'
    }
  ];

  return (
    <section className="bg-dark-bg py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-space-grotesk text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Dosing Protocol
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Recommended dosage based on body weight and training load
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {protocols.map((protocol, index) => (
            <motion.div
              key={protocol.size}
              initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.15 }}
              className="bg-dark-surface border border-border-subtle rounded-2xl p-8
                         hover:border-neon-green/30 transition-all hover:shadow-glow-subtle"
            >
              <div className={`inline-block bg-${protocol.color}/15 text-${protocol.color} 
                             px-4 py-2 rounded-full text-sm font-bold mb-4`}>
                Size {protocol.size}
              </div>
              
              <h3 className="font-space-grotesk text-2xl font-bold text-text-primary mb-2">
                {protocol.label}
              </h3>
              
              <div className="space-y-3 mt-6">
                <div className="flex justify-between items-center pb-3 border-b border-border-subtle">
                  <span className="text-text-muted text-sm">Body Weight</span>
                  <span className="text-text-primary font-semibold">{protocol.bodyWeight}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border-subtle">
                  <span className="text-text-muted text-sm">Dosage</span>
                  <span className="text-text-primary font-semibold">{protocol.pouches}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted text-sm">Timing</span>
                  <span className="text-text-primary font-semibold">{protocol.timing}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Note */}
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto bg-dark-surface-2/50 border border-border-subtle 
                     rounded-xl p-6 text-center"
        >
          <p className="text-text-muted text-sm leading-relaxed">
            <strong className="text-text-primary">Pro Tip:</strong> For multi-day competitions or 
            training blocks, consider a loading protocol of 1 pouch 2× daily for 3–5 days prior to 
            the event for maximal buffering capacity.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
