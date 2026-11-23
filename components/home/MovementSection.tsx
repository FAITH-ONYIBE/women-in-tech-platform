import { Check } from 'lucide-react';
import { Photo } from '@/components/ui/Photo';
import { movement } from '@/lib/mock-data/home';

export function MovementSection() {
  return (
    <section className="bg-white py-16 sm:py-28">
      <div className="container-page">
        <h2 className="mx-auto text-center text-[28px] leading-[1.35] text-brand-navy">
          {movement.title.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </h2>
        <p className="mx-auto mt-8 max-w-[690px] text-center text-base leading-relaxed text-brand-navy sm:text-lg">{movement.body}</p>

        <div className="mt-16 grid items-start gap-10 md:grid-cols-2 md:gap-14 lg:mt-24">
          <Photo
          src="/images/panel.jpg"
            alt="Speakers on a panel at a community event"
            hint="Replace with /public/images/panel.jpg"
            tone="warm"
            className="aspect-[552/441] w-full rounded-3xl"
          />
          <div>
            <blockquote className="border-l-2 border-brand-line pl-[10px] text-[21px] font-semibold italic leading-[1.45] text-brand-navy sm:text-[22px]">
              {movement.quote}
            </blockquote>
            <ul className="mt-8 flex flex-wrap gap-3" aria-label="Who we support">
              {movement.tags.map((t) => (
                <li key={t} className="rounded-full border border-brand-line px-[15px] py-[9px] text-sm text-brand-navy">
                  {t}
                </li>
              ))}
            </ul>
            <ul className="mt-9 space-y-3">
              {movement.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[17px] leading-snug text-brand-navy">
                  <span className="mt-[3px] flex h-4 w-4 flex-none items-center justify-center rounded-full bg-brand-red text-white">
                    <Check size={11} strokeWidth={3.5} aria-hidden />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
