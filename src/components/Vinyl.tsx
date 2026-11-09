'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Visualizer from './Visualizer';
import { usePlayer, type Track } from './PlayerProvider';

gsap.registerPlugin(useGSAP);

const REV_SECONDS = 1.8; // 33⅓ rpm

/** Sleeve and record. The record slides out on hover (or in view on touch) and plays on click. */
export default function Vinyl({ release, cover, size = 340, priority = false }: {
  release: Track; cover: string; size?: number; priority?: boolean;
}) {
  const { track, status, toggle } = usePlayer();
  const root = useRef<HTMLDivElement>(null);
  const platter = useRef<HTMLSpanElement>(null);
  const spin = useRef<gsap.core.Tween | null>(null);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);

  const isCurrent = track?.slug === release.slug;
  const isPlaying = isCurrent && status === 'playing';
  const isLoading = isCurrent && status === 'loading';
  const previewing = hovered || inView;
  const spinning = previewing || isPlaying;

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    spin.current = gsap.to(platter.current, { rotation: 360, duration: REV_SECONDS, ease: 'none', repeat: -1, paused: true }).timeScale(0);
  }, { scope: root });

  // Motor up / inertial stop: only the tween's speed changes, so the angle never jumps.
  useEffect(() => {
    const t = spin.current;
    if (!t) return;
    if (spinning) {
      t.play();
      gsap.to(t, { timeScale: 1, duration: 0.9, ease: 'power2.out', overwrite: true });
    } else {
      gsap.to(t, { timeScale: 0, duration: 1.8, ease: 'power2.out', overwrite: true, onComplete: () => { t.pause(); } });
    }
  }, [spinning]);

  // Touch screens have no hover: the record comes out while it is on screen.
  useEffect(() => {
    const el = root.current;
    if (!el || !window.matchMedia('(hover: none)').matches) return;
    const io = new IntersectionObserver(([e]) => setInView(e.intersectionRatio > 0.6), { threshold: [0, 0.6, 1] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const px = Math.round(size * 0.4);
  return (
    <div className="vinyl-box">
      <div
        ref={root}
        className="vinyl"
        style={{ ['--vinyl' as string]: `${size}px` }}
        data-out={previewing || isCurrent ? '' : undefined}
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') setHovered(true); }}
        onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHovered(false); }}
      >
        <span className="vinyl__disc" aria-hidden="true">
          {isCurrent && <Visualizer className="vinyl__halo" shape="arc" bars={64} seed={release.title.length} />}
          <span ref={platter} className="vinyl__platter">
            <span className="vinyl__label"><Image src={cover} alt="" width={px} height={px} /></span>
          </span>
          <span className="vinyl__sheen" />
        </span>
        <span className="vinyl__sleeve">
          <Image src={cover} alt={`${release.title} artwork`} width={size} height={size} priority={priority} sizes={`${size}px`} />
        </span>
        <button
          type="button"
          className="vinyl__hit"
          aria-pressed={isPlaying}
          aria-label={`${isPlaying ? 'Pause' : 'Play'} ${release.title}`}
          onClick={() => toggle(release)}
          onFocus={(e) => { if (e.currentTarget.matches(':focus-visible')) setHovered(true); }}
          onBlur={() => setHovered(false)}
        >
          <span className="vinyl__play" data-loading={isLoading ? '' : undefined}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {isPlaying ? <path d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z" /> : <path d="M8 5.2v13.6a.6.6 0 0 0 .92.5l10.4-6.8a.6.6 0 0 0 0-1L8.92 4.7A.6.6 0 0 0 8 5.2Z" />}
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
