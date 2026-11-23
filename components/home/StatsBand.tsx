import { stats } from '@/lib/mock-data/home';

export function StatsBand() {
  return (
    <section aria-label="Community impact" className="bg-brand-navy py-14 sm:py-28">
      <div className="container-page grid grid-cols-2 gap-4 sm:gap-[30px] lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-white px-3 py-7 text-center sm:py-9">
            <p className="text-3xl font-bold tracking-heading text-brand-red sm:text-[40px]">{s.value}</p>
            <p className="mt-2 text-sm text-brand-navy sm:text-lg">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
