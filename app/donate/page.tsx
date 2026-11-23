import { CampaignCard } from '@/components/donate/CampaignCard';
import { DonateForm } from '@/components/donate/DonateForm';
import { DonateTopBar } from '@/components/donate/DonateTopBar';

/**
 * Mirrors the hosted donation page from the reference: white top, red gradient
 * below, two cards. Standalone chrome (no site header), as in the reference.
 */
export default function DonatePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white from-[320px] via-[#A78BDA] via-[321px] to-brand-red">
      <DonateTopBar />
      <main className="mx-auto grid w-full max-w-[968px] gap-5 px-5 pb-24 pt-2 lg:grid-cols-[512px_1fr] lg:items-start">
        <CampaignCard />
        <DonateForm />
      </main>
      <p className="absolute bottom-3 right-4 text-xs text-white/90">Demo donation form · frontend only</p>
    </div>
  );
}
