import { Metadata } from 'next';
import { StoryHero } from '@/components/story/StoryHero';
import { ProblemSection } from '@/components/story/ProblemSection';
import { SolutionSection } from '@/components/story/SolutionSection';
import { TeamSection } from '@/components/story/TeamSection';

export const metadata: Metadata = {
  title: 'Our Story | BFFR Bicarb Pouches',
  description: 'Learn how BFFR revolutionized sodium bicarbonate delivery for endurance athletes.',
};

const heroStats = [
  { value: '2–3%', label: 'Performance Gain' },
  { value: '0', label: 'GI Distress Risk' },
  { value: '$6', label: 'Per Container' },
  { value: '80%', label: 'Paris 2024 Runners' },
];

const problemCards = [
  {
    value: '30%',
    label: 'GI Distress Rate',
    description: 'Traditional bicarb causes severe stomach issues in 3 out of 10 athletes',
  },
  {
    value: '$20',
    label: 'Maurten Cost',
    description: 'Hydrogel systems remain unaffordable — still cause GI issues',
  },
  {
    value: '90min',
    label: 'Slow Absorption',
    description: 'Traditional tablets require complex timing protocols',
  },
  {
    value: '2/3',
    label: 'Athletes Skip It',
    description: 'Most runners avoid bicarb due to GI risk — despite proven gains',
  },
];

const problemTestimonial = {
  quote: 'It didn\'t work very well because there was a high percentage of people that just couldn\'t even line up for the race because it just tore apart your stomach.',
  author: 'Steve Magness',
  role: 'Elite Running Coach & Author',
};

const solutionSteps = [
  {
    number: 1,
    title: 'Place Pouch',
    description: 'Tuck a small pouch under your upper or lower lip — just like a Zyn — 45–60 min before exercise. No mixing, no bowl, no complicated protocol.',
  },
  {
    number: 2,
    title: 'Buccal Absorption',
    description: 'Bicarb dissolves and absorbs directly through the highly vascularized buccal mucosa into systemic circulation. The stomach is completely bypassed.',
  },
  {
    number: 3,
    title: 'Buffer & Perform',
    description: 'Blood bicarbonate rises, neutralizing hydrogen ions during intense effort. Push harder, longer — without stomach risk. 2–3% proven performance gains.',
  },
];

const teamMembers = [
  {
    name: 'Jonas Weschle',
    role: 'Co-Founder — Product & Vision',
    bio: 'Deep passion for endurance running and sports performance. Identified the GI pain point firsthand. Leads product development and marketing strategy.',
  },
  {
    name: 'Nicholas Angell',
    role: 'Co-Founder — Finance & Operations',
    bio: 'Accounting Major. Brings financial modeling, cost accounting, and operations management expertise. Leads unit economics, fundraising, and regulatory compliance.',
  },
];

export default function StoryPage() {
  return (
    <main className="bg-dark-bg">
      <StoryHero
        title="Buffer Smarter. Perform Harder."
        subtitle="A buccal-delivery sodium bicarbonate pouch that eliminates GI distress and supercharges absorption — designed for competitive runners."
        stats={heroStats}
      />
      <ProblemSection
        headline="Sodium Bicarb Works. But Athletes Can't Use It."
        body="Research confirms sodium bicarbonate delivers measurable performance gains — but the GI side effects have kept it out of reach for everyday athletes for 40 years. Even Maurten's $20 hydrogel system hasn't fully solved it."
        problemCards={problemCards}
        testimonial={problemTestimonial}
      />
      <SolutionSection
        headline="BFFR Bicarb Pouches"
        subtitle="A buccal-delivery snus-style pouch placed under the lip — delivering sodium bicarbonate directly into the bloodstream, bypassing the stomach entirely. No stomach. No waiting. No GI risk."
        steps={solutionSteps}
      />
      <TeamSection members={teamMembers} />
    </main>
  );
}
