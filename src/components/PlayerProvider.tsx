'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import Visualizer from './Visualizer';

export type Track = { slug: string; title: string; spotify: string };
export type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

type Controller = {
  loadUri(uri: string): void; play(): void; pause(): void; togglePlay(): void;
  addListener(ev: 'ready', cb: () => void): void;
  addListener(ev: 'playback_update', cb: (e: { data: { isPaused: boolean; isBuffering: boolean; position: number } }) => void): void;
};
type IFrameApi = { createController(el: HTMLElement, opts: { uri: string; width: string; height: number }, cb: (c: Controller) => void): void };

declare global { interface Window { onSpotifyIframeApiReady?: (api: IFrameApi) => void } }

let apiPromise: Promise<IFrameApi> | null = null;
function loadApi() {
  apiPromise ??= new Promise<IFrameApi>((resolve, reject) => {
    window.onSpotifyIframeApiReady = resolve;
    const s = document.createElement('script');
    s.src = 'https://open.spotify.com/embed/iframe-api/v1';
    s.async = true;
    s.onerror = () => { apiPromise = null; s.remove(); reject(new Error('Spotify player failed to load')); };
    document.body.appendChild(s);
  });
  return apiPromise;
}

const trackUri = (url: string) => `spotify:track:${url.split('/track/')[1]?.split('?')[0]}`;

type PlayerContext = {
  track: Track | null;
  status: PlayerStatus;
  toggle(track: Track): void;
  close(): void;
  getSeconds(): number;
};
const Ctx = createContext<PlayerContext | null>(null);

export function usePlayer() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
}

/** Lives in the site layout, above the per-page template, so playback survives navigation. */
export default function PlayerProvider({ children }: { children: ReactNode }) {
  const [track, setTrack] = useState<Track | null>(null);
  const [status, setStatus] = useState<PlayerStatus>('idle');
  const host = useRef<HTMLDivElement>(null);
  const controller = useRef<Controller | null>(null);
  const clock = useRef({ position: 0, at: 0, running: false });
  const creating = useRef(false);

  const getSeconds = useCallback(() => {
    const c = clock.current;
    return (c.position + (c.running ? performance.now() - c.at : 0)) / 1000;
  }, []);

  const start = useCallback(async (uri: string) => {
    if (controller.current) { controller.current.loadUri(uri); controller.current.play(); return; }
    if (creating.current) return;
    creating.current = true;
    try {
      const api = await loadApi();
      const el = document.createElement('div'); // Spotify replaces this node with its iframe
      host.current?.appendChild(el);
      api.createController(el, { uri, width: '100%', height: 80 }, (c) => {
        controller.current = c;
        c.addListener('ready', () => c.play());
        c.addListener('playback_update', ({ data }) => {
          clock.current = { position: data.position, at: performance.now(), running: !data.isPaused && !data.isBuffering };
          setStatus(data.isPaused ? 'paused' : data.isBuffering ? 'loading' : 'playing');
        });
      });
    } catch {
      setStatus('error');
    } finally {
      creating.current = false;
    }
  }, []);

  const toggle = useCallback((next: Track) => {
    if (track?.slug === next.slug && status !== 'error') { controller.current?.togglePlay(); return; }
    setTrack(next);
    setStatus('loading');
    clock.current = { position: 0, at: 0, running: false };
    void start(trackUri(next.spotify));
  }, [start, status, track]);

  const close = useCallback(() => {
    controller.current?.pause();
    clock.current.running = false;
    setTrack(null);
    setStatus('idle');
  }, []);

  useEffect(() => { document.documentElement.classList.toggle('player-open', !!track); }, [track]);

  const value = useMemo(() => ({ track, status, toggle, close, getSeconds }), [track, status, toggle, close, getSeconds]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <aside className="dock" data-open={track ? '' : undefined} aria-label="Music player" inert={!track}>
        <Visualizer className="dock__viz" bars={40} seed={track?.title.length ?? 0} />
        <div className="dock__embed" ref={host} />
        {status === 'error' && track && (
          <p className="dock__error" role="alert">
            The Spotify player could not load. <a href={track.spotify} target="_blank" rel="noreferrer">Open {track.title} on Spotify</a>
          </p>
        )}
        <button type="button" className="dock__close" aria-label="Close player" onClick={close}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
      </aside>
    </Ctx.Provider>
  );
}
