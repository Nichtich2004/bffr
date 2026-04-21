'use client';

import { useState } from 'react';
import { addCartItem, openCartDrawer } from '@/lib/cart/store';
import type { CartItem } from '@/lib/cart/types';

interface Variant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
}

interface AddToCartButtonProps {
  productTitle: string;
  variants: Variant[];
  defaultVariantId?: string;
}

export function AddToCartButton({
  productTitle,
  variants,
  defaultVariantId,
}: AddToCartButtonProps) {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    defaultVariantId || variants[0]?.id || ''
  );
  const [isAdding, setIsAdding] = useState(false);

  // Normalize variant titles and separate Daily/Race variants
  // Use word boundary matching to ensure 'daily' and 'race' are distinct variant types
  const getDailyVariants = () =>
    variants.filter((v) => {
      const title = v.title.toLowerCase();
      return /\bdaily\b/.test(title) && !/race|sprint/.test(title);
    });

  const getRaceVariants = () =>
    variants.filter((v) => {
      const title = v.title.toLowerCase();
      return /\b(race|sprint)\b/.test(title);
    });

  const dailyVariants = getDailyVariants();
  const raceVariants = getRaceVariants();

  const handleAddToCart = async () => {
    const selectedVariant = variants.find((v) => v.id === selectedVariantId);
    if (!selectedVariant) return;

    setIsAdding(true);

    const cartItem: CartItem = {
      id: selectedVariant.id,
      merchandiseId: selectedVariant.id,
      title: productTitle,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price.amount,
      currencyCode: selectedVariant.price.currencyCode,
      quantity: 1,
    };

    addCartItem(cartItem);
    openCartDrawer();

    // Small delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsAdding(false);
  };

  return (
    <div className="space-y-4">
      {/* SKU Switcher */}
      {(dailyVariants.length > 0 || raceVariants.length > 0) && (
        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
            Choose Your Variant
          </h3>
          <div className="flex gap-3">
            {dailyVariants.length > 0 && (
              <button
                data-testid="sku-daily"
                onClick={() => setSelectedVariantId(dailyVariants[0].id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-green
                  focus:ring-offset-dark-surface-2
                  ${selectedVariantId === dailyVariants[0].id 
                    ? 'bg-neon-green text-dark-bg' 
                    : 'bg-dark-surface text-text-muted border border-border-subtle hover:border-neon-green'
                  }`}
              >
                <div className="font-semibold text-sm">Daily</div>
                <div className="text-xs text-text-muted font-mono">
                  ${dailyVariants[0].price.amount}
                </div>
              </button>
            )}

            {raceVariants.length > 0 && (
              <button
                data-testid="sku-race"
                onClick={() => setSelectedVariantId(raceVariants[0].id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-green
                  focus:ring-offset-dark-surface-2
                  ${selectedVariantId === raceVariants[0].id 
                    ? 'bg-neon-green text-dark-bg' 
                    : 'bg-dark-surface text-text-muted border border-border-subtle hover:border-neon-green'
                  }`}
              >
                <div className="font-semibold text-sm">Race</div>
                <div className="text-xs text-text-muted font-mono">
                  ${raceVariants[0].price.amount}
                </div>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Add to Cart Button */}
      <button
        data-testid="add-to-cart"
        className="w-full bg-neon-green text-dark-bg px-6 py-4 rounded-lg font-bold text-lg
                   hover:bg-neon-green/90 transition-colors
                   focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-green
                   focus:ring-offset-dark-surface-2 min-h-[56px]
                   disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleAddToCart}
        disabled={isAdding || !selectedVariantId}
      >
        {isAdding ? 'Adding...' : 'Add to Cart'}
      </button>
    </div>
  );
}
