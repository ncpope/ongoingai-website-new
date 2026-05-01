import type { GlossaryEntry } from './types';

// Glossary entries are authored as static TypeScript modules and registered here.
// See docs/citability-implementation-spec.md §4 for the glossary checklist.
//
// Per the spec's hard gate (§10), no glossary entries ship in this batch.
// Entries land in pass 2 alongside the additional answer pages.

const GLOSSARY: GlossaryEntry[] = [];

const GLOSSARY_BY_SLUG: Map<string, GlossaryEntry> = new Map(
  GLOSSARY.map((g) => [g.slug, g]),
);

export function listGlossary(): GlossaryEntry[] {
  return [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term));
}

export function getGlossaryEntry(slug: string): GlossaryEntry | null {
  return GLOSSARY_BY_SLUG.get(slug) ?? null;
}

export function getGlossarySlugs(): string[] {
  return GLOSSARY.map((g) => g.slug);
}
