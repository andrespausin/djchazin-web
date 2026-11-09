'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Visualizer from './Visualizer';
import { SpinText, Arrow } from './Music';
import { links, BPM } from '@/data/site';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.from('.hero__photo', { scale: 1.25, autoAlpha: 0, duration: 2.2 })
      .from('.hero__logo', { clipPath: 'inset(0 100% 0 0)', duration: 1.6, ease: 'expo.inOut' }, 0.3)
      .from('.hero__meta > *', { y: 30, autoAlpha: 0, duration: 1, stagger: 0.08 }, 1.1)
      .from('.hero__viz', { scaleY: 0, transformOrigin: 'bottom', duration: 1.4 }, 0.9)
      .from('.hero__badge', { scale: 0, rotate: -90, duration: 1.4, ease: 'back.out(1.6)' }, 1.3);
    // scroll: photo drifts, logo lifts away
    gsap.to('.hero__photo', { yPercent: 12, scale: 1.08, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero__logo', { yPercent: -40, autoAlpha: 0.2, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } });
  }, { scope: ref });

  return (
    <section ref={ref} className="hero">
      <div className="hero__photo">
        <Image src="/images/photos/cover.jpg" alt="Chazin, studio portrait" fill priority sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 20%' }} />
      </div>
      <div className="hero__shade" />
      <Visualizer className="hero__viz" bars={96} />
      <h1 className="hero__logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/chazin-logo-white.svg" alt="CHAZIN" width={1200} height={346} />
      </h1>
      <div className="hero__meta">
        <p className="eyebrow">Latin Tech House</p>
        <p>Spain × Venezuela</p>
        <p>Based in Bangkok</p>
      </div>
      <a className="hero__badge" href={links.spotify} target="_blank" rel="noreferrer" aria-label="Listen on Spotify">
        <SpinText text={`LISTEN ON SPOTIFY · ${BPM} BPM · LATIN TECH HOUSE · `} size={132}>
          <Arrow size={22} />
        </SpinText>
      </a>
      <p className="hero__scroll" aria-hidden="true"><span /> Scroll</p>
    </section>
  );
}
