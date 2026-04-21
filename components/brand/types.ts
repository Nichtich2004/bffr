import { MotionValue } from 'framer-motion';

export interface BenefitCardProps {
  title: string;
  description: string;
  highlight: string;
  index: number;
  scrollProgress: MotionValue<number>;
}

export interface BentoCardProps {
  size: 'small' | 'medium' | 'large';
  title: string;
  description: string;
  icon: string;
  index: number;
}

export interface FlavorCardProps {
  name: string;
  handle: string;
  tagline: string;
  description: string;
  image: string;
  bg: string;
  accent: 'buffer-green' | 'race-orange';
}

export interface FlavorChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export type Flavor = 'green-tea' | 'tropical';

export interface FlavorConfig {
  bg: string;
  image: string;
  headline: string;
  subline: string;
  glow: string;
}

export interface ColorMapping {
  bg: string;
  text: string;
  hover: string;
  ring: string;
}

export type ColorMap = Record<'buffer-green' | 'race-orange', ColorMapping>;
