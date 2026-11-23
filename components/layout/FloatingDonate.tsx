import { Heart } from 'lucide-react';
import Link from 'next/link';

export function FloatingDonate() {
  return (
    <Link
      href="/donate"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-brand-red px-5 py-3 text-[15px] font-semibold text-white shadow-lg shadow-brand-red/25 transition-colors hover:bg-brand-red-dark sm:bottom-6 sm:right-6"
    >
      <Heart size={18} fill="currentColor" aria-hidden />
      Support a Future Leader
    </Link>
  );
}
