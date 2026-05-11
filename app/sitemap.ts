import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://madhanbv.dev',
      lastModified: new Date('2026-05-11'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}

