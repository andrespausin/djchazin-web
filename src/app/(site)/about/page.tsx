import type { Metadata } from 'next';
import Image from 'next/image';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import PageHeader from '@/components/PageHeader';
import { Counter, Reveal, SplitTitle } from '@/components/Motion';
import WorldMap from '@/components/WorldMap';
import { bio, countries, stats } from '@/data/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Spanish-born DJ and producer of Venezuelan descent, based in Bangkok. 300+ shows at Illuzion Phuket and founder of Magna Beat Records.',
};

const mapSvg = readFileSync(path.join(process.cwd(), 'src/assets/world-map.svg'), 'utf8');

export default function About() {
  return (
    <>
      <PageHeader index="01" eyebrow="About" title={'Spanish-born.\nVenezuelan roots.\nBangkok-based.'} />

      <section className="section about">
        <div className="about__photo">
          <Image src="/images/photos/profile.jpg" alt="Chazin portrait" fill sizes="(max-width: 900px) 100vw, 40vw" style={{ objectFit: 'cover', objectPosition: '60% 20%' }} />
        </div>
        <Reveal className="about__text">
          {bio.map((p, i) => <p key={i} data-reveal className={i === 0 ? 'lead' : undefined}>{p}</p>)}
          <blockquote data-reveal className="quote">“Latin grooves move the world.”</blockquote>
        </Reveal>
      </section>

      <section className="section">
        <Reveal className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stat" data-reveal>
              <span className="stat__value"><Counter value={s.value} suffix={s.suffix} /></span>
              <span className="stat__label">{s.label}</span>
              <span className="stat__sub">{s.sub}</span>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="section">
        <p className="eyebrow">World tour</p>
        <SplitTitle as="h2" text={'Three continents.\nOne dancefloor.'} className="display h2" onScroll />
        <WorldMap svg={mapSvg} />
        <Reveal className="countries" stagger={0.05}>
          {countries.map((c) => (
            <div key={c.name} className="country" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/flags/${c.flag}.svg`} alt="" width={22} height={22} loading="lazy" />
              <div><p className="country__name">{c.name}</p><p className="country__cities">{c.cities}</p></div>
            </div>
          ))}
        </Reveal>
      </section>
    </>
  );
}
