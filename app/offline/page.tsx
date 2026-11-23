import { WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata = { title: 'Offline' };

export default function OfflinePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-blush px-6 text-center">
      <WifiOff size={36} className="text-brand-red" aria-hidden />
      <h1 className="mt-5 text-2xl">You’re offline</h1>
      <p className="mt-3 max-w-sm text-brand-muted">This page hasn’t been saved on your device yet. Pages you have already visited still open without a connection.</p>
      <Button href="/" className="mt-7">Go to home</Button>
    </main>
  );
}
