import type { Answer } from '../types';

// Reference implementation page for the citability spec.
// Every field has been checked against docs/citability-implementation-spec.md §4.
// If you change any text below, re-run the writing checklist before shipping.

export const whatIsCitability: Answer = {
  slug: 'what-is-citability',
  question: 'What is citability?',
  questionVariants: [
    'Define citability',
    'Citability meaning',
    'What does citability mean for AI search?',
    'What is content citability?',
    'How does citability work?',
  ],
  shortAnswer:
    'Citability is whether an AI system like ChatGPT chooses your page as a source when answering a question. A page is citable when it answers one specific question directly, uses precise language, and can be lifted into an AI response without rewriting.',
  expansion: [
    'Most content is not citable because it is written to rank for keywords, not to answer a specific question.',
    'Citability is the visibility metric for the AI-search era. Where SEO measures ranking in a list of links, citability measures whether your page is chosen as the source behind a single synthesized answer.',
    'Users no longer scan ten links. They read one answer and move on. If your page is not the source behind that answer, you are not part of that conversation — regardless of what your Google rank says.',
  ],
  contrast:
    'Citability is not about ranking higher in search results. It is about being chosen as the source behind a generated answer.',
  criteria: {
    heading: 'What makes a page citable',
    items: [
      'The opening paragraph answers the question directly, with no setup.',
      'Definitions are self-contained — quotable without surrounding context.',
      'The page includes the exact phrasing of the question as users actually ask it.',
      'Language is precise and concrete; no hedging, no jargon, no padding.',
      'The page covers a single, narrow question — not a survey of a topic.',
      'Authorship, sources, and the last-updated date are visible and verifiable.',
    ],
  },
  example: {
    bad: 'In this article, we will explore the concept of citability and discuss its importance in modern AI systems.',
    good: 'Citability is whether an AI system like ChatGPT chooses your page as a source when answering a question.',
    note: 'The bad opening defers the answer. The good opening is the answer — copy-paste ready, quotable in isolation.',
  },
  memorableLine:
    "LLMs don't surface pages that rank — they surface pages that answer.",
  faqs: [
    {
      question: 'How is citability different from SEO?',
      answer:
        'SEO optimizes for ranking in a list of links. Citability optimizes for being chosen as the source behind a generated answer. SEO targets crawlers; citability targets the moment an AI system selects a source for its answer.',
    },
    {
      question: 'How do I know if my content is citable?',
      answer:
        'Test it directly: ask ChatGPT, Claude, Perplexity, or Gemini the exact question your page answers. If your page is not cited and your framing does not appear in the response, your content is not yet citable for that query.',
    },
    {
      question: 'Does citability replace SEO?',
      answer:
        'No. Search and AI answers coexist. But the share of high-intent queries answered by AI synthesis is growing fast, and citability is the only lever that influences that channel.',
    },
    {
      question: 'What kinds of pages get cited most often?',
      answer:
        'Pages that define one term clearly, pages that answer one diagnostic question (“why does X happen”), and pages that walk through one prescriptive task (“how do I do Y”). Survey posts and listicles rarely get cited because they answer nothing in particular.',
    },
  ],
  sources: [],
  relatedAnswerSlugs: [
    'why-llms-dont-cite-your-site',
    'what-makes-content-citable',
    'answer-first-content',
  ],
  glossaryTermSlug: 'citability',
  relatedPostSlugs: [
    'your-site-doesnt-show-up-in-chatgpt-for-your-own-category-heres-why',
  ],
  authorId: 'nathan',
  publishedAt: '2026-04-30',
  lastUpdated: '2026-04-30',
  seoTitle: 'What is citability? — OngoingAI',
  seoDescription:
    'Citability is whether an AI system like ChatGPT chooses your page as a source when answering a question. Definition, criteria, and how it differs from SEO.',
};
