'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

type Mode = 'login' | 'join';
type Errors = Partial<Record<'name' | 'email' | 'password', string>>;

export function AuthForm({ mode }: { mode: Mode }) {
  const online = useOnlineStatus();
  const [v, setV] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const join = mode === 'join';

  function validate(): Errors {
    const e: Errors = {};
    if (join && v.name.trim().length < 2) e.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter a valid email address.';
    if (v.password.length < 8) e.password = 'Use at least 8 characters.';
    return e;
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0 && online) setDone(true);
  }

  const field = (id: keyof typeof v, label: string, type = 'text', auto?: string) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-brand-ink">{label}</label>
      <input
        id={id}
        type={type}
        autoComplete={auto}
        value={v[id]}
        onChange={(e) => setV({ ...v, [id]: e.target.value })}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `${id}-err` : undefined}
        className="mt-1.5 h-11 w-full rounded-lg border border-brand-line px-3 text-base outline-none focus:border-brand-red"
      />
      {errors[id] && <p id={`${id}-err`} className="mt-1 text-sm text-brand-red">{errors[id]}</p>}
    </div>
  );

  if (done) {
    return (
      <div className="rounded-2xl border border-brand-line bg-white p-8">
        <h1 className="text-2xl">Demo only</h1>
        <p className="mt-3 text-brand-muted">Your details are valid, but no backend is connected in this phase, so no account was created.</p>
        <Button href="/" className="mt-6" size="sm">Back to home</Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-2xl border border-brand-line bg-white p-8">
      <h1 className="text-2xl">{join ? 'Join africanqueen' : 'Log in'}</h1>
      {join && field('name', 'Full name', 'text', 'name')}
      {field('email', 'Email', 'email', 'email')}
      {field('password', 'Password', 'password', join ? 'new-password' : 'current-password')}
      <Button type="submit" className="w-full" disabled={!online}>{join ? 'Join free' : 'Log in'}</Button>
      {!online && <p className="text-center text-sm text-brand-muted">{join ? 'Registration' : 'Logging in'} needs an internet connection.</p>}
      <p className="text-center text-sm text-brand-muted">
        {join ? 'Already a member? ' : 'New here? '}
        <Link href={join ? '/login' : '/join'} className="font-medium text-brand-red hover:underline">{join ? 'Log in' : 'Join free'}</Link>
      </p>
    </form>
  );
}
