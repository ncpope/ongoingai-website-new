# Sanity Studio schemas (drop-in)

These files define the document types referenced in `docs/citability-implementation-spec.md` §7. They live here as a reference because the website repo only consumes Sanity content (it doesn't host the Studio).

## How to use

1. Copy each `.ts` file into your Sanity Studio's `schemas/` directory.
2. Register them in your Studio's `schema.ts` (or equivalent).
3. Add the corresponding env vars to the website `.env.local`:
   - `SANITY_PROJECT_ID`
   - `SANITY_DATASET`
   - `SANITY_API_KEY` (optional; enables `previewDrafts` perspective)
4. The website's read functions (`lib/sanity.ts`) need to be extended to fetch `answer`, `glossary`, and `person` types — currently only `post` is wired up. Until then, `/answers` and `/glossary` are populated from the static modules under `lib/content/`.

## Migration plan (future, not now)

Once content authors want to manage answers/glossary in Studio:

1. Author the entries in Studio.
2. Extend `lib/sanity.ts` with `listAnswers`, `getAnswer`, `listGlossary`, `getGlossaryEntry` that hit Sanity.
3. Swap the imports in `app/answers/...` and `app/glossary/...` from `@/lib/content/...` to `@/lib/sanity`.
4. Delete the static modules under `lib/content/answers/` and `lib/content/glossary/`.

The shape of the static `Answer` and `GlossaryEntry` types intentionally mirrors the Sanity schema so this migration is mechanical.
