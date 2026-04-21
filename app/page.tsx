import { HeroSection } from '@/components/brand/HeroSection';
import { BenefitsGrid } from '@/components/brand/BenefitsGrid';
import { FlavorSection } from '@/components/brand/FlavorSection';

export default function HomePage() {
  return (
    <main className="bg-dark-bg">
      <HeroSection />
      <BenefitsGrid />
      <FlavorSection />
    </main>
  );
}
