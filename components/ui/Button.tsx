import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'outline-red' | 'white' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center whitespace-nowrap font-semibold transition-colors disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary: 'bg-brand-red text-white hover:bg-brand-red-dark disabled:bg-brand-red/40',
  outline: 'border border-brand-ink/70 bg-white text-brand-ink hover:bg-brand-mist',
  'outline-red': 'border border-brand-red bg-white text-brand-red hover:bg-brand-red hover:text-white',
  white: 'bg-white text-brand-crimson hover:bg-brand-blush',
  ghost: 'text-brand-ink hover:bg-brand-mist',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 rounded-md px-4 text-sm font-medium',
  md: 'h-9 rounded-md border border-brand-line bg-white px-3 text-sm font-medium text-brand-ink hover:bg-brand-mist',
  lg: 'h-[50px] rounded-full px-6 text-base',
};

type Props = {
  variant?: Variant;
  size?: Size;
  href?: string;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export function Button({ variant = 'primary', size = 'lg', href, className = '', children, ...rest }: Props) {
  // `md` is the small bordered "Enroll" style, which carries its own colours.
  const cls = `${base} ${size === 'md' ? '' : variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
