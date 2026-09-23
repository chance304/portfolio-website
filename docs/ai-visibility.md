# AI-visibility check (monthly)

Part of Measurement (ADR-004, [#7](https://github.com/chance304/portfolio-website/issues/7)).
The site is built to be read by AI assistants (static HTML, JSON-LD, `llms.txt`,
AI crawlers allowed in `robots.txt`). This check measures whether that's working.
Results are logged privately; only the method lives here.

## When

- **Baseline:** within a week of launch (step 9 of `docs/deployment.md`).
- **Then:** first working day of each month, and after any major content change.

## Engines

Use a logged-out or private session where possible, with no custom instructions.

1. ChatGPT (with search)
2. Claude (with web search)
3. Perplexity
4. Google (AI Overview on the results page, if shown)

## Fixed prompt set (don't reword: comparability matters)

1. Who is Shobhit Tripathi?
2. Who is Shobhit Tripathi, the engineer from Kathmandu?
3. What is Quantum Foundry, the open-source semiconductor simulator?
4. Who built Quantum Foundry?
5. What does Shobhit Tripathi work on?

## Record per engine × prompt

| Field | Values |
|---|---|
| Found | yes / partial / no / confused with someone else |
| Accurate | every stated fact matches `brand/core.md` (list any errors) |
| Cites shobhittripathi.com | yes / no |
| Cites GitHub / LinkedIn | yes / no |
| Uses the core sentence or close to it | yes / no |

## What to do with the results

- **Wrong fact** → find which public page states it, or where the engine got it; fix the source and open an issue.
- **Not found** → check Search Console and Bing indexing for the page, the robots rules, and that the page is in the sitemap.
- **Confused with someone else** → strengthen disambiguation: location, job title and `sameAs` links in the Person JSON-LD.
