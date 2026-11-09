'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

/** Page transition: a champagne "fader" sweeps up, then the page fades in. */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.timeline()
      .fromTo('.fader', { scaleY: 1, transformOrigin: 'top' }, { scaleY: 0, duration: 0.7, ease: 'expo.inOut' })
      .from('.page-body', { autoAlpha: 0, y: 24, duration: 0.8, ease: 'expo.out' }, '-=0.35');
  }, { scope: ref });
  return (
    <div ref={ref}>
      <div className="fader" aria-hidden="true" />
      <div className="page-body">{children}</div>
    </div>
  );
}
