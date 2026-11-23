'use client';
import { Download, WifiOff } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { sendQueuedAction } from '@/lib/api/client';
import { flushOutbox, OUTBOX_EVENT, pendingActions } from '@/lib/offline/outbox';

type InstallEvent = Event & { prompt: () => Promise<void> };

export function PwaProvider() {
  const online = useOnlineStatus();
  const [pending, setPending] = useState(0);
  const [syncedNote, setSyncedNote] = useState('');
  const [installEvt, setInstallEvt] = useState<InstallEvent | null>(null);

  const refresh = useCallback(() => {
    pendingActions().then((a) => setPending(a.length)).catch(() => setPending(0));
  }, []);

  // Register the service worker (production only, so dev HMR is unaffected).
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener(OUTBOX_EVENT, refresh);
    const onInstall = (e: Event) => {
      e.preventDefault();
      setInstallEvt(e as InstallEvent);
    };
    window.addEventListener('beforeinstallprompt', onInstall);
    return () => {
      window.removeEventListener(OUTBOX_EVENT, refresh);
      window.removeEventListener('beforeinstallprompt', onInstall);
    };
  }, [refresh]);

  // Sync queued actions when connectivity returns.
  useEffect(() => {
    if (!online) return;
    flushOutbox(sendQueuedAction)
      .then((n) => {
        if (n > 0) {
          setSyncedNote(`${n} saved ${n === 1 ? 'action was' : 'actions were'} synced.`);
          setTimeout(() => setSyncedNote(''), 4000);
        }
      })
      .catch(() => {});
  }, [online]);

  return (
    <>
      {!online && (
        <div role="status" className="fixed inset-x-0 bottom-0 z-[80] flex items-center justify-center gap-2 bg-brand-navy px-4 py-2.5 text-sm text-white">
          <WifiOff size={16} aria-hidden />
          You’re offline. Saved pages still work{pending > 0 ? ` · ${pending} waiting to sync` : ''}.
        </div>
      )}
      {syncedNote && (
        <div role="status" className="fixed inset-x-0 bottom-0 z-[80] bg-emerald-700 px-4 py-2.5 text-center text-sm text-white">
          {syncedNote}
        </div>
      )}
      {installEvt && online && (
        <button
          onClick={async () => {
            await installEvt.prompt();
            setInstallEvt(null);
          }}
          className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-4 py-2.5 text-sm font-medium shadow-lg hover:bg-brand-mist"
        >
          <Download size={16} aria-hidden /> Install app
        </button>
      )}
    </>
  );
}
