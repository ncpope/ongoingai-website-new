# OngoingAI — Website UI kit

A marketing-landing UI kit built against the OngoingAI design system. All components read tokens from `../../colors_and_type.css` — they do not redeclare colors, fonts, or spacing.

> **Greenfield flag:** This kit is a brand-faithful *proposal*, not a recreation of shipping code (there is no production website yet). Iterate on visuals; swap copy for real.

## Open `index.html`
The demo wires every component together into a full landing page. Nav is sticky, the CTA button animates a fake install command, and the pricing cards are interactive.

## Components

| File | What |
|---|---|
| `Nav.jsx` | Sticky nav with logomark, links, and a pill-style CTA. |
| `Hero.jsx` | Display-serif hero with eyebrow chip, two CTAs, install hint. |
| `Logos.jsx` | "Used by teams shipping at" logo row (serif wordmarks). |
| `CodeDemo.jsx` | Side-by-side prompt card + terminal output. |
| `Features.jsx` | 3-column feature grid with paper / hero-orange / ink card variants. |
| `Testimonial.jsx` | Big-quote block with orange rule. |
| `Pricing.jsx` | 3-tier pricing grid with printed borders. |
| `CTA.jsx` | Full-bleed orange CTA banner. |
| `Footer.jsx` | Ink-dark footer with large display-serif sign-off. |

## Conventions followed
- Sentence case everywhere.
- No emoji in UI text.
- Buttons: primary = orange fill + 1px ink border; secondary = ghost outline; CTA pill = ink fill.
- Card variants: paper (default), printed (1px ink, no shadow), hero (orange fill, ink text, ink border).
- Icons via Lucide CDN.
