'use client';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { courses } from '@/lib/mock-data/courses';
import { NAV_ITEMS } from '@/lib/nav';
import { useEscape } from '@/hooks/useEscape';

type Result = { label: string; hint: string; href: string };

const index: Result[] = [
  ...NAV_ITEMS.map((n) => ({ label: n.label, hint: 'Page', href: n.href })),
  ...courses.map((c) => ({ label: c.title, hint: `Course · ${c.category}`, href: '/courses' })),
];

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);
  useEscape(open, onClose);

  useEffect(() => {
    if (open) input.current?.focus();
    else setQ('');
  }, [open]);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return [];
    return index.filter((r) => r.label.toLowerCase().includes(t) || r.hint.toLowerCase().includes(t));
  }, [q]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-brand-navy/40" onClick={onClose} aria-hidden />
      <div className="relative mx-auto mt-16 w-[calc(100%-2rem)] max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-center gap-3 border-b border-brand-line px-4">
          <Search size={18} className="text-brand-muted" aria-hidden />
          <input
            ref={input}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search courses and pages"
            className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-brand-muted"
            aria-label="Search"
          />
          <button onClick={onClose} aria-label="Close search" className="rounded-full p-2 text-brand-muted hover:bg-brand-mist">
            <X size={18} />
          </button>
        </div>
        <ul className="max-h-80 overflow-y-auto py-2">
          {q.trim() === '' && <li className="px-4 py-3 text-sm text-brand-muted">Start typing to search.</li>}
          {q.trim() !== '' && results.length === 0 && (
            <li className="px-4 py-3 text-sm text-brand-muted">No results for “{q}”. Try a course name such as networking.</li>
          )}
          {results.map((r) => (
            <li key={r.label + r.href}>
              <Link href={r.href} onClick={onClose} className="flex flex-col px-4 py-2.5 hover:bg-brand-mist">
                <span className="text-[15px] font-medium text-brand-ink">{r.label}</span>
                <span className="text-xs text-brand-muted">{r.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
