import type { Answer } from './types';

// Answer pages are authored as static TypeScript modules and registered here.
// See docs/citability-implementation-spec.md for the writing checklist every
// entry must pass before being added to ANSWERS.
//
// Per the spec's hard gate (§10), only /answers/what-is-citability is shipped
// in this batch. Additional entries are added in pass 2 once the first page
// passes the undeniable test.

import { whatIsCitability } from './answers/what-is-citability';

const ANSWERS: Answer[] = [whatIsCitability];

const ANSWERS_BY_SLUG: Map<string, Answer> = new Map(
  ANSWERS.map((a) => [a.slug, a]),
);

export function listAnswers(): Answer[] {
  return [...ANSWERS].sort(
    (a, b) =>
      new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(),
  );
}

export function getAnswer(slug: string): Answer | null {
  return ANSWERS_BY_SLUG.get(slug) ?? null;
}

export function getAnswerSlugs(): string[] {
  return ANSWERS.map((a) => a.slug);
}

// Resolve a list of related-answer slugs to actual Answer entries,
// silently dropping any that haven't been published yet. This lets the
// reference page name future siblings in its data without breaking renders.
export function resolveRelatedAnswers(slugs: string[]): Answer[] {
  return slugs
    .map((slug) => ANSWERS_BY_SLUG.get(slug))
    .filter((a): a is Answer => Boolean(a));
}
