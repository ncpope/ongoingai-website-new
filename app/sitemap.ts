import type { MetadataRoute } from 'next';
import { listBlogPosts, isSanityConfigured } from '@/lib/sanity';
import { listAnswers } from '@/lib/content/answers';
import { listGlossary } from '@/lib/content/glossary';

const BASE_URL = 'https://ongoing.ai';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
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
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/answers`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/glossary`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  const answerEntries: MetadataRoute.Sitemap = listAnswers().map((answer) => ({
    url: `${BASE_URL}/answers/${answer.slug}`,
    lastModified: new Date(answer.lastUpdated),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const glossaryEntries: MetadataRoute.Sitemap = listGlossary().map((entry) => ({
    url: `${BASE_URL}/glossary/${entry.slug}`,
    lastModified: new Date(entry.lastUpdated),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  if (!isSanityConfigured()) {
    return [...staticEntries, ...answerEntries, ...glossaryEntries];
  }

  const posts = await listBlogPosts();
  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...postEntries, ...answerEntries, ...glossaryEntries];
}
