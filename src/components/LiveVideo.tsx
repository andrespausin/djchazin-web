'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { SocialIcon } from './Music';
import { usePlayer } from './PlayerProvider';
import { links } from '@/data/site';

const VIDEO_ID = links.liveVideo.split('v=')[1];
const TITLE = 'Paradise Beach Festival';

/**
 * Low panoramic banner; the video opens in a lightbox at its real 16:9 size.
 * YouTube's player and cookies only load once the visitor opens it.
 */
export default function LiveVideo() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const { status, close: stopRecord } = usePlayer();

  const show = () => { stopRecord(); setOpen(true); dialog.current?.showModal(); };
  const hide = () => { dialog.current?.close(); };

  // Only one thing plays at a time: a record started later closes the video.
  useEffect(() => { if (open && (status === 'playing' || status === 'loading')) hide(); }, [status, open]);

  return (
    <>
      <div className="live__frame" data-reveal>
        <Image src="/images/epk-v4/p4_confetti.webp" alt="" fill sizes="100vw" style={{ objectFit: 'cover', objectPosition: 'center 40%' }} />
        <div className="live__shade" />
        <div className="live__content">
          <p className="eyebrow">Aftermovie</p>
          <h2 className="display live__title">{TITLE}</h2>
          <p className="live__place">Phuket, Thailand</p>
          <div className="btn-row">
            <button type="button" className="btn btn--gold live__play" onClick={show}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.2v13.6a.6.6 0 0 0 .92.5l10.4-6.8a.6.6 0 0 0 0-1L8.92 4.7A.6.6 0 0 0 8 5.2Z" /></svg>
              Play aftermovie
            </button>
            <a className="btn live__yt" href={links.liveVideo} target="_blank" rel="noreferrer"><SocialIcon name="youtube" size={18} /> Watch on YouTube</a>
          </div>
        </div>
      </div>
      <dialog
        ref={dialog}
        className="live__dialog"
        aria-label={`Chazin aftermovie, ${TITLE}`}
        onClose={() => setOpen(false)}
        onClick={(e) => { if (e.target === dialog.current) hide(); }}
      >
        <div className="live__ratio">
          {open && (
            <iframe
              className="live__player"
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={`Chazin aftermovie, ${TITLE}, Phuket, Thailand`}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )}
        </div>
        <button type="button" className="venue__close" aria-label="Close video" onClick={hide}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
        </button>
      </dialog>
    </>
  );
}
