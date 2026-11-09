'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

/** Marks the record as playing while it is on screen on touch devices (no hover there). */
export default function VinylSpin({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: none)').matches) return;
    const io = new IntersectionObserver(([e]) => el.toggleAttribute('data-playing', e.intersectionRatio > 0.6), { threshold: [0, 0.6, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <span ref={ref} className={className} style={style}>{children}</span>;
}
