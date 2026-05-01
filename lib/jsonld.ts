import { ORGANIZATION, PEOPLE, SITE_URL, absoluteUrl } from './site';
import type { Answer, FaqItem, GlossaryEntry } from './content/types';

type JsonLd = Record<string, unknown>;

function organizationRef(): JsonLd {
  return {
    '@type': 'Organization',
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
  };
}

function personRef(authorId: string): JsonLd {
  const person = PEOPLE[authorId];
  if (!person) {
    return { '@type': 'Person', name: 'OngoingAI' };
  }
  return {
    '@type': 'Person',
    name: person.name,
    description: person.bio,
    ...(person.sameAs.length > 0 ? { sameAs: person.sameAs } : {}),
    ...(person.image ? { image: person.image } : {}),
  };
}

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ORGANIZATION.name,
    url: ORGANIZATION.url,
    logo: ORGANIZATION.logo,
    description: ORGANIZATION.description,
    ...(ORGANIZATION.sameAs.length > 0 ? { sameAs: ORGANIZATION.sameAs } : {}),
  };
}

export function articleJsonLd(answer: Answer): JsonLd {
  const url = absoluteUrl(`/answers/${answer.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: answer.question,
    description: answer.shortAnswer,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    datePublished: answer.publishedAt,
    dateModified: answer.lastUpdated,
    author: personRef(answer.authorId),
    publisher: organizationRef(),
    inLanguage: 'en',
    isAccessibleForFree: true,
  };
}

export function faqPageJsonLd(faqs: FaqItem[]): JsonLd | null {
  if (faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export type Breadcrumb = { name: string; url: string };

export function breadcrumbJsonLd(items: Breadcrumb[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function definedTermJsonLd(entry: GlossaryEntry): JsonLd {
  const url = absoluteUrl(`/glossary/${entry.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: entry.term,
    description: entry.definition,
    url,
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'OngoingAI Glossary',
      url: absoluteUrl('/glossary'),
    },
  };
}

export function blogPostingJsonLd(args: {
  title: string;
  slug: string;
  description?: string;
  datePublished: string;
  dateModified: string;
  authorId?: string;
}): JsonLd {
  const url = absoluteUrl(`/blog/${args.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: args.title,
    ...(args.description ? { description: args.description } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    datePublished: args.datePublished,
    dateModified: args.dateModified,
    author: args.authorId ? personRef(args.authorId) : organizationRef(),
    publisher: organizationRef(),
    inLanguage: 'en',
  };
}

// Render multiple JSON-LD blocks in a single <script> using @graph,
// which is the recommended pattern for pages with several schema types.
export function renderJsonLd(...blocks: (JsonLd | null | undefined)[]): string {
  const filtered = blocks.filter((b): b is JsonLd => Boolean(b));
  if (filtered.length === 0) return '';
  if (filtered.length === 1) return JSON.stringify(filtered[0]);
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': filtered.map(({ '@context': _ctx, ...rest }) => rest),
  });
}

export const SITE_URL_EXPORT = SITE_URL;
