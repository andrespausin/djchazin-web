'use client';

import { useEffect, useRef } from 'react';
import { BPM } from '@/data/site';

type Props = {
  bars?: number;
  className?: string;
  /** 'up' grows bars from the bottom, 'mirror' grows them from the centre line */
  mode?: 'up' | 'mirror';
};

/**
 * Procedural spectrum analyser synced to the artist's tempo (no audio is loaded).
 * Bass bands sit in the centre and kick on every beat; highs shimmer on the sides.
 * Pauses itself when offscreen or when the tab is hidden; static under reduced motion.
 */
export default function Visualizer({ bars = 72, className, mode = 'up' }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, visible = true;
    let grad: CanvasGradient | null = null;

    const seeds = Array.from({ length: bars }, (_, i) => ({
      f: 0.8 + ((i * 7919) % 97) / 40,
      p: ((i * 104729) % 360) * (Math.PI / 180),
      center: 1 - Math.abs((i / (bars - 1)) * 2 - 1), // 1 in the middle, 0 at the edges
    }));
    const levels = new Float32Array(bars);
    const beat = 60 / BPM;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      grad = ctx.createLinearGradient(0, h, 0, 0);
      grad.addColorStop(0, 'rgba(194,168,120,0.95)');
      grad.addColorStop(0.6, 'rgba(242,236,224,0.55)');
      grad.addColorStop(1, 'rgba(242,242,242,0.08)');
    };

    const frame = (ms: number) => {
      const t = ms / 1000;
      const phase = (t % beat) / beat;
      const kick = Math.exp(-phase * 7);
      const bar = Math.floor(t / beat) % 4; // accent on the 1
      const accent = bar === 0 ? 1.15 : 1;
      ctx.clearRect(0, 0, w, h);
      if (!grad) return;
      ctx.fillStyle = grad;
      const gap = Math.max(2, w / bars / 4);
      const bw = (w - gap * (bars - 1)) / bars;
      for (let i = 0; i < bars; i++) {
        const s = seeds[i];
        const shimmer = 0.5 + 0.5 * Math.sin(t * s.f * 2.2 + s.p);
        const groove = 0.5 + 0.5 * Math.sin(t * 1.3 + i * 0.35);
        const target = Math.min(1, (0.12 + 0.45 * shimmer * groove + kick * s.center * s.center * 0.75) * accent);
        levels[i] += (target - levels[i]) * (target > levels[i] ? 0.55 : 0.12); // fast attack, slow release
        const bh = Math.max(2, levels[i] * h);
        const x = i * (bw + gap);
        if (mode === 'mirror') ctx.fillRect(x, (h - bh) / 2, bw, bh);
        else ctx.fillRect(x, h - bh, bw, bh);
      }
    };

    const loop = (ms: number) => {
      frame(ms);
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (reduce) frame(1200);
      else raf = requestAnimationFrame(loop);
    };

    resize();
    const ro = new ResizeObserver(() => { resize(); if (reduce) frame(1200); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start(); else cancelAnimationFrame(raf);
    });
    io.observe(canvas);
    const onVis = () => { if (!document.hidden && visible) start(); };
    document.addEventListener('visibilitychange', onVis);
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [bars, mode]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
