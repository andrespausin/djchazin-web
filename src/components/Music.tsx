import Image from 'next/image';
import { icons } from '@/data/icons';

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
