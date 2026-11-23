'use client';
import { Menu, Search, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isNavActive, NAV_ITEMS } from '@/lib/nav';
import { Button } from '@/components/ui/Button';
import { Logo } from './Logo';
import { SearchOverlay } from './SearchOverlay';

export function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);

  useEffect(() => setMenu(false), [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-brand-line bg-white">
        <div className="relative flex h-16 items-center justify-between px-4 sm:px-6">
          <Logo />

          {/* Desktop nav - centred like the reference */}
          <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active ? 'bg-brand-red text-white' : 'text-brand-ink/80 hover:text-brand-red'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSearch(true)}
              aria-label="Search"
              className="rounded-full p-2 text-brand-ink/80 hover:bg-brand-mist"
            >
              <Search size={18} />
            </button>
            <Button href="/login" variant="outline" size="sm" className="hidden sm:inline-flex">
              Log in
            </Button>
            <Button href="/join" size="sm">
              Join
            </Button>
            <button
              onClick={() => setMenu((v) => !v)}
              aria-label={menu ? 'Close menu' : 'Open menu'}
              aria-expanded={menu}
              aria-controls="mobile-nav"
              className="rounded-md p-2 text-brand-ink md:hidden"
            >
              {menu ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {menu && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-brand-line bg-white px-4 pb-4 pt-2 md:hidden">
            {NAV_ITEMS.map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block rounded-md px-3 py-3 text-[15px] font-medium ${
                    active ? 'bg-brand-red text-white' : 'text-brand-ink hover:bg-brand-mist'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/login" className="mt-2 block rounded-md border border-brand-line px-3 py-3 text-center text-[15px] font-medium sm:hidden">
              Log in
            </Link>
          </nav>
        )}
      </header>
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}
