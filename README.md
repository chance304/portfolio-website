# portfolio-website

Shobhit Tripathi's personal site: [shobhittripathi.com](https://shobhittripathi.com).

## Stack

Next.js 16 (App Router) with **static export**: every route is prerendered to
plain HTML at build time (decided in ADR-002, [#5](https://github.com/chance304/portfolio-website/issues/5)),
so the site is readable by search engines and by AI crawlers that don't run
JavaScript. TypeScript, Tailwind CSS 4, shadcn/ui, framer-motion, and Geist via `next/font`.

The hosting target is decided in ADR-003 ([#6](https://github.com/chance304/portfolio-website/issues/6)).
The contact form posts to `/api/contact`, served in production by the host's
function runtime (`functions/api/contact.ts`).

## Develop

Requires Node ≥ 20.9 (see `.nvmrc`). No cloud accounts or credentials needed.

```bash
npm install
npm run dev          # site on http://localhost:3000 plus a local contact-form mock
```

`npm run dev` starts `next dev` and `scripts/contact-mock.mjs` together. The mock
implements the same contract as production (`src/lib/contact/validate.ts`) and
prints accepted messages to the terminal instead of emailing them.

## Build and test

```bash
npm run build        # static site → out/
npm start            # serve out/ locally
npm run lint         # oxlint
npm run typecheck    # tsc
npm run test:unit    # validator and mock unit tests (node:test)
npm test             # Playwright: SEO, JSON-LD, no-JS, navigation, contact, URL stability
npx -y @lhci/cli@0.15 autorun   # Lighthouse budgets: every category ≥ 95
```

`npm test` and Lighthouse run against the built `out/`, served by
`scripts/serve-out.mjs` with production-like behaviour (compression, caching, 404s).
CI runs all of the above on every pull request (`.github/workflows/ci.yml`).

## Layout

| Path | What |
|---|---|
| `src/app/` | Routes: `/`, `/quantum-foundry/`, `sitemap.xml`, `robots.txt`, 404 |
| `src/components/` | Page sections and shadcn/ui components |
| `src/lib/seo/` | Site config, page-metadata helper, JSON-LD generators, route list |
| `src/lib/contact/` | Contact-form contract shared by the form, host function, mock and tests |
| `src/content/` | Hand-authored long-form content (Quantum Foundry write-up) |
| `brand/` | Brand core, bios, design tokens, monogram, OG template ([brand/README.md](brand/README.md)) |
| `functions/` | Production contact endpoint for the static host |
| `tests/` | `unit/` (node:test) and `e2e/` (Playwright) |

## Adding a page

1. Add `src/app/<slug>/page.tsx` with `export const metadata = generatePageMetadata({...})` and JSON-LD via `<JsonLd>`.
2. Add the route to `src/lib/seo/routes.ts`. The sitemap and the SEO/no-JS/URL-stability tests pick it up automatically.
3. Add an OG card entry to `brand/og/pages.json` and run `npm run brand:assets`.
