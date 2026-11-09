import { BPM } from '@/data/site';

/** Fills `out` (0–1 per band) for a playback time in seconds. */
export type LevelSource = (seconds: number, out: Float32Array) => void;

/**
 * Tempo-driven levels computed from the track position (Spotify does not expose its audio).
 * When the MP3s exist, replace this with a source that reads a Web Audio AnalyserNode;
 * the visualizer only depends on the LevelSource signature.
 */
export function createSimulatedSource(bands: number, seed = 0): LevelSource {
  const beat = 60 / BPM;
  const seeds = Array.from({ length: bands }, (_, i) => ({
    f: 0.8 + (((i + seed) * 7919) % 97) / 40,
    p: (((i + seed) * 104729) % 360) * (Math.PI / 180),
    center: 1 - Math.abs((i / (bands - 1)) * 2 - 1), // 1 in the middle, 0 at the edges
  }));
  return (t, out) => {
    const phase = (t % beat) / beat;
    const kick = Math.exp(-phase * 7);
    const accent = Math.floor(t / beat) % 4 === 0 ? 1.15 : 1; // accent on the 1
    for (let i = 0; i < bands; i++) {
      const s = seeds[i];
      const shimmer = 0.5 + 0.5 * Math.sin(t * s.f * 2.2 + s.p);
      const groove = 0.5 + 0.5 * Math.sin(t * 1.3 + i * 0.35);
      out[i] = Math.min(1, (0.12 + 0.45 * shimmer * groove + kick * s.center * s.center * 0.75) * accent);
    }
  };
}
