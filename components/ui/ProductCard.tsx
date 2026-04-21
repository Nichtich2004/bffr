import Image from 'next/image';
import type { ShopifyProduct } from '@/lib/shopify/client';

interface ProductCardProps {
  product: ShopifyProduct;
  theme?: 'dark' | 'light';
}

export function ProductCard({ product, theme = 'dark' }: ProductCardProps) {
  const isDark = theme === 'dark';
  
  const cardStyles = isDark 
    ? 'bg-deep-field text-off-white' 
    : 'bg-off-white text-deep-field border border-sage-mist';
  
  const subtitle = product.description && product.description.length > 0
    ? product.description.slice(0, 100)
    : 'Performance system for athletes';
  
  return (
    <div className={`rounded-xl p-6 flex flex-col gap-4 transition-transform hover:scale-105 ${cardStyles}`}>
      {product.featuredImage && (
        <div className="relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      
      <div className="flex-1">
        <h3 className="text-xl font-headline font-bold mb-2">
          {product.title}
        </h3>
        <p className={`text-sm mb-4 ${isDark ? 'text-sage-mist' : 'text-deep-field/70'}`}>
          {subtitle}
        </p>
      </div>
      
      <div>
        <span className="font-mono text-2xl font-bold">
          ${product.priceRange.minVariantPrice.amount}
        </span>
      </div>
    </div>
  );
}
