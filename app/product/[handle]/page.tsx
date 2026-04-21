import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductByHandle } from '@/lib/shopify/client';
import { AddToCartButton } from '@/components/ui/AddToCartButton';

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProductByHandle(params.handle);
  
  if (!product) {
    notFound();
  }
  
  // Determine product image and color
  const productConfig = {
    'green-tea': {
      image: '/grrentea_splash.png',
      color: 'brand-green',
      gradient: 'from-brand-green/20 to-transparent',
      tagline: 'Morning Loading Formula',
      benefits: [
        'Subtle Taste',
        '0 Calories',
        'No Caffeine',
        'Vegan Formula'
      ]
    },
    'tropical': {
      image: '/tropical_splash.png',
      color: 'tropical-orange',
      gradient: 'from-tropical-orange/20 to-transparent',
      tagline: 'Pre-Race Power',
      benefits: [
        'Bold Flavor',
        'With Caffeine',
        'Pre-Effort Ritual',
        'Vegan Formula'
      ]
    },
    'monthly-subscription': {
      image: '/hero.png',
      color: 'neon-green',
      gradient: 'from-neon-green/20 to-transparent',
      tagline: 'Mix of Both',
      benefits: [
        'Green + Tropical',
        'Save 15%',
        'Recurring Delivery',
        'Cancel Anytime'
      ]
    }
  };

  const config = productConfig[product.handle as keyof typeof productConfig] || productConfig['green-tea'];
  
  const variants = product.variants.edges.map(({ node: variant }) => ({
    id: variant.id,
    title: variant.title,
    price: {
      amount: variant.priceV2.amount,
      currencyCode: variant.priceV2.currencyCode,
    },
  }));
  
  return (
    <main className="min-h-screen bg-dark-bg pt-20">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Product Image */}
          <div className="relative">
            <div className={`absolute inset-0 bg-gradient-radial ${config.gradient} opacity-30 blur-3xl`} />
            <div className="relative bg-dark-surface rounded-3xl p-12 border border-border-subtle">
              <Image
                src={config.image}
                alt={product.title}
                width={600}
                height={800}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
          
          {/* Right: Product Info */}
          <div className="space-y-8">
            {/* Title */}
            <div>
              <p className={`text-${config.color} text-sm font-bold tracking-widest uppercase mb-2`}>
                {config.tagline}
              </p>
              <h1 className="font-space-grotesk text-5xl md:text-6xl font-bold text-text-primary mb-4">
                {product.title}
              </h1>
              <p className="text-text-muted text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              {config.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-neon-green flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-text-primary">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Price & Add to Cart */}
            <div className="border-t border-border-subtle pt-8">
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-text-primary font-jetbrains">
                  ${product.priceRange.minVariantPrice.amount}
                </span>
                <span className="text-text-muted">per container (15 pouches)</span>
              </div>

              <AddToCartButton 
                variants={variants}
                productTitle={product.title}
              />
            </div>

            {/* Science Note */}
            <div className="bg-dark-surface-2/50 border border-border-subtle rounded-xl p-6">
              <h3 className="font-space-grotesk font-bold text-text-primary mb-2">
                Science-Backed Formula
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Sodium bicarbonate buffering proven by 15+ peer-reviewed studies to enhance 
                endurance performance. Pre-load 60-90 minutes before effort for optimal results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
