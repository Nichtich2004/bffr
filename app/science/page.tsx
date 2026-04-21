import { Metadata } from 'next';
import Link from 'next/link';
import { ScienceHero } from '@/components/science/ScienceHero';
import { MechanismSection } from '@/components/science/MechanismSection';
import { EvidenceSection } from '@/components/science/EvidenceSection';
import { ComparisonSection } from '@/components/science/ComparisonSection';
import { DosingProtocol } from '@/components/science/DosingProtocol';
import { StudiesSection } from '@/components/science/StudiesSection';

export const metadata: Metadata = {
  title: 'Science - BFFR Bicarb Pouches',
  description: 'The science behind sodium bicarbonate buffering and BFFR\'s buccal delivery system.',
};

export default function SciencePage() {
  return (
    <main className="bg-dark-bg pt-20">
      <ScienceHero />
      <MechanismSection />
      <EvidenceSection />
      <ComparisonSection />
      <DosingProtocol />
      <StudiesSection />
    </main>
  );
}
