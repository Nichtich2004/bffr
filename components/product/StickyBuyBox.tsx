'use client';

import { motion } from 'framer-motion';
import { AddToCartButton } from '@/components/ui/AddToCartButton';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';

interface StickyBuyBoxProps {
  product: {
    title: string;
    description: string;
    price: { amount: string; currencyCode: string };
    variants: Array<{
      id: string;
      title: string;
      price: { amount: string; currencyCode: string };
    }>;
    handle: string;
  };
  productType: 'green-tea' | 'tropical' | 'subscription';
}

export function StickyBuyBox({ product, productType }: StickyBuyBoxProps) {
  const prefersReducedMotion = useReducedMotion();
  
  const colorClass = productType === 'green-tea' 
    ? 'text-brand-green' 
    : productType === 'tropical'
    ? 'text-tropical-orange'
    : 'text-neon-green';

  return (
    <motion.div
      initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-6"
    >
      {/* Category Badge */}
      <div className="inline-block">
        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-neon-green/10 text-neon-green border border-neon-green/20">
          {productType === 'subscription' ? 'Monthly Delivery' : 'Performance Formula'}
        </span>
      </div>
      
      {/* Title */}
      <h1 className={`font-space-grotesk text-5xl lg:text-6xl font-bold ${colorClass} leading-tight`}>
        {product.title}
      </h1>
      
      {/* Tagline */}
      <p className="text-xl text-text-muted leading-relaxed">
        {product.description}
      </p>
      
      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-bold text-text-primary">
          ${product.price.amount}
        </span>
        <span className="text-lg text-text-muted">
          {product.price.currencyCode}
        </span>
        {productType === 'subscription' && (
          <span className="ml-2 text-sm text-neon-green font-semibold">
            Save 15%
          </span>
        )}
      </div>
      
      {/* Add to Cart */}
      <div className="bg-dark-surface-2 rounded-2xl p-6 border border-border-subtle">
        <AddToCartButton
          productTitle={product.title}
          variants={product.variants}
          defaultVariantId={product.variants[0]?.id}
        />
      </div>
      
      {/* Shipping Info */}
      <div className="flex items-center gap-4 text-sm text-text-muted">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
          </svg>
          <span>Free shipping over $30</span>
        </div>
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>30-day money back</span>
        </div>
      </div>
    </motion.div>
  );
}
