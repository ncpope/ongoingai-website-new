// Sanity Studio schema for `person` documents.
// Author records. The `sameAs` URLs are load-bearing for E-E-A-T and citability.

import { defineField, defineType } from 'sanity';

export const person = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'role', title: 'Role / title', type: 'string' }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Headshot',
      type: 'image',
    }),
    defineField({
      name: 'sameAs',
      title: 'sameAs URLs',
      type: 'array',
      of: [{ type: 'url' }],
      description:
        'Verifiable profiles: LinkedIn, X/Twitter, personal site, GitHub, etc. Required for citability — LLMs weight named, verifiable authors.',
      validation: (Rule) => Rule.min(1).warning('Add at least one verifiable profile URL.'),
    }),
  ],
});
