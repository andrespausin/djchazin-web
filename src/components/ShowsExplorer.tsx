'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import focusData from '@/assets/world-map.focus.json';
import TourMap from './TourMap';
import { Reveal } from './Motion';
import { clubs, venueSites } from '@/data/site';

const frames = focusData.venues as Record<string, number[]>;

/** Logo grid; venues with a known location open a map beside it. */
export default function ShowsExplorer({ svg }: { svg: string }) {
  const [selected, setSelected] = useState<string | null>(null);
  // Keeps the map on the last venue while the panel closes.
  const [last, setLast] = useState<string | null>(null);

  const pick = (slug: string) => {
    setLast(slug);
    setSelected((s) => (s === slug ? null : slug));
  };

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selected]);

  const shown = selected ?? last;
  const sites = shown ? venueSites[shown] ?? [] : [];
  const name = clubs.find((c) => c.slug === shown)?.name;
  const focus = useMemo(() => ({
    bounds: shown ? frames[shown] : null,
    venue: shown,
    country: shown ? venueSites[shown]?.[0]?.code : null,
  }), [shown]);

  return (
    <div className="shows" data-open={selected ? '' : undefined}>
      <Reveal className="logos" stagger={0.05}>
        {clubs.map((c) => {
          const logo = <Image src={c.logo} alt={c.name} width={200} height={110} />;
          return venueSites[c.slug] ? (
            <button key={c.slug} type="button" className="logos__cell logos__cell--btn" data-reveal aria-pressed={selected === c.slug} onClick={() => pick(c.slug)}>{logo}</button>
          ) : (
            <div key={c.slug} className="logos__cell" data-reveal>{logo}</div>
          );
        })}
      </Reveal>
      <aside className="venue" aria-label="Venue location" inert={!selected}>
        <div className="venue__inner">
          <TourMap svg={svg} focus={focus} className="map--venues" />
          <div className="venue__info" aria-live="polite">
            <div>
              <p className="venue__name">{name}</p>
              <p className="venue__place">{sites.map((s) => `${s.city}, ${s.country}`).join(' · ')}</p>
            </div>
            <button type="button" className="venue__close" aria-label="Close map" onClick={() => setSelected(null)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
