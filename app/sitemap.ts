import type { MetadataRoute } from 'next';

const BASE_URL = 'https://ongoing.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: BASE_URL,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/newsletter`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
}
