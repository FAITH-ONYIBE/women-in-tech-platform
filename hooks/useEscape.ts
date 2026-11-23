'use client';
import { useEffect } from 'react';

export function useEscape(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onEscape();
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, [active, onEscape]);
}
