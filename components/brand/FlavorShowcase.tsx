'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FlavorCardProps, ColorMap } from './types';

const colorMap: ColorMap = {
  'buffer-green': {
    bg: 'bg-buffer-green',
    text: 'text-buffer-green',
    hover: 'hover:bg-buffer-green/90',
    ring: 'focus:ring-buffer-green'
  },
  'race-orange': {
    bg: 'bg-race-orange',
    text: 'text-race-orange',
    hover: 'hover:bg-race-orange/90',
    ring: 'focus:ring-race-orange'
  }
} as const;

const flavors = [
  {
    name: 'Green Tea',
    handle: 'green-tea',
    tagline: 'Morning Loading Formula',
    description: 'Subtle taste · 0 Calories · Vegan · No Caffeine',
    image: '/grrentea_splash.png',
    bg: 'from-deep-field to-black',
    accent: 'buffer-green'
  },
  {
    name: 'Tropical',
    handle: 'tropical',
    tagline: 'Pre-Race Formula',
    description: 'Bold taste · With Caffeine · Pre-effort ritual',
    image: '/tropical_splash.png',
    bg: 'from-warm-accent to-black',
    accent: 'race-orange'
  }
] as const;

export function FlavorShowcase() {
  return (
    <section className="bg-black py-24" aria-labelledby="flavor-heading">
      <div className="container mx-auto px-6">
        <h2 id="flavor-heading" className="font-space-grotesk text-5xl font-bold text-off-white mb-12 text-center">
          Choose Your Buffer
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {flavors.map((flavor) => (
            <FlavorCard key={flavor.handle} {...flavor} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlavorCard({ name, handle, tagline, description, image, bg, accent }: FlavorCardProps) {
  const colors = colorMap[accent];
  
  return (
    <Link href={`/product/${handle}`}>
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        className={`relative bg-gradient-to-b ${bg} rounded-2xl overflow-hidden border border-sage-mist/20 cursor-pointer group`}
      >
        <div className="p-8">
          <h3 className={`font-space-grotesk text-3xl font-bold ${colors.text} mb-2`}>
            {name}
          </h3>
          <p className="text-off-white text-lg mb-3 font-semibold">
            {tagline}
          </p>
          <p className="text-sage-mist text-sm mb-6">
            {description}
          </p>
          
          <div className="relative w-full h-80 mb-6">
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            aria-label={`Shop ${name} for $6`}
            className={`w-full ${colors.bg} text-black py-3 rounded-lg font-bold min-h-[44px]
                        focus:outline-none focus:ring-2 focus:ring-offset-2 ${colors.ring} focus:ring-offset-black`}
          >
            Shop {name} — $6
          </motion.button>
        </div>
      </motion.div>
    </Link>
  );
}
