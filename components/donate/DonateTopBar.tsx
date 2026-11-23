'use client';
import { Menu, Share2, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { NAV_ITEMS } from '@/lib/nav';
import { Logo } from '@/components/layout/Logo';

export function DonateTopBar() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: 'Fuel the Movement', url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user cancelled */
    }
  }

  return (
    <div className="relative mx-auto flex h-[92px] w-full max-w-[968px] items-center justify-between px-5">
      <Logo />
      <div className="flex items-center gap-5 text-[15px] text-brand-ink">
        <button onClick={share} className="inline-flex items-center gap-1.5 hover:text-brand-red">
          <Share2 size={16} aria-hidden /> {copied ? 'Link copied' : 'Share'}
        </button>
        <button onClick={() => setOpen((v) => !v)} aria-label="Menu" aria-expanded={open}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="absolute right-5 top-[76px] z-20 w-48 rounded-xl border border-brand-line bg-white p-2 shadow-lg" aria-label="Site">
          {NAV_ITEMS.map((n) => (
            <Link key={n.href} href={n.href} className="block rounded-md px-3 py-2 text-sm hover:bg-brand-mist">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}
