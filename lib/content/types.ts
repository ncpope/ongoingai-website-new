// Content shapes for /answers and /glossary.
//
// These mirror the Sanity schema documented in docs/citability-implementation-spec.md §7
// so the eventual migration to Sanity-sourced content is mechanical.
// For now content lives as static TypeScript modules so we can iterate against the
// writing checklist without a CMS round-trip.

export type FaqItem = {
  question: string;
  answer: string;
};

export type Source = {
  title: string;
  url: string;
};

export type AnswerExample = {
  bad: string;
  good: string;
  note?: string;
};

export type AnswerCriteria = {
  heading: string;
  items: string[];
};

export type Answer = {
  slug: string;
  question: string;
  questionVariants: string[];
  shortAnswer: string;
  expansion: string[];
  contrast: string;
  criteria: AnswerCriteria;
  example: AnswerExample;
  memorableLine: string;
  faqs: FaqItem[];
  sources: Source[];
  relatedAnswerSlugs: string[];
  glossaryTermSlug: string | null;
  relatedPostSlugs: string[];
  authorId: string;
  publishedAt: string;
  lastUpdated: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type GlossaryEntry = {
  slug: string;
  term: string;
  definition: string;
  expansion: string;
  example?: string;
  answerSlug: string | null;
  publishedAt: string;
  lastUpdated: string;
  seoTitle?: string;
  seoDescription?: string;
};
