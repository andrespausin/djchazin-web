'use client';

import { useEffect, useMemo, useState } from 'react';
import focusData from '@/assets/world-map.focus.json';
import TourMap from './TourMap';
import { Reveal } from './Motion';
import { countries } from '@/data/site';

const frames = focusData.countries as Record<string, number[]>;

/** World-tour map with a selectable country list. */
export default function CountryExplorer({ svg }: { svg: string }) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelected(null); };
    // Any click outside the country rows goes back to the world view.
    const onClick = (e: MouseEvent) => { if (!(e.target as Element).closest('.country')) setSelected(null); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick); };
  }, [selected]);

  const focus = useMemo(() => ({ bounds: selected ? frames[selected] : null, country: selected }), [selected]);

  return (
    <div className="tour">
      <div className="tour__map">
        <TourMap svg={svg} focus={focus} entrance />
        <button type="button" className="venue__close tour__close" data-show={selected ? '' : undefined} aria-label="Back to world map" tabIndex={selected ? 0 : -1} onClick={() => setSelected(null)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
      </button>
      </div>
      <div className="tour__side">
      <Reveal className="countries" stagger={0.05}>
        {countries.map((c) => (
          <button
            key={c.name}
            type="button"
            className="country"
            data-reveal
            aria-pressed={selected === c.flag}
            onClick={() => setSelected((s) => (s === c.flag ? null : c.flag))}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/flags/${c.flag}.svg`} alt="" width={22} height={22} loading="lazy" />
            <span className="country__text"><span className="country__name">{c.name}</span><span className="country__cities">{c.cities}</span></span>
          </button>
        ))}
      </Reveal>
      </div>
    </div>
  );
}
