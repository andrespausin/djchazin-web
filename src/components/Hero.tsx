'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SocialIcon, Arrow } from './Music';
import { links } from '@/data/site';

gsap.registerPlugin(useGSAP);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .from('.hero__figure', { clipPath: 'inset(0 0 100% 0)', duration: 1.8, ease: 'expo.inOut' })
      .from('.hero__logo', { clipPath: 'inset(0 100% 0 0)', duration: 1.3, ease: 'expo.inOut' }, 0.7)
      .from('.hero__line > *', { y: 22, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 1.3);

    // A faint champagne light follows the cursor; nothing else moves once the entrance is over.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const light = root.querySelector<HTMLElement>('.hero__light');
    if (!light) return;
    const x = gsap.quickTo(light, 'x', { duration: 1.2, ease: 'power3' });
    const y = gsap.quickTo(light, 'y', { duration: 1.2, ease: 'power3' });
    const move = (e: PointerEvent) => {
      const b = root.getBoundingClientRect();
      x(e.clientX - b.left); y(e.clientY - b.top);
      gsap.to(light, { opacity: 1, duration: 0.8, overwrite: 'auto' });
    };
    const leave = () => gsap.to(light, { opacity: 0, duration: 1, overwrite: 'auto' });
    root.addEventListener('pointermove', move);
    root.addEventListener('pointerleave', leave);
    return () => { root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave); };
  }, { scope: ref });

  return (
    <section ref={ref} className="hero">
      <div className="hero__figure">
        <Image src="/images/photos/cover.webp" alt="Chazin, studio portrait" fill priority sizes="(max-width: 900px) 100vw, 90vh" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
      </div>
      <div className="hero__light" aria-hidden="true" />
      <div className="hero__copy">
        <h1 className="hero__logo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/chazin-logo-white.svg" alt="CHAZIN" width={1200} height={346} />
        </h1>
        <p className="hero__line"><span>Latin Tech House</span><span>Spain × Venezuela</span><span>Based in Bangkok</span></p>
        <div className="btn-row hero__line">
          <a className="btn btn--gold" href={links.spotify} target="_blank" rel="noreferrer"><SocialIcon name="spotify" size={18} /> Listen on Spotify</a>
          <Link className="btn" href="/booking">Book Chazin <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
