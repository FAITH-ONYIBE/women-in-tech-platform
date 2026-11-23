'use client';
import { BadgeCheck } from 'lucide-react';
import { useState } from 'react';
import { Logo } from '@/components/layout/Logo';
import { Photo } from '@/components/ui/Photo';
import { campaign } from '@/lib/mock-data/donate';

export function CampaignCard() {
  const [more, setMore] = useState(false);
  const pct = Math.round((campaign.raised / campaign.goal) * 100);

  return (
    <div className="overflow-hidden rounded-3xl border border-brand-line bg-white shadow-sm">
      <div className="px-8 pb-6 pt-10">
        <div className="flex justify-center py-8 scale-[1.9] origin-center" aria-hidden>
          <Logo />
        </div>
        <div className="mt-10 flex items-end justify-between">
          <p className="text-2xl font-semibold text-brand-ink">${campaign.raised.toLocaleString()}</p>
          <p className="text-[15px] text-brand-ink">
            {pct}% of ${campaign.goal.toLocaleString()} goal
          </p>
        </div>
        <div
          className="mt-2 h-3 w-full overflow-hidden rounded-full bg-[#E4E4E4]"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Fundraising progress"
        >
          <div className="h-full rounded-full bg-brand-red" style={{ width: `${pct}%` }} />
        </div>

        <h1 className="mt-7 text-2xl font-semibold text-brand-ink">{campaign.title}</h1>
        <p className="mt-4 text-base leading-[1.4] text-brand-ink/90">
          {campaign.intro}
          {more && campaign.more}
        </p>
        <Photo alt="Members attending a community workshop" tone="blue" hint="Replace with /public/images/workshop.jpg" className="mt-4 h-[124px] w-full" />
        <button onClick={() => setMore((v) => !v)} className="mt-3 text-base text-brand-red hover:underline">
          {more ? 'Read less' : 'Read more'}
        </button>
      </div>
      <div className="border-t border-brand-line bg-[#F3F3F3] px-8 py-5 text-xs leading-snug text-brand-ink">
        <p className="flex items-center gap-1 font-semibold text-emerald-700">
          <BadgeCheck size={13} aria-hidden /> Demo campaign
        </p>
        <p className="mt-1">Organised by {campaign.organiser}</p>
        <p>No real payments are processed.</p>
        <p className="underline">{campaign.contact}</p>
      </div>
    </div>
  );
}
