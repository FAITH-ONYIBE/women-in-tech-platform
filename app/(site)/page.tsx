import { DonationBand } from '@/components/home/DonationBand';
import { FeatureGrid } from '@/components/home/FeatureGrid';
import { Hero } from '@/components/home/Hero';
import { MovementSection } from '@/components/home/MovementSection';
import { StatsBand } from '@/components/home/StatsBand';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <StatsBand />
      <MovementSection />
      <DonationBand />
    </>
  );
}
