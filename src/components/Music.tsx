import Image from 'next/image';
import { icons } from '@/data/icons';
import VinylSpin from './VinylSpin';

/** Little "on air" equaliser — pure CSS, each bar on its own beat-synced loop. */
export function Equalizer({ bars = 5, className = '' }: { bars?: number; className?: string }) {
  return (
    <span className={`eq ${className}`} aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => <span key={i} style={{ animationDelay: `${-i * 0.17}s` }} />)}
    </span>
  );
}

/** Circular text that rotates around a centre — like a record label. */
export function SpinText({ text, size = 140, children }: { text: string; size?: number; children?: React.ReactNode }) {
  const id = `spin-${text.length}-${size}`;
  return (
    <span className="spin" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="spin__ring">
        <defs><path id={id} d="M50,50 m-41,0 a41,41 0 1,1 82,0 a41,41 0 1,1 -82,0" /></defs>
        <text><textPath href={`#${id}`}>{text}</textPath></text>
      </svg>
      <span className="spin__core">{children}</span>
    </span>
  );
}

/** Deterministic waveform with a playhead sweeping across it (CSS only). */
export function Waveform({ bars = 120, className = '' }: { bars?: number; className?: string }) {
  const heights = Array.from({ length: bars }, (_, i) => {
    const x = i / bars;
    const env = Math.sin(Math.PI * x) * 0.6 + 0.4;
    const n = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    return Math.max(0.08, Math.min(1, env * (0.35 + Math.abs(n) * 0.65)));
  });
  return (
    <div className={`wave ${className}`} aria-hidden="true">
      {heights.map((v, i) => (
        <span key={i} style={{ height: `${(v * 100).toFixed(1)}%`, animationDelay: `${(i / bars) * 8}s` }} />
      ))}
      <i className="wave__head" />
    </div>
  );
}

/** Infinite logo marquee; the list is duplicated so the loop is seamless. */
export function Marquee({ items, reverse = false, speed = 40 }: {
  items: readonly { name: string; logo: string }[]; reverse?: boolean; speed?: number;
}) {
  const row = [...items, ...items];
  return (
    <div className={`marquee${reverse ? ' marquee--rev' : ''}`} style={{ ['--speed' as string]: `${speed}s` }}>
      <div className="marquee__track">
        {row.map((c, i) => (
          <span className="marquee__item" key={i} aria-hidden={i >= items.length}>
            <Image src={c.logo} alt={i < items.length ? c.name : ''} width={180} height={90} />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Record sleeve + vinyl that slides out and spins (on hover, focus, or when in view on touch screens). */
export function Vinyl({ cover, title, size = 300, priority = false }: {
  cover: string; title: string; size?: number; priority?: boolean;
}) {
  return (
    <VinylSpin className="vinyl" style={{ ['--size' as string]: `${size}px` }}>
      <span className="vinyl__disc" aria-hidden="true">
        <span className="vinyl__label">
          <Image src={cover} alt="" width={Math.round(size * 0.4)} height={Math.round(size * 0.4)} />
        </span>
      </span>
      <span className="vinyl__sleeve">
        <Image src={cover} alt={`${title} artwork`} width={size} height={size} priority={priority} sizes={`${size}px`} />
      </span>
    </VinylSpin>
  );
}

export function SocialIcon({ name, size = 22 }: { name: string; size?: number }) {
  const d = icons[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d={d} /></svg>
  );
}

export function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}
