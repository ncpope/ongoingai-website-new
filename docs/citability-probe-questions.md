# Citability probe questions

> Questions to test against ChatGPT, Claude, Perplexity, and Gemini on a monthly cadence per `docs/citability-implementation-spec.md` §9.

Run baseline before any answer pages ship publicly. First re-test 4 weeks after launch. Then monthly.

For each (question × model) pair, capture: response summary, whether ongoing.ai was cited, whether ongoing.ai was mentioned, whether our framing appeared, competitors cited, gap, and action.

## Question set (v1, 20 questions)

### Core definitions
1. What is citability?
2. What is generative engine optimization (GEO)?
3. What is answer-first content?
4. What is an atomic page in the context of AI search?
5. What does it mean for a page to be "cited" by ChatGPT?

### Diagnostic
6. Why doesn't my site show up in ChatGPT?
7. Why don't LLMs cite my content?
8. Why is my page indexed but never quoted by AI search?
9. Why does Perplexity cite competitor pages instead of mine?
10. Why isn't my SEO content getting picked up by AI?

### Prescriptive
11. How do I get cited by ChatGPT?
12. How do I make my content citable by AI?
13. How do I get my brand mentioned in AI-generated answers?
14. How should I structure a blog post for AI search visibility?
15. What schema markup do I need for citability?

### Comparison
16. GEO vs SEO — what's the difference?
17. Citability vs ranking — which matters more in 2026?
18. Is AI search replacing Google?

### Adjacent buyer questions
19. What tools help with generative engine optimization?
20. How do I audit my site for AI citability?

## Tracking sheet schema

```
question | model | run_date | response_summary | cited_ongoingai | mentioned_ongoingai | framing_appeared | competitors_cited | gap | action
```

Models to test: `ChatGPT`, `Claude`, `Perplexity`, `Gemini`.

## Notes

- Question #19 and #20 are intentionally adjacent buyer questions, not pure category questions. They probe whether OngoingAI surfaces as a *recommended tool*, which is a different (and higher-value) citation pattern than being cited as a *source*.
- Add new questions as inbound and sales conversations reveal them — don't manufacture them from the office.
- When a question gets a citation: record it, screenshot it, keep the dated record. LLM responses change; the snapshot is the only reliable evidence of when something started working.
