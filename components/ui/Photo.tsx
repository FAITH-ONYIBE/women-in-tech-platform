import Image from 'next/image';
import { Users } from 'lucide-react';

type Props = {
  src?: string;
  alt: string;
  className?: string;
  /** Short note shown on the placeholder so it is clear which asset belongs here. */
  hint?: string;
  tone?: 'warm' | 'navy' | 'blue';
  sizes?: string;
};

const tones = {
  warm: 'from-[#DDD0F7] via-[#A98BE0] to-[#6D28D9]',
  navy: 'from-[#2B3566] via-[#1A2150] to-[#0A1033]',
  blue: 'from-[#BFE3F5] via-[#7FBFE0] to-[#3E86B5]',
};

/**
 * Renders a real photo when `src` is provided (drop files in /public/images),
 * otherwise a neutral branded placeholder. No third-party photos are bundled.
 */
export function Photo({ src, alt, className = '', hint, tone = 'warm', sizes = '(min-width: 1168px) 1168px, 100vw' }: Props) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${tones[tone]} ${className}`}
    >
      <Users className="h-1/4 w-1/4 max-h-24 max-w-24 text-white/70" strokeWidth={1.25} aria-hidden />
      {hint && <span className="absolute bottom-3 left-4 text-xs font-medium text-white/80">{hint}</span>}
    </div>
  );
}
