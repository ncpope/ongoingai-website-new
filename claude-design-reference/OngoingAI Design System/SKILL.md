---
name: ongoingai-design
description: Use this skill to generate well-branded interfaces and assets for OngoingAI, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick-reference

- **Primary color:** orange `#FD953B` (logo-derived). Full ramp in `colors_and_type.css`.
- **Ink:** warm near-black `#0E0D0B`. Default bg is paper `#FAF8F5`, not white.
- **Display type:** Instrument Serif (400/400 italic). **Body:** Geist. **Mono:** Geist Mono.
- **Voice:** direct, second-person, sentence case, no emoji, no AI platitudes.
- **Icons:** Lucide CDN, 1.5px stroke, never filled.
- **Cards:** paper / printed (1px ink) / hero (orange fill, ink text + border).
- **No:** gradients, frosted glass, bluish-purple, rounded-left-border-accent tropes.

Always `@import '../colors_and_type.css'` or equivalent. Never redeclare tokens.
