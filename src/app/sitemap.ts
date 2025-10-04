import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://simcal.yoshi0518.com',
      lastModified: new Date(),
    },
  ];
}
