import { PageTitleCard } from './PageTitleCard';

/** Shown for nav pages that have no reference screenshot yet. */
export function PlaceholderPage({ title, note }: { title: string; note: string }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-brand-mist pb-20">
      <PageTitleCard title={title} />
      <div className="container-catalog mt-6">
        <div className="rounded-2xl border border-dashed border-brand-line bg-white p-8 text-brand-muted">
          <p className="font-medium text-brand-ink">{title} is not built yet.</p>
          <p className="mt-2 text-sm leading-relaxed">{note}</p>
        </div>
      </div>
    </div>
  );
}
