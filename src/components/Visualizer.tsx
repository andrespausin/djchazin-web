'use client';

import { useEffect, useRef } from 'react';
import { createSimulatedSource } from '@/lib/audioLevels';
import { usePlayer } from './PlayerProvider';

type Props = {
  bars?: number;
  className?: string;
  /** 'mirror' grows bars from a centre line, 'arc' radiates them around a record */
  shape?: 'mirror' | 'arc';
  /** Varies the pattern per track */
  seed?: number;
};

const ARC = (78 * Math.PI) / 180; // the part of the record that sticks out of the sleeve
const DISC_RATIO = 1 / 1.32;      // disc diameter relative to the canvas

/** Draws only while audio is really playing; settles to nothing on pause. Static under reduced motion. */
export default function Visualizer({ bars = 48, className, shape = 'mirror', seed = 0 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { status, getSeconds } = usePlayer();
  const active = status === 'playing';
  const levels = useRef(new Float32Array(bars));

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const source = createSimulatedSource(bars, seed);
    const target = new Float32Array(bars);
    const current = levels.current;
    let raf = 0, w = 0, h = 0, visible = true;

    const resize = () => {
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = ctx.strokeStyle = '#c2a878';
      if (shape === 'arc') {
        const cx = w / 2, cy = h / 2, r = (w / 2) * DISC_RATIO + 5, reach = w / 2 - r - 2;
        ctx.lineCap = 'round'; ctx.lineWidth = Math.max(1.5, w / 200);
        for (let i = 0; i < bars; i++) {
          const a = -ARC + (i / (bars - 1)) * ARC * 2;
          const len = Math.max(0.5, current[i] * reach);
          ctx.globalAlpha = 0.35 + current[i] * 0.65;
          ctx.beginPath();
          ctx.moveTo(cx + r * Math.cos(a), cy + r * Math.sin(a));
          ctx.lineTo(cx + (r + len) * Math.cos(a), cy + (r + len) * Math.sin(a));
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      } else {
        const gap = 2, bw = (w - gap * (bars - 1)) / bars;
        for (let i = 0; i < bars; i++) {
          const bh = Math.max(2, current[i] * h);
          ctx.fillRect(i * (bw + gap), (h - bh) / 2, bw, bh);
        }
      }
    };

    const loop = () => {
      if (active) source(getSeconds(), target); else target.fill(0);
      let energy = 0;
      for (let i = 0; i < bars; i++) {
        current[i] += (target[i] - current[i]) * (target[i] > current[i] ? 0.55 : 0.12); // fast attack, slow release
        energy += current[i];
      }
      draw();
      if (!active && energy < 0.02) { ctx.clearRect(0, 0, w, h); return; }
      if (visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const start = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); };

    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); });
    io.observe(canvas);
    const onVis = () => { if (!document.hidden && visible) start(); };
    document.addEventListener('visibilitychange', onVis);
    start();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
  }, [active, bars, seed, shape, getSeconds]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
