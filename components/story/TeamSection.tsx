'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

interface TeamSectionProps {
  members: TeamMember[];
}

export function TeamSection({ members }: TeamSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="bg-dark-bg py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-space-grotesk text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6">
            Meet the Team
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Built by athletes, for athletes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: prefersReducedMotion ? 0 : index * 0.15 }}
              className="group"
            >
              <div className="relative rounded-xl overflow-hidden bg-dark-surface border border-border-subtle/30 hover:border-neon-green/50 transition-all hover:shadow-glow-green/20">
                <div className="relative w-full h-80 bg-gradient-to-b from-dark-surface-2 to-dark-surface overflow-hidden">
                  <div className="w-full h-full bg-gradient-radial from-neon-green/10 via-transparent to-transparent flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 rounded-full bg-neon-green/10 border-2 border-neon-green/30 mx-auto mb-4" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
                </div>

                <div className="relative p-8">
                  <h3 className="font-space-grotesk text-2xl font-bold text-text-primary mb-1">
                    {member.name}
                  </h3>
                  <div className="text-neon-green font-medium text-sm mb-6">
                    {member.role}
                  </div>
                  <p className="text-text-muted leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
