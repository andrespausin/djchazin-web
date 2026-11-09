'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WORLD = [0, 0, 1200, 540];

export type MapFocus = { bounds: readonly number[] | null; country?: string | null; venue?: string | null };

/** Inline-SVG world map with a camera: `focus` frames a region and lights up a country or venue. */
export default function TourMap({ svg, focus, entrance = false, className = '' }: {
  svg: string; focus: MapFocus; entrance?: boolean; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const camera = useRef({ x: 0, y: 0, w: 1200, h: 540 });

  // Routes draw themselves from Madrid and Bangkok, then the cities light up.
  useGSAP(() => {
    const root = ref.current;
    if (!root || !entrance || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const routes = root.querySelectorAll<SVGPathElement>('.route');
    routes.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });
    const tl = gsap.timeline({ scrollTrigger: { trigger: root, start: 'top 75%', once: true } });
    tl.from(root.querySelectorAll('.land path'), { autoAlpha: 0, duration: 1.2, stagger: { amount: 0.6, from: 'random' } })
      .to(routes, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: 0.08 }, '-=0.6')
      .from(root.querySelectorAll('.city__in'), { autoAlpha: 0, scale: 0, svgOrigin: '0 0', duration: 0.6, ease: 'back.out(3)', stagger: 0.05 }, '-=1.2');
  }, { scope: ref });

  const { bounds, country, venue } = focus;

  useEffect(() => {
    const root = ref.current;
    const map = root?.querySelector('svg');
    if (!root || !map) return;
    const focused = !!bounds;
    root.toggleAttribute('data-focused', focused);
    map.querySelectorAll('.land path[data-country]').forEach((p) => p.classList.toggle('is-active', p.getAttribute('data-country') === country));
    map.querySelectorAll('.city').forEach((c) => c.classList.toggle('is-dim', focused && c.getAttribute('data-country') !== country));
    map.querySelectorAll('.pin').forEach((p) => p.classList.toggle('is-active', p.getAttribute('data-venue') === venue));

    const cam = camera.current;
    // Lines and markers keep their on-screen size at any zoom and any map width.
    const apply = () => {
      const zoom = 1200 / cam.w;
      const fit = Math.max(1, 1200 / (root.clientWidth || 1200));
      map.setAttribute('viewBox', `${cam.x.toFixed(2)} ${cam.y.toFixed(2)} ${cam.w.toFixed(2)} ${cam.h.toFixed(2)}`);
      map.style.setProperty('--zoom', zoom.toFixed(4));
      map.style.setProperty('--marker', (fit / zoom).toFixed(4));
      root.toggleAttribute('data-compact', root.clientWidth < 620);
    };
    const [x, y, w, h] = bounds ?? WORLD;
    const ro = new ResizeObserver(apply);
    ro.observe(root);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      Object.assign(cam, { x, y, w, h });
      apply();
    } else {
      gsap.to(cam, { x, y, w, h, duration: 1.1, ease: 'power3.inOut', overwrite: true, onUpdate: apply, onComplete: apply });
    }
    return () => ro.disconnect();
  }, [bounds, country, venue]);

  return <div ref={ref} className={`map ${className}`} dangerouslySetInnerHTML={{ __html: svg }} />;
}
