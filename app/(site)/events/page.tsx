import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/ui/PlaceholderPage';

export const metadata: Metadata = { title: 'Events' };

export default function EventsPage() {
  return <PlaceholderPage title="Events" note="This page is in the navigation but no reference screenshot was supplied. It will be built once a reference is shared." />;
}
