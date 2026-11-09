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
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selected]);

  const focus = useMemo(() => ({ bounds: selected ? frames[selected] : null, country: selected }), [selected]);

  return (
    <div className="tour">
      <div className="tour__map"><TourMap svg={svg} focus={focus} entrance /></div>
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
  );
}
