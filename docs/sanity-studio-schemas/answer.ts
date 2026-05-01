// Sanity Studio schema for `answer` documents.
// Mirrors lib/content/types.ts → Answer.
// Drop into your Studio's schemas/ folder and register in schema.ts.

import { defineField, defineType } from 'sanity';

export const answer = defineType({
  name: 'answer',
  title: 'Answer',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question (H1)',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
      description: 'The literal question this page answers. Used as H1.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'question', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'questionVariants',
      title: 'Question variants',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Alternate phrasings of the same question. Helps the page surface for paraphrased prompts.',
    }),
    defineField({
      name: 'shortAnswer',
      title: 'Short answer (opening paragraph)',
      type: 'text',
      rows: 4,
      validation: (Rule) =>
        Rule.required()
          .max(500)
          .custom((text) => {
            if (!text) return true;
            const wordCount = text.trim().split(/\s+/).length;
            return wordCount <= 60
              ? true
              : `Opening must be ≤60 words (currently ${wordCount}).`;
          }),
      description:
        'The citation target. Must pass the writing checklist in docs/citability-implementation-spec.md §4.',
    }),
    defineField({
      name: 'expansion',
      title: 'Expansion paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      validation: (Rule) => Rule.required().min(1).max(4),
      description: '2–3 paragraphs of context after the opening.',
    }),
    defineField({
      name: 'contrast',
      title: 'Contrast move',
      type: 'text',
      rows: 2,
      description: 'A "X is not Y. It is Z." sentence. Required per spec §4.',
    }),
    defineField({
      name: 'criteria',
      title: 'Criteria section',
      type: 'object',
      fields: [
        { name: 'heading', type: 'string', title: 'Heading' },
        {
          name: 'items',
          title: 'Items',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'example',
      title: 'Bad/Good example',
      type: 'object',
      fields: [
        { name: 'bad', type: 'text', title: 'Bad', rows: 2 },
        { name: 'good', type: 'text', title: 'Good', rows: 2 },
        { name: 'note', type: 'text', title: 'Note', rows: 2 },
      ],
    }),
    defineField({
      name: 'memorableLine',
      title: 'Memorable line',
      type: 'text',
      rows: 2,
      description:
        'The one sentence a reader could repeat from memory. Lives in the body, not the opening.',
    }),
    defineField({
      name: 'faqs',
      title: 'Follow-up FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string' },
            { name: 'answer', type: 'text', rows: 4 },
          ],
        },
      ],
      description: 'Used to generate FAQPage JSON-LD.',
    }),
    defineField({
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'url', type: 'url' },
          ],
        },
      ],
      description: 'External pages this answer cites. LLMs prefer pages that themselves cite.',
    }),
    defineField({
      name: 'relatedAnswers',
      title: 'Related answers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'answer' }] }],
      validation: (Rule) => Rule.min(2).max(4),
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related blog posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
    }),
    defineField({
      name: 'glossaryTerm',
      title: 'Linked glossary term',
      type: 'reference',
      to: [{ type: 'glossary' }],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'person' }],
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: 'schemaType',
      title: 'Schema.org type override',
      type: 'string',
      options: {
        list: [
          { title: 'Article (default)', value: 'Article' },
          { title: 'TechArticle', value: 'TechArticle' },
          { title: 'BlogPosting', value: 'BlogPosting' },
        ],
      },
    }),
  ],
});
