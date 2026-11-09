import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://djchazin.com';
  return ['', '/about', '/music', '/shows', '/press', '/booking', '/links'].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: 'monthly',
    priority: p === '' ? 1 : 0.7,
  }));
}
