import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/ui/PlaceholderPage';

export const metadata: Metadata = { title: 'Leaderboard' };

export default function LeaderboardPage() {
  return <PlaceholderPage title="Leaderboard" note="This page is in the navigation but no reference screenshot was supplied. It will be built once a reference is shared." />;
}
