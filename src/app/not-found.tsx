import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="hub">
      <p className="eyebrow">404 · Track not found</p>
      <h1 className="display" style={{ fontSize: 'clamp(3rem, 10vw, 8rem)' }}>Off beat.</h1>
      <Link className="btn" href="/">Back to the floor</Link>
    </main>
  );
}
