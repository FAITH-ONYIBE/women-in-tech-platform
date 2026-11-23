import Link from 'next/link';

/** Original africanqueen mark: a five-point crown in brand red + stacked wordmark. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" aria-label="africanqueen home" className={`flex items-center gap-2 ${className}`}>
      <svg width="38" height="34" viewBox="0 0 38 34" aria-hidden>
        <path d="M2 28 L5 8 L13 17 L19 3 L25 17 L33 8 L36 28 Z" fill="#6D28D9" />
        <rect x="2" y="29.5" width="34" height="3.5" rx="1.75" fill="#6D28D9" />
        <circle cx="5" cy="6" r="2.2" fill="#6D28D9" />
        <circle cx="19" cy="1.8" r="2.2" fill="#6D28D9" />
        <circle cx="33" cy="6" r="2.2" fill="#6D28D9" />
      </svg>
      <span className="flex flex-col text-[15px] font-extrabold uppercase leading-[0.95] tracking-tight text-brand-red">
        <span>African</span>
        <span>Queen</span>
      </span>
    </Link>
  );
}
