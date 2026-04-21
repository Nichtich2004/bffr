'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { BenefitCardProps } from './types';

const benefits = [
  {
    title: 'Instant Energy',
    description: 'Fast-acting sodium bicarbonate buffer',
    highlight: 'Label callout'
  },
  {
    title: 'Zero Calories',
    description: 'Clean formula, no sugar, vegan',
    highlight: 'Ingredient panel'
  },
  {
    title: 'Sport Ready',
    description: 'Pre-race ritual, trusted by athletes',
    highlight: 'Dose rotation'
  }
];

export function PinnedBenefitsScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [isScrolling, setIsScrolling] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const rotation = useTransform(
    scrollYProgress, 
    [0, 1], 
    prefersReducedMotion ? [0, 0] : [0, 12]
  );

  // Track scrolling for will-change optimization
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-black" 
      style={{ height: '300vh' }}
      aria-label="Product benefits showcase"
    >
      {/* Sticky Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Benefits */}
            <div className="space-y-12">
              {benefits.map((benefit, i) => (
                <BenefitCard
                  key={i}
                  {...benefit}
                  index={i}
                  scrollProgress={scrollYProgress}
                />
              ))}
            </div>

            {/* Right: Pinned Product */}
            <motion.div
              style={{ 
                rotate: rotation,
                willChange: isScrolling ? 'transform' : 'auto'
              }}
              className="relative"
            >
              <Image
                src="/grrentea_splash.png"
                alt="Product"
                width={500}
                height={700}
                className="w-full h-auto shadow-glow-green"
                sizes="(max-width: 768px) 300px, 500px"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitCard({ title, description, index, scrollProgress }: BenefitCardProps) {
  const prefersReducedMotion = useReducedMotion();
  
  const opacity = useTransform(
    scrollProgress,
    [index / 3, (index + 0.5) / 3, (index + 1) / 3],
    prefersReducedMotion ? [1, 1, 1] : [0, 1, 0]
  );

  return (
    <motion.div
      style={{ opacity }}
      className="border-l-4 border-buffer-green pl-6"
    >
      <h3 className="font-space-grotesk text-4xl font-bold text-off-white mb-2">
        {title}
      </h3>
      <p className="text-sage-mist text-lg">
        {description}
      </p>
    </motion.div>
  );
}
