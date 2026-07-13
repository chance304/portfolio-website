# portfolio-website

Shobhit Tripathi's personal site — [shobhittripathi.com](https://shobhittripathi.com).

## Stack

Vite + React + TypeScript + Tailwind CSS 4 + shadcn/ui + framer-motion. Hosted on Cloudflare Pages, with the contact form backed by a Cloudflare Pages Function (`functions/api/contact.ts`) using Resend.

## Development

```bash
npm install
npm run dev
```

```bash
npm run build    # type-check + production build to dist/
npm run preview  # preview the production build locally
```

## Project docs

See `docs/`:
- `revamp-decisions.md` — stack and hosting decisions, with reasoning
- `content-source-material.md` — content research and locked positioning decisions
- `deployment.md` — manual Cloudflare Pages / Resend / DNS setup steps

## Legacy

`legacy/` holds the previous static HTML/CSS/vanilla-JS site, kept for reference.
