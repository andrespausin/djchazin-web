import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { Reveal } from '@/components/Motion';
import { Marquee } from '@/components/Music';
import { alsoPlayed, clubs, flyers } from '@/data/site';

export const metadata: Metadata = {
  title: 'Shows',
  description: 'Clubs and festivals where Chazin has played — from Pacha Ibiza to Illuzion Phuket — and selected show flyers.',
};

export default function Shows() {
  return (
    <>
      <PageHeader index="03" eyebrow="Shows" title={'Played at.'} intro="Clubs, festivals and pool parties across Europe, Asia and the Americas." />

      <section className="section">
        <Reveal className="logos" stagger={0.05}>
          {clubs.map((c) => (
            <div key={c.name} className="logos__cell" data-reveal>
              <Image src={c.logo} alt={c.name} width={200} height={110} />
            </div>
          ))}
        </Reveal>
        <p className="also">Also: {alsoPlayed} — and many more.</p>
      </section>

      <section className="section section--tight">
        <Marquee items={clubs} reverse speed={55} />
      </section>

      <section className="section">
        <p className="eyebrow">Past shows</p>
        <h2 className="display h2">Selected flyers.</h2>
        <Reveal className="flyers" stagger={0.1}>
          {flyers.map((f) => (
            <figure key={f.src} className="flyer" data-reveal>
              <span className="flyer__img"><Image src={f.src} alt={`${f.title} flyer`} width={f.w} height={f.h} sizes="(max-width: 700px) 100vw, 33vw" /></span>
              <figcaption><strong>{f.title}</strong><span>{f.place}</span></figcaption>
            </figure>
          ))}
        </Reveal>
      </section>
    </>
  );
}
