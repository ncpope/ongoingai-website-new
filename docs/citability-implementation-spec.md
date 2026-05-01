# Citability Implementation Spec

> Single source of truth for the content + IA + schema work to make ongoing.ai citable by LLMs (ChatGPT, Claude, Perplexity, Gemini). Reference this doc during implementation. If reality diverges, update this doc — don't let it rot.

## 1. Goal

Get ongoing.ai cited as a source by LLMs for high-intent GEO/AI-search questions in our category.

The single most important lever is the **opening paragraph of each answer page**. Everything else (IA, schema, linking) is in service of that lever working at scale.

One-line strategy:

> Write answers so clear that an LLM could copy the first paragraph without editing.

## 2. Architecture

Three content layers with strict, non-overlapping roles:

| Layer       | Role                          | Length       | Primary job                              |
| ----------- | ----------------------------- | ------------ | ---------------------------------------- |
| `/blog`     | Narrative, opinion, entry     | 800–2000w    | Drive traffic, build POV, link to answers |
| `/answers`  | Canonical, citable, deep      | 600–1500w    | Be the citation target                   |
| `/glossary` | Short definition, retrieval   | 150–300w     | Cover quick "what is X" queries; feed answers |

Roles are strict:
- A glossary entry is **not** a short answer page. It defines, links, and stops.
- An answer page is **not** a blog post. No narrative arc, no "I think". It answers the literal question.
- A blog post is **not** a citation target. It's the front door.

## 3. URL structure

```
/blog/<slug>
/answers/<question-slug>
/glossary/<term-slug>
```

Slugs:
- Answers: full natural-language question form, kebab-case (`/answers/why-llms-dont-cite-your-site`).
- Glossary: term only (`/glossary/citability`, `/glossary/geo`).
- Blog: descriptive, can be longer.

## 4. The writing checklist (the lever)

Every answer page's opening paragraph must pass all of these. Glossary entries follow a tightened version.

### Answer opening paragraph

- [ ] ≤60 words
- [ ] First sentence contains the literal noun/concept being asked about
- [ ] Answers the question directly in sentence 1 — no setup, no "in this post"
- [ ] Self-contained: makes sense if copy-pasted into an AI answer with no surrounding context
- [ ] Present tense, declarative
- [ ] Includes our POV, not just a neutral definition (a stance, a "because", a contrast)
- [ ] No hedging language ("can sometimes", "in some cases", "many people believe")
- [ ] No anaphora to outside context ("this", "that", "these", "as mentioned")
- [ ] No first-person plural ("we'll explore", "let's look at")
- [ ] Concrete subjects over abstract phrasing — active voice, named actors (not "it can be observed that…")
- [ ] Reads like something a human would actually say out loud — no academic register, no consultancy jargon

> The "spoken language" rule prevents sterility, not formality. The opening is still a declarative definition, not a chatty take. Encyclopedia tone, human cadence.

Reference paragraph (use as the bar):

> Citability is how likely your content is to be used as a source by AI systems like ChatGPT. Content becomes citable when it clearly answers a specific question, uses precise language, and can be quoted directly without rewriting.

### Glossary entry

- [ ] First sentence is a one-line definition (≤25 words)
- [ ] Total length 150–300 words
- [ ] Ends with a "Read more" link to the canonical answer page
- [ ] At most **one** example, ≤1 sentence — optional, not required (long examples belong on the answer page)

### Page-level: the memorable line

Separate from the opening, every answer page must contain **at least one line in the body that is quotable in isolation** — a sentence that compresses the idea into something a reader could repeat from memory.

This rule lives at the page level, not the opening. The opening is definitional; the memorable line lives in the expansion or the contrast section. Don't force punchy one-liners into the opening — that's where the encyclopedia voice belongs.

Test: read the page, close the tab, write down the one sentence you remember. If you can't, the page doesn't have one yet.

## 5. Page templates

### 5.1 Answer page structure

1. **H1** — the question, verbatim
2. **Opening paragraph** — passes the checklist above
3. **Short expansion** — 2–3 paragraphs of context (why it matters, how it differs from the obvious confounds)
4. **Bulleted criteria / structure** — the "what makes X" list
5. **Concrete example** — Bad vs Good, or before/after
6. **Related answers** — 2–4 links to sibling answer pages
7. **Glossary cross-link** — link to the matching glossary entry
8. **Back-to-blog** (optional) — link to the originating narrative post if applicable

### 5.2 Glossary entry structure

1. **H1** — the term
2. **Definition sentence** (≤25 words)
3. **One paragraph of expansion**
4. **"Read more" link** to the answer page

### 5.3 Blog post structure (existing post refactor)

Existing post: `/blog/your-site-doesnt-show-up-in-chatgpt`

Retrofit, don't rewrite. Add 3–6 contextual links into the body, plus a "Related answers" section at the bottom. Keep the narrative voice; the post is not a citation target.

## 6. Linking rules

Non-negotiable:

- Every blog post links to **3–6 answer pages**.
- Every answer page links to **2–4 sibling answer pages** (the "Related answers" section).
- Every answer page links to its matching glossary entry.
- Every glossary entry links to its answer page.
- No orphans. Every page is reachable from at least two others.

## 7. Sanity schema

### 7.1 `post` (blog)

```
title
slug
body (portable text)
publishedAt
lastUpdated
author (ref → person)
relatedAnswers[] (ref → answer)
seoTitle
seoDescription
canonicalUrl
ogImage
```

### 7.2 `answer`

```
question                  // the H1 / canonical question form
slug
questionVariants[]        // alternate phrasings of the same question
shortAnswer               // the opening paragraph (the citation target)
body (portable text)      // expansion + criteria + example
faqs[]                    // sub-questions with short answers, used for FAQPage JSON-LD
sources[]                 // { title, url } — pages this answer cites
author (ref → person)
publishedAt
lastUpdated
relatedAnswers[] (ref → answer)
relatedPosts[] (ref → post)
glossaryTerm (ref → glossary)
seoTitle
seoDescription
canonicalUrl
ogImage
schemaType                // default "Article"; allow override per page
```

### 7.3 `glossary`

```
term
slug
definition                // ≤25 words, the lead sentence
body (portable text)      // 1 paragraph expansion
answer (ref → answer)
publishedAt
lastUpdated
seoTitle
seoDescription
canonicalUrl
```

### 7.4 `person` (author)

```
name
role
bio
sameAs[]                  // URLs: LinkedIn, Twitter/X, personal site, etc.
image
```

## 8. JSON-LD requirements

Required on every answer page:

- `Article` (or override via `schemaType`) with: `headline`, `datePublished`, `dateModified`, `author` (Person with `sameAs`), `publisher` (Organization), `mainEntityOfPage`, `image`.
- `FAQPage` built from `faqs[]` if present.
- `BreadcrumbList` reflecting `Home → Answers → <question>`.

Required on every glossary entry:

- `DefinedTerm` with `name`, `description`, `inDefinedTermSet`.
- `BreadcrumbList`.

Required on every blog post:

- `Article` with the same fields as above.
- `BreadcrumbList`.

Site-wide:

- `Organization` schema in the root layout, with `sameAs[]` and `logo`.

Implementation notes:
- Generate JSON-LD server-side from Sanity data; never inline static blobs.
- `dateModified` must reflect the actual `lastUpdated` field, not build time.
- Validate every page in Google Rich Results Test before declaring a template done.

## 9. Measurement plan

Baseline before launch. Re-test monthly.

### 9.1 Probe sheet columns

```
Question | Model | Response summary | Cited ongoing.ai? | Mentioned ongoing.ai? | Our framing appeared? | Competitors cited | Gap | Action | Date tested
```

### 9.2 Models

ChatGPT, Claude, Perplexity, Gemini.

### 9.3 Question set

Start with ~20 target questions covering:
- Core definitions (what is GEO, what is citability, what is answer-first content)
- Diagnostic ("why isn't my site in ChatGPT")
- Prescriptive ("how do I get cited by AI")
- Comparison ("GEO vs SEO")
- Adjacent buyer questions (define these from sales/inbound, not from the office)

Maintain the question set in `docs/citability-probe-questions.md` (separate file, version controlled).

### 9.4 Cadence

- **Baseline:** before any answer pages ship.
- **First re-test:** 4 weeks after launch.
- **Ongoing:** monthly.

## 10. First batch (build order)

1. Sanity schemas (`post`, `answer`, `glossary`, `person`) — ship together.
2. Answer page template (Next.js route) with full JSON-LD.
3. Glossary page template with `DefinedTerm` JSON-LD.
4. `Organization` JSON-LD in root layout.
5. Write `/answers/what-is-citability` end-to-end as the reference implementation. **Hard gate: do not build any other content (answers, glossary, blog refactor, indexes) until this page is undeniable.** Passing the writing checklist and Rich Results Test is necessary but not sufficient. The undeniable test:
   - Read the opening aloud. Does it sound like the best definition of citability you've encountered?
   - Close the tab and write the one sentence you remember. Does the page actually have one?
   - Would you be embarrassed if a competitor's page got cited by ChatGPT *over* this one?
   - If any answer is no, iterate. The first page is the standard; everything else copies it.
6. Then: `/answers/why-llms-dont-cite-your-site`, `/answers/what-makes-content-citable`, `/answers/answer-first-content`.
7. Glossary entries: `/glossary/citability`, `/glossary/geo`, `/glossary/answer-first-content`, `/glossary/atomic-page`.
8. Refactor existing blog post to link into the new pages.
9. Build `/answers` index and `/glossary` index.
10. Run baseline probe across all four models before announcing.

## 11. Decisions and explicit non-goals

Captured here so future-us doesn't re-litigate.

- **Three layers, not two.** Glossary added as a separate retrieval shape (per ChatGPT's revision). Glossary supports answers; it does not replace them.
- **No "why this page is structured this way" dogfooding aside.** The floor on execution is too low — done badly it reads as smug. Let the work speak.
- **No `/answers/<topic>/` index sub-pages on day one.** Add only when there are ≥6 answers in a topic.
- **Answer pages are the only canonical citation targets.** Blog posts and glossary entries link to them; nothing the other way around competes for citation.
- **No FAQ schema duplication.** If a sub-question lives in `faqs[]` on an answer page, it does not also become its own answer page.
- **Authorship is real.** Every page has a real `author` with `sameAs`. No "ongoing.ai team" placeholder — LLMs weight named, verifiable authors.

## 12. Definition of done (per page)

A page is shippable when:

- [ ] Opening paragraph passes the writing checklist
- [ ] All required internal links present (related answers, glossary cross-link, etc.)
- [ ] JSON-LD validates in Google Rich Results Test
- [ ] `lastUpdated` is set
- [ ] Author is set with valid `sameAs`
- [ ] Page is reachable from at least two other pages
- [ ] Slug matches a planned entry in the probe sheet
