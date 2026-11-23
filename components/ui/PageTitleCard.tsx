export function PageTitleCard({ title }: { title: string }) {
  return (
    <div className="border-x border-b border-brand-line bg-white sm:rounded-b-3xl">
      <div className="container-catalog">
        <h1 className="py-8 text-[26px] font-semibold text-brand-ink sm:py-9">{title}</h1>
      </div>
    </div>
  );
}
