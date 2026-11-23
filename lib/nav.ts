/**
 * Single source of truth for primary navigation.
 * `Donate` points to the in-app demo donation page. If you later want to send
 * people to a hosted donation provider, change `href` and set `external: true`.
 */
export type NavItem = { label: string; href: string; external?: boolean };

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/courses' },
  { label: 'Events', href: '/events' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Donate', href: '/donate' },
];

/** The reference highlights only inner pages (e.g. Courses); Home is never filled. */
export function isNavActive(pathname: string, href: string) {
  if (href === '/') return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}
