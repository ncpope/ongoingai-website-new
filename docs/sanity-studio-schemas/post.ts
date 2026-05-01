// Sanity Studio schema for `post` (blog) documents.
// Extends the existing post schema with the fields needed for the citability spec.

import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({ name: 'publishedAt', title: 'Published at', type: 'datetime' }),
    defineField({ name: 'lastUpdated', title: 'Last updated', type: 'datetime' }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'person' }],
    }),
    defineField({
      name: 'relatedAnswers',
      title: 'Related answers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'answer' }] }],
      validation: (Rule) =>
        Rule.min(3)
          .max(6)
          .warning('Spec §6 requires every blog post to link to 3–6 answer pages.'),
    }),
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
