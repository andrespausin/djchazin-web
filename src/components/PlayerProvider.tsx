'use client';

import Image from 'next/image';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { SocialIcon } from './Music';
import Visualizer from './Visualizer';

export type Track = { slug: string; title: string; spotify: string; cover?: string };
export type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error';

type PlaybackUpdate = { data: { isPaused: boolean; isBuffering: boolean; position: number; duration: number } };
type Controller = {
  loadUri(uri: string): void; play(): void; pause(): void; togglePlay(): void;
  addListener(ev: 'ready', cb: () => void): void;
  addListener(ev: 'playback_update', cb: (e: PlaybackUpdate) => void): void;
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
const AUTOPLAY_GRACE_MS = 6000; // no sound by then: the browser refused to start the hidden player

type PlayerContext = {
  track: Track | null;
  status: PlayerStatus;
  toggle(track: Track): void;
  close(): void;
  getSeconds(): number;
  /** The record being played reports whether it is on screen; the bar only shows when it is not. */
  setOnStage(visible: boolean): void;
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
  const [blocked, setBlocked] = useState(false);
  const [onStage, setOnStage] = useState(false);
  const host = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const controller = useRef<Controller | null>(null);
  const clock = useRef({ position: 0, at: 0, running: false });
  const creating = useRef(false);
  const grace = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const getSeconds = useCallback(() => {
    const c = clock.current;
    return (c.position + (c.running ? performance.now() - c.at : 0)) / 1000;
  }, []);

  const expectSound = useCallback(() => {
    clearTimeout(grace.current);
    grace.current = setTimeout(() => { if (!clock.current.running) setBlocked(true); }, AUTOPLAY_GRACE_MS);
  }, []);

  const start = useCallback(async (uri: string) => {
    expectSound();
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
          const running = !data.isPaused && !data.isBuffering;
          clock.current = { position: data.position, at: performance.now(), running };
          setStatus(data.isPaused ? 'paused' : data.isBuffering ? 'loading' : 'playing');
          if (bar.current && data.duration) bar.current.style.scale = `${Math.min(1, data.position / data.duration)} 1`;
          if (running) { clearTimeout(grace.current); setBlocked(false); }
        });
      });
    } catch {
      clearTimeout(grace.current);
      setStatus('error');
    } finally {
      creating.current = false;
    }
  }, [expectSound]);

  const toggle = useCallback((next: Track) => {
    if (track?.slug === next.slug && status !== 'error') {
      if (status !== 'playing') expectSound();
      else clearTimeout(grace.current);
      controller.current?.togglePlay();
      return;
    }
    setTrack(next);
    setStatus('loading');
    setBlocked(false);
    clock.current = { position: 0, at: 0, running: false };
    if (bar.current) bar.current.style.scale = '0 1';
    void start(trackUri(next.spotify));
  }, [expectSound, start, status, track]);

  const close = useCallback(() => {
    clearTimeout(grace.current);
    controller.current?.pause();
    clock.current.running = false;
    setTrack(null);
    setStatus('idle');
    setBlocked(false);
  }, []);

  const failed = status === 'error';
  const showDock = !!track && (!onStage || blocked || failed);
  useEffect(() => { document.documentElement.classList.toggle('player-open', showDock); }, [showDock]);

  const value = useMemo(() => ({ track, status, toggle, close, getSeconds, setOnStage }), [track, status, toggle, close, getSeconds]);
  const isPlaying = status === 'playing';

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="spotify-host" ref={host} data-visible={blocked ? '' : undefined} aria-hidden={!blocked} inert={!blocked} />
      <aside className="dock" data-open={showDock ? '' : undefined} aria-label="Music player" inert={!showDock}>
        <span className="dock__bar" ref={bar} aria-hidden="true" />
        {track?.cover && <Image className="dock__cover" src={track.cover} alt="" width={52} height={52} />}
        {track && !failed && (
          <button type="button" className="dock__toggle" aria-label={`${isPlaying ? 'Pause' : 'Play'} ${track.title}`} onClick={() => toggle(track)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              {isPlaying ? <path d="M7 5h3.6v14H7zM13.4 5H17v14h-3.6z" /> : <path d="M8 5.2v13.6a.6.6 0 0 0 .92.5l10.4-6.8a.6.6 0 0 0 0-1L8.92 4.7A.6.6 0 0 0 8 5.2Z" />}
            </svg>
          </button>
        )}
        <div className="dock__meta" aria-live="polite">
          <span className="dock__title">{track?.title}</span>
          {failed && track ? (
            <span className="dock__sub" role="alert">Could not load the player. <a href={track.spotify} target="_blank" rel="noreferrer">Open on Spotify</a></span>
          ) : (
            <span className="dock__sub">{blocked ? 'Press play on the Spotify player to start' : 'Chazin'}</span>
          )}
        </div>
        <Visualizer className="dock__viz" bars={40} seed={track?.title.length ?? 0} />
        {track && !failed && (
          <a className="dock__spotify" href={track.spotify} target="_blank" rel="noreferrer"><SocialIcon name="spotify" size={16} /> Spotify</a>
        )}
        <button type="button" className="dock__close" aria-label="Close player" onClick={close}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
      </aside>
    </Ctx.Provider>
  );
}
