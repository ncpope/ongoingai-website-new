import { createClient } from '@sanity/client';

// Public (server-side) read client. Project ID and dataset are non-secret
// metadata; the optional SANITY_API_KEY enables previewDrafts so freshly
// published drafts from the dashboard show up without a manual Studio publish.
//
// In production with a separate website project, drop SANITY_API_KEY here so
// only published documents are visible.
const PROJECT_ID = process.env.SANITY_PROJECT_ID;
const DATASET = process.env.SANITY_DATASET;
const TOKEN = process.env.SANITY_API_KEY;
const DOCUMENT_TYPE = process.env.SANITY_DOCUMENT_TYPE ?? 'post';

export function isSanityConfigured(): boolean {
  return Boolean(PROJECT_ID && DATASET);
}

function getClient() {
  if (!PROJECT_ID || !DATASET) {
    throw new Error('Sanity is not configured (missing SANITY_PROJECT_ID or SANITY_DATASET).');
  }
  return createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: '2024-10-01',
    useCdn: !TOKEN,
    token: TOKEN,
    perspective: TOKEN ? 'previewDrafts' : 'published',
  });
}

export type BlogPostSummary = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
};

export type BlogPostDetail = BlogPostSummary & {
  body: unknown;
  description?: string;
};

export async function listBlogPosts(): Promise<BlogPostSummary[]> {
  if (!isSanityConfigured()) return [];
  const client = getClient();
  const docs = await client.fetch<
    Array<{
      _id: string;
      title?: string;
      slug?: { current?: string };
      _createdAt: string;
      _updatedAt: string;
    }>
  >(
    `*[_type == $type && defined(slug.current) && defined(title)] | order(_updatedAt desc) {
      _id, title, slug, _createdAt, _updatedAt
    }`,
    { type: DOCUMENT_TYPE },
  );
  return docs
    .filter((d) => d.title && d.slug?.current)
    .map((d) => ({
      _id: d._id,
      title: d.title as string,
      slug: d.slug!.current as string,
      publishedAt: d._createdAt,
      updatedAt: d._updatedAt,
    }));
}

export async function getBlogPost(slug: string): Promise<BlogPostDetail | null> {
  if (!isSanityConfigured()) return null;
  const client = getClient();
  const doc = await client.fetch<{
    _id: string;
    title?: string;
    slug?: { current?: string };
    body?: unknown;
    description?: string;
    _createdAt: string;
    _updatedAt: string;
  } | null>(
    `*[_type == $type && slug.current == $slug] | order(_updatedAt desc)[0] {
      _id, title, slug, body, description, _createdAt, _updatedAt
    }`,
    { type: DOCUMENT_TYPE, slug },
  );
  if (!doc || !doc.title || !doc.slug?.current) return null;
  return {
    _id: doc._id,
    title: doc.title,
    slug: doc.slug.current,
    body: doc.body ?? [],
    description: doc.description,
    publishedAt: doc._createdAt,
    updatedAt: doc._updatedAt,
  };
}
