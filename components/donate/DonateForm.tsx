'use client';
import { ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { presetAmounts } from '@/lib/mock-data/donate';

type Frequency = 'one-time' | 'monthly';

export function DonateForm() {
  const online = useOnlineStatus();
  const [frequency, setFrequency] = useState<Frequency>('monthly');
  const [preset, setPreset] = useState<number | null>(null);
  const [other, setOther] = useState('');
  const [note, setNote] = useState(false);
  const [honor, setHonor] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const amount = preset ?? (other ? Number(other) : 0);
  const valid = Number.isFinite(amount) && amount >= 1;

  function submit() {
    if (!valid) return;
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address or leave it empty.');
      return;
    }
    setError('');
    setDone(true);
  }

  const seg = (active: boolean) =>
    `h-10 flex-1 rounded-lg text-[15px] font-medium transition-colors ${
      active ? 'border border-brand-red/40 bg-[#E6DAFB] text-brand-ink shadow-sm' : 'text-brand-ink hover:bg-white/60'
    }`;

  return (
    <div className="rounded-3xl border border-brand-line bg-white p-7 shadow-sm">
      <p className="flex items-center justify-center gap-2 text-[17px] font-medium text-brand-ink">
        <ShieldCheck size={18} className="text-emerald-600" aria-hidden /> Choose amount
      </p>

      <div className="mt-5 flex gap-1 rounded-xl bg-brand-mist p-1" role="group" aria-label="Frequency">
        <button type="button" className={seg(frequency === 'one-time')} aria-pressed={frequency === 'one-time'} onClick={() => setFrequency('one-time')}>
          One-time
        </button>
        <button type="button" className={seg(frequency === 'monthly')} aria-pressed={frequency === 'monthly'} onClick={() => setFrequency('monthly')}>
          Monthly
        </button>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3" role="group" aria-label="Amount">
        {presetAmounts.map((a) => (
          <button
            key={a}
            type="button"
            aria-pressed={preset === a}
            onClick={() => {
              setPreset(a);
              setOther('');
            }}
            className={`h-[50px] rounded-lg text-[15px] font-semibold transition-colors ${
              preset === a ? 'bg-brand-red text-white' : 'bg-brand-mist text-brand-ink hover:bg-[#EEF0F4]'
            }`}
          >
            ${a}
          </button>
        ))}
      </div>

      <label className="mt-3 flex h-12 items-center gap-2 rounded-lg bg-brand-mist px-4 text-brand-ink focus-within:outline focus-within:outline-2 focus-within:outline-brand-red">
        <span aria-hidden>$</span>
        <input
          inputMode="decimal"
          value={other}
          onChange={(e) => {
            setOther(e.target.value.replace(/[^\d.]/g, ''));
            setPreset(null);
          }}
          placeholder="Other"
          aria-label="Other amount in US dollars"
          className="flex-1 bg-transparent text-base font-medium outline-none placeholder:text-brand-ink"
        />
        <span className="text-sm">USD</span>
      </label>

      <div className="mt-5 space-y-2 text-[15px] text-brand-ink">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={note} onChange={(e) => setNote(e.target.checked)} className="h-4 w-4 accent-brand-red" /> Add note/comment
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={honor} onChange={(e) => setHonor(e.target.checked)} className="h-4 w-4 accent-brand-red" /> Give in honor/memory
        </label>
        {note && <textarea aria-label="Note" rows={2} className="w-full rounded-lg border border-brand-line p-3 text-sm" placeholder="Your note" />}
        {honor && <input aria-label="In honor of" className="h-10 w-full rounded-lg border border-brand-line px-3 text-sm" placeholder="In honor or memory of" />}
      </div>

      <label className="mt-5 block text-[15px] font-medium text-brand-ink">
        Email address <span className="font-normal text-brand-muted">(optional)</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error}
          className="mt-2 h-12 w-full rounded-lg border border-brand-line px-3 text-base outline-none focus:border-brand-red"
        />
      </label>
      {error && <p role="alert" className="mt-2 text-sm text-brand-red">{error}</p>}

      <button
        type="button"
        onClick={submit}
        disabled={!valid || !online}
        className="mt-6 h-[50px] w-full rounded-lg bg-brand-red text-base font-semibold text-white transition-colors hover:bg-brand-red-dark disabled:cursor-not-allowed disabled:bg-[#B7A0E8]"
      >
        Continue
      </button>
      {!online && <p className="mt-3 text-center text-sm text-brand-muted">Donating needs an internet connection. Reconnect to continue.</p>}

      <Modal open={done} onClose={() => setDone(false)} title="Demo only">
        <p>
          You chose <strong>${amount}</strong> ({frequency === 'monthly' ? 'monthly' : 'one-time'}). Payments are not connected in this
          phase, so nothing was charged.
        </p>
        <button onClick={() => setDone(false)} className="mt-5 h-9 rounded-md border border-brand-line px-4 text-sm font-medium hover:bg-brand-mist">
          Close
        </button>
      </Modal>
    </div>
  );
}
