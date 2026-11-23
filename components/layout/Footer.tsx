import Link from 'next/link';
import { NAV_ITEMS } from '@/lib/nav';
import { Logo } from './Logo';

const account = [
  { label: 'Log in', href: '/login' },
  { label: 'Join free', href: '/join' },
];

export function Footer() {
  return (
    <footer className="border-t border-brand-line bg-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-brand-muted">
            Free tech training, mentorship, grants and jobs for African women.
          </p>
        </div>

        <nav aria-label="Explore">
          <h2 className="text-sm font-semibold tracking-normal text-brand-navy">Explore</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {NAV_ITEMS.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-brand-muted hover:text-brand-red">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Account">
          <h2 className="text-sm font-semibold tracking-normal text-brand-navy">Account</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {account.map((a) => (
              <li key={a.href}>
                <Link href={a.href} className="text-brand-muted hover:text-brand-red">
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-brand-line">
        <p className="container-page py-5 text-xs text-brand-muted">
          © {new Date().getFullYear()} africanqueen. Academic demo project.
        </p>
      </div>
    </footer>
  );
}