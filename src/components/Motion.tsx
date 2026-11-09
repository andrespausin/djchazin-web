'use client';

import { useRef, type ReactNode, type ElementType } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Fades/lifts every descendant marked [data-reveal] as it enters the viewport, staggered. */
export function Reveal({ children, className, as: Tag = 'div', stagger = 0.08 }: {
  children: ReactNode; className?: string; as?: ElementType; stagger?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reduced() || !ref.current) return;
    const items = ref.current.querySelectorAll('[data-reveal]');
    const targets = items.length ? items : [ref.current];
    gsap.from(targets, {
      y: 48, autoAlpha: 0, duration: 1.1, ease: 'expo.out', stagger,
      scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
    });
  }, { scope: ref });
  return <Tag ref={ref} className={className}>{children}</Tag>;
}

/** Big title whose words rise from behind a mask, like a drop landing. */
export function SplitTitle({ text, className, as: Tag = 'h1', delay = 0, onScroll = false }: {
  text: string; className?: string; as?: ElementType; delay?: number; onScroll?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reduced() || !ref.current) return;
    gsap.from(ref.current.querySelectorAll('.w > span'), {
      yPercent: 115, rotate: 4, duration: 1.2, ease: 'expo.out', stagger: 0.06, delay,
      scrollTrigger: onScroll ? { trigger: ref.current, start: 'top 85%', once: true } : undefined,
    });
  }, { scope: ref });
  const lines = text.split('\n');
  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, li) => (
        <span key={li} className="line" aria-hidden="true">
          {line.split(' ').map((word, wi) => (
            <span key={wi} className="w"><span>{word}</span></span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

/** Counts up to the value when scrolled into view. */
export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useGSAP(() => {
    if (!ref.current) return;
    if (reduced()) { ref.current.textContent = `${value}${suffix}`; return; }
    const o = { v: 0 };
    gsap.to(o, {
      v: value, duration: 2.2, ease: 'power3.out',
      onUpdate: () => { if (ref.current) ref.current.textContent = `${Math.round(o.v)}${suffix}`; },
      scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
    });
  }, { scope: ref });
  return <span ref={ref}>{value}{suffix}</span>;
}

/** Scroll-linked parallax for a background layer. */
export function Parallax({ children, className, amount = 14 }: { children: ReactNode; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (reduced() || !ref.current) return;
    gsap.fromTo(ref.current, { yPercent: 0, scale: 1.08 }, {
      yPercent: amount, scale: 1.16, ease: 'none',
      scrollTrigger: { trigger: ref.current.parentElement, start: 'top top', end: 'bottom top', scrub: true },
    });
  }, { scope: ref });
  return <div ref={ref} className={className}>{children}</div>;
}
