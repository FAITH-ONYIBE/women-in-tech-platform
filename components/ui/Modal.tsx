'use client';
import { X } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import { useEscape } from '@/hooks/useEscape';

type Props = { open: boolean; onClose: () => void; title: string; children: ReactNode };

export function Modal({ open, onClose, title, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEscape(open, onClose);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    ref.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="presentation">
      <div className="absolute inset-0 bg-brand-navy/50" onClick={onClose} aria-hidden />
      <div
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-md rounded-3xl bg-white p-7 shadow-xl outline-none"
      >
        <button onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full p-2 text-brand-muted hover:bg-brand-mist">
          <X size={18} />
        </button>
        <h2 className="pr-8 text-xl">{title}</h2>
        <div className="mt-3 text-[15px] leading-relaxed text-brand-ink">{children}</div>
      </div>
    </div>
  );
}
