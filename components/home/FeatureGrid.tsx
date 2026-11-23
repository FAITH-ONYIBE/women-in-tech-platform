import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { features } from '@/lib/mock-data/home';

const tones = ['warm', 'navy', 'blue', 'warm'] as const;

export function FeatureGrid() {
  return (
    <section className="bg-brand-blush pb-8 pt-10 sm:pt-16">
      <div className="container-page">
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          {features.map((f, i) => (
            <article key={f.title} className="rounded-3xl border border-brand-line bg-white p-[30px]">
              <Photo alt="" tone={tones[i]} className="h-[120px] w-[120px] rounded-full" />
              <h3 className="mt-6 text-2xl text-brand-navy">{f.title}</h3>
              <p className="mt-6 text-[15px] leading-relaxed text-brand-navy">
                {f.body}{' '}
                {f.link && (
                  <Link href={f.link.href} className="text-brand-red underline underline-offset-2 hover:text-brand-red-dark">
                    {f.link.label}
                  </Link>
                )}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center pb-12 sm:pb-16">
          <Button href="/join">Join Free Today</Button>
          <p className="mt-6 text-sm text-brand-navy">Free to join. Open to women everywhere.</p>
        </div>
      </div>
    </section>
  );
}
