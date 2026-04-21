'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface ProductImageGalleryProps {
  image: string;
  alt: string;
  productType: 'green-tea' | 'tropical' | 'subscription';
}

export function ProductImageGallery({ image, alt, productType }: ProductImageGalleryProps) {
  const prefersReducedMotion = useReducedMotion();
  
  const glowColor = productType === 'green-tea' 
    ? 'shadow-glow-green' 
    : productType === 'tropical'
    ? 'shadow-glow-orange'
    : 'shadow-glow-subtle';

  return (
    <div className="relative">
      {/* Main Product Image */}
      <motion.div
        initial={{ opacity: prefersReducedMotion ? 1 : 0, scale: prefersReducedMotion ? 1 : 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative aspect-square rounded-3xl overflow-hidden bg-dark-surface border border-border-subtle"
      >
        <div className={`absolute inset-0 ${glowColor} opacity-40`} />
        <Image
          src={image}
          alt={alt}
          fill
          className="object-contain p-12"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </motion.div>
      
      {/* Trust Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-6 flex items-center justify-center gap-6 text-text-muted text-sm"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Science-Backed</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Vegan</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Zero Cal</span>
        </div>
      </motion.div>
    </div>
  );
}
