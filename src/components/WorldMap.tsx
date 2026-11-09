'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Tour map: routes draw themselves from Madrid and Bangkok, then the cities light up. */
export default function WorldMap({ svg }: { svg: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const routes = root.querySelectorAll<SVGPathElement>('.route');
    routes.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });
    const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 75%', once: true } });
    tl.from(root.querySelectorAll('.land path'), { autoAlpha: 0, duration: 1.2, stagger: { amount: 0.6, from: 'random' } })
      .to(routes, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: 0.08 }, '-=0.6')
      .from(root.querySelectorAll('.city'), { autoAlpha: 0, scale: 0, transformOrigin: 'center', duration: 0.6, ease: 'back.out(3)', stagger: 0.05 }, '-=1.2');
  }, { scope: ref });
  return <div ref={ref} className="map" dangerouslySetInnerHTML={{ __html: svg }} />;
}
