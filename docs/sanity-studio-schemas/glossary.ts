// Sanity Studio schema for `glossary` documents.
// Mirrors lib/content/types.ts → GlossaryEntry.

import { defineField, defineType } from 'sanity';

export const glossary = defineType({
  name: 'glossary',
  title: 'Glossary entry',
  type: 'document',
  fields: [
    defineField({
      name: 'term',
      title: 'Term',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'term', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'definition',
      title: 'Definition (≤25 words)',
      type: 'text',
      rows: 2,
      validation: (Rule) =>
        Rule.required().custom((text) => {
          if (!text) return true;
          const words = text.trim().split(/\s+/).length;
          return words <= 25
            ? true
            : `Definition must be ≤25 words (currently ${words}).`;
        }),
    }),
    defineField({
      name: 'expansion',
      title: 'One-paragraph expansion',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'example',
      title: 'Example (optional, ≤1 sentence)',
      type: 'text',
      rows: 2,
      description:
        'Include only when the concept is hard to visualize without an example. Skip otherwise.',
    }),
    defineField({
      name: 'answer',
      title: 'Linked answer page',
      type: 'reference',
      to: [{ type: 'answer' }],
    }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'datetime' }),
    defineField({ name: 'lastUpdated', title: 'Last updated', type: 'datetime' }),
    defineField({ name: 'seoTitle', title: 'SEO title', type: 'string' }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 2,
    }),
    defineField({ name: 'canonicalUrl', title: 'Canonical URL', type: 'url' }),
  ],
});
