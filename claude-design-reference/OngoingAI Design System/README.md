# OngoingAI Design System

> Design system for **OngoingAI** — tools that help vibe coders build quickly and with more reliability.

---

## About the company

OngoingAI makes tools for **vibe coders** — developers who prototype by feel, iterate fast, and want an AI partner that keeps up without dropping the thread. The product's value prop lives in two tensions:

- **Speed vs reliability.** Ship fast, but don't wake up to a broken project.
- **In-flow vs in-control.** Stay in the creative groove, but never lose track of what the AI actually did.

The name and mark both express this: *ongoing* = a continuous, unbroken loop. The logomark is a hand-drawn spiral that never fully closes — iteration, not a fixed destination.

### Sources used for this design system

- **`uploads/logo.png`** — primary logomark (spiral glyph, 1024×1024, orange background #FD953B).
- **`website/logo.png`** — same logomark, attached local codebase contains no other files at time of authoring. *There is currently no implemented website or app codebase to reference.* This design system was therefore defined greenfield from the logo, brand name, and the user's stated preferences (orange, marketing landing page, likely Next.js).

> ⚠️ **Iteration ask for the user:** When you have real product screenshots, Figma files, or a prototype, attach them and we'll fold them in — right now the UI kit below is a *brand-faithful proposal*, not a recreation.

---

## Index — what's in this folder

| Path | What it is |
|---|---|
| `colors_and_type.css` | CSS variables for color, type, spacing, radius, shadow. The source of truth. |
| `assets/` | Logo, favicon, brand marks. |
| `preview/` | Small HTML cards that populate the Design System tab. |
| `ui_kits/website/` | Marketing-site UI kit: hero, nav, features, CTA, footer, code-demo block. |
| `SKILL.md` | Agent skill manifest — lets Claude Code (or any agent) use this system. |
| `README.md` | You are here. |

There is no `slides/` folder because no slide template was provided.

---

## Brand fundamentals in one line

**Warm orange + paper + serif display + monospace punctuation, set against a friendly, confident dev-tool voice that trusts the reader.**

---

## Content fundamentals

### Tone
Confident, warm, unpretentious. Talks to developers like a smart peer, not a platform. Treats "vibe coding" as a legitimate way to work — never condescending about it, never winking about it either.

### Voice rules
- **You > we.** Address the reader directly. "You ship. We keep the rails on."
- **Short sentences.** One idea at a time. Fragments are fine.
- **No corporate hedging.** Not *"helps enable teams to potentially ship faster."* Instead: *"Ship faster. Break less."*
- **No AI platitudes.** Avoid *"unleash," "harness," "empower," "revolutionary," "game-changer."*
- **Verbs first in CTAs.** *Start building. See a demo. Read the changelog.*
- **Specific over grand.** Say *"recover from a bad prompt in one click"* instead of *"industry-leading reliability."*

### Casing
- **Sentence case for everything.** Headings, buttons, nav items, card titles. Not Title Case. Not ALL CAPS (except the mono eyebrow label, which is a visual device, not a copy decision).
- Product name is always **OngoingAI** — one word, two capitals, no space.
- Feature names lowercase in prose: *"the checkpoint system,"* not *"the Checkpoint System."*

### Emoji
Not in product or marketing copy. The brand voice is warm without them. Exception: the team can use emoji in changelog posts and community channels where it would feel stiff not to.

### Unicode glyphs as punctuation
Yes — the em dash ( — ), the arrow ( → ) for CTAs, the middot ( · ) as a separator in meta rows. These feel craft-y and editorial.

### Example copy

**Hero (good):**
> Stay in the vibe. Keep the rails on.
>
> OngoingAI is the AI pair for developers who ship by feel — without the 2 a.m. rollbacks.

**Hero (wrong — don't do this):**
> 🚀 Supercharge your workflow with our revolutionary AI platform that empowers teams to unleash their coding potential!

**Feature card (good):**
> **Checkpoints**
> Every change is a branch. Roll back a bad idea in one click, keep the three good ones.

**Button labels:** *Start free · See it work · Read the docs · Join the beta*

**Error state:** *"That prompt didn't land. Here's what it tried — revert or retry?"* (Not *"An error occurred."*)

---

## Visual foundations

### Colors
- **Primary orange `#FD953B`** (pulled directly from the logo background). Full ramp in `colors_and_type.css` as `--orange-50` → `--orange-900`.
- **Ink neutrals** are warm, paper-leaning (`--ink-50` is `#FAF8F5`, not pure white). Orange on pure white reads harsh; on warm paper it sings.
- **Near-black `#0E0D0B`** is the ink color — matches the logo strokes. Avoid pure black `#000`.
- Semantic colors (`--success`, `--warning`, `--danger`, `--info`) are muted and warm, never saturated. Danger is a warm clay, not a pure red.

### Typography
- **Display: Instrument Serif** — transitional serif with real italics. Used for hero lines, big numbers, section openers. Creates the "editorial software" feel.
- **Body: Geist** — Vercel's clean neo-grotesque. Used for everything UI.
- **Mono: Geist Mono** — for code, and for the all-caps eyebrow label above sections (mono + tracked + uppercase is a signature move).

> **Font substitution flag** → No custom fonts were provided. Instrument Serif, Geist, and Geist Mono are loaded from Google Fonts in `colors_and_type.css`. If OngoingAI has licensed brand fonts (e.g. a custom wordmark face), replace the `@import` and drop the `.ttf`/`.woff2` into `fonts/`.

### Spacing
4pt baseline grid (`--s-1` = 4px → `--s-10` = 128px). Marketing sections use generous vertical rhythm (`--s-8` / `--s-9`). Product UI stays tight (`--s-3` / `--s-4`).

### Backgrounds
- **Paper (`--ink-50`)** is the default canvas, not white.
- **Full-bleed orange** for hero moments and section dividers. Ink text on orange, like the logo.
- **No gradients** — the brand is flat. One exception: a very subtle radial protection gradient (warm-orange → paper) may be used behind the hero headline for legibility when over a photo.
- **No repeating patterns or hand-drawn textures.** The logo's hand-drawn spiral is the one place illustration lives.
- **Photography, when used,** is warm-toned, daylit, slightly grainy. Prefer close-up crops of desks, hands, keyboards over stock AI imagery.

### Animation
- **Ease:** `cubic-bezier(0.2, 0.9, 0.3, 1)` — snappy start, gentle settle. Never overshoot bounces. Duration 150–240ms for UI, 400–600ms for hero entrances.
- **Motion primitives:** fade+rise-4px for entrances, color-crossfade for hovers, no parallax.
- **The spiral motif may loop** — on the logomark, a slow 20s rotation or a subtle stroke-draw on page load. Use sparingly.

### Hover states
- Primary orange buttons → shift to `--orange-500` (one step darker).
- Ink buttons → fill lightens 4–6% (not opacity — opacity looks washed out).
- Links → underline appears, never a color change.
- Cards → raise by 1px `translateY(-1px)` + `--shadow-md`.

### Press states
- All interactive elements: `scale(0.98)` + remove shadow.
- Duration 80ms, snapping back on release.

### Borders
- **1px `--border-1`** (`#E6E2DA`) is the default. Quiet, not invisible.
- **1px `--border-strong`** (near-black ink) for high-contrast emphasis — on cards that should feel printed, on bordered buttons, on the input focus ring when orange glow is too soft.
- Rule of thumb: **borders do the work shadows usually do.** The brand prefers a crisp 1px ink edge to a soft drop shadow.

### Shadows
Kept deliberately small. `--shadow-sm` for resting cards; `--shadow-md` for hover/elevated; `--shadow-lg` reserved for modals and popovers. Color is warm-ink (`rgba(14, 13, 11, …)`), never cool gray.

**No inner shadows.** No glossy inset highlights. One exception: `--shadow-glow-orange` is a 3px orange focus ring used on focused inputs.

### Protection gradients vs capsules
For overlaying text on images → prefer **capsules** (a rounded paper or ink pill behind the text) over gradient scrims. Gradients only when a capsule would break the composition.

### Corner radii
- `--radius-sm` (6px) on inputs, small buttons.
- `--radius-md` (10px) on standard buttons, cards.
- `--radius-lg` (14px) on feature cards, modals.
- `--radius-pill` on tags, avatars, and the nav-level "Try it" CTA.
- **Hero containers often have NO radius** — the full-bleed orange block is a sharp rectangle. Flat, editorial.

### Cards
Default card = paper background, 1px `--border-1`, `--radius-lg`, `--shadow-sm`, `--s-5` padding. A "hero card" variant inverts: orange background, ink text, no border, no shadow, `--radius-lg`.

### Transparency & blur
- No frosted glass. No `backdrop-filter: blur()` as a signature.
- Transparency allowed only on overlays (modal backdrop at `rgba(14,13,11,0.4)`) and on subtle hover washes (`rgba(253,149,59,0.08)` on list rows).

### Layout rules
- Marketing max width **1200px**, centered.
- Navigation is **sticky, 64px tall, paper background with a 1px bottom border** on scroll — no floating pill nav.
- Footer is ink-background (`--ink-900`) with paper text — the single "dark mode moment" of the marketing site.
- 12-column grid at desktop; single column below 768px.

### Imagery vibe
Warm, slightly desaturated, daylit. Think *Kinfolk meets Linear.* Avoid cold tech stock. Avoid people-staring-at-screens. Prefer artifacts: notebooks, code on paper, hands at keyboards.

---

## Iconography

**System:** [Lucide](https://lucide.dev) — loaded from CDN (`https://unpkg.com/lucide@latest`).

**Why Lucide:** consistent 1.5px stroke weight, rounded line caps, a vocabulary big enough to cover a dev tool (terminal, git-branch, command, check-circle, alert-triangle, etc.), and it visually harmonizes with the logo's stroke character — both are hand-friendly monoline geometry.

**Usage rules:**
- **Size:** 16px inline with text, 20px in buttons, 24px for feature-card icons, 40px for empty states.
- **Stroke weight:** always 1.5px (Lucide default). Don't mix 1px and 2px icons.
- **Color:** inherit `currentColor` so they swap automatically in light/dark contexts.
- **Never fill Lucide icons.** They're designed as outlines.
- **No custom drawn icons** until we have a proper icon commission. If a concept isn't in Lucide, pick the closest cousin or use a plain text label.

**Flag:** OngoingAI does not have a proprietary icon set. Lucide is a high-quality stand-in and matches the logo's stroke aesthetic well. Revisit when the brand matures — a 20–30 icon custom set would strengthen the identity.

**Emoji:** not used in product or marketing UI. See Content Fundamentals above.

**Unicode chars as punctuation:** `→` for CTAs, `·` for meta separators, `—` em dashes in copy. That's the whole set.

### The logomark

The mark itself is the only illustration in the system. It lives at:
- `assets/logo-mark.png` — full-color on orange, 1024×1024.
- `assets/logo-mark.svg` — vector reconstruction, single-color, inherits `currentColor`.
- `assets/logo-wordmark.svg` — glyph + "OngoingAI" lockup.

It may be animated (slow rotation or stroke-draw) but only at hero scale — never in nav bars or favicons.
