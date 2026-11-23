import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { donationTiers, partners, spotlight } from '@/lib/mock-data/home';

export function DonationBand() {
  return (
    <section className="bg-brand-crimson py-16 sm:py-24">
      <div className="container-narrow">
        <h2 className="text-center text-[28px] text-white sm:text-[32px]">Your Support Creates Opportunity</h2>
        <p className="mx-auto mt-8 max-w-[660px] text-center text-base leading-relaxed text-white sm:text-lg">
          Your gift supports free technology training, mentorship, workshops, and career development opportunities for women across
          Africa.
        </p>

        <Photo
          alt="Speakers and members at an africanqueen community event"
          hint="Replace with /public/images/event-wide.jpg"
          tone="navy"
          className="mt-14 aspect-[728/160] w-full rounded-2xl"
        />

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {donationTiers.map((t) => (
            <Link
              key={t.amount}
              href="/donate"
              className={`rounded-xl px-3 py-6 text-center transition-transform hover:-translate-y-0.5 ${
                t.featured ? 'bg-brand-navy text-white' : 'bg-white text-brand-navy'
              }`}
            >
              <span className={`block text-[28px] font-bold tracking-heading ${t.featured ? 'text-white' : 'text-brand-crimson'}`}>{t.amount}</span>
              <span className="mt-3 block text-sm leading-snug">{t.text}</span>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center">
          <Button href="/donate" variant="white" className="h-14 px-10 text-lg">
            Donate Now
          </Button>
          <p className="mt-5 text-sm text-white">Give once or monthly.</p>
        </div>

        <div className="mt-12 rounded-2xl bg-white px-6 py-7 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-crimson">Our partners</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm font-semibold text-brand-crimson">
            {partners.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-brand-muted">Sample partner names for the demo.</p>
        </div>

        <article className="mt-5 flex flex-col gap-5 rounded-2xl bg-white p-6 sm:flex-row sm:items-start sm:gap-6">
          <Photo alt={`${spotlight.name}, member from ${spotlight.country}`} tone="warm" className="h-24 w-24 flex-none rounded-full" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-crimson">Member spotlight</p>
            <h3 className="mt-2 text-xl text-brand-navy">
              {spotlight.name}, {spotlight.country}
            </h3>
            <p className="mt-3 text-base font-medium italic text-brand-navy">{spotlight.quote}</p>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
              {spotlight.body}{' '}
              <Link href={spotlight.link.href} className="font-bold text-brand-crimson hover:underline">
                {spotlight.link.label}
              </Link>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
