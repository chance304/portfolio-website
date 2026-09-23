# Deployment — Cloudflare Pages

Manual steps needed from Chance before the contact form and live hosting actually work. Nothing here has been done automatically — no Cloudflare account changes, no DNS changes, no secrets created.

## 1. Connect the repo to Cloudflare Pages

- Cloudflare dashboard → Pages → create project → connect `chance304/portfolio-website`, branch `main` (after this branch merges).
- Build command: `npm run build`
- Build output directory: `out` (Next.js static export)
- `functions/api/contact.ts` is picked up automatically from the repo root — no extra config needed for that.

## 2. Contact form — Resend setup

- Create a Resend account (free tier: 100 emails/day / 3,000/month at time of writing) and verify a sending domain (or use their shared domain for testing).
- Set these as Cloudflare Pages **environment variables / secrets** (Pages project → Settings → Environment variables):
  - `RESEND_API_KEY` — from Resend dashboard
  - `CONTACT_FROM_EMAIL` — the verified sending address (e.g. `contact@shobhittripathi.com`)
  - `CONTACT_TO_EMAIL` — where you want messages delivered (your real inbox)
- Per the standing rule: flag any of these the moment they're created — name, purpose, and where they live, not the values.

## 3. DNS cutover (only when ready to go live)

- Domain `shobhittripathi.com` is currently on Google Domains/Squarespace nameservers with A-records pointed at GitHub Pages.
- To move to Cloudflare Pages: in the Pages project, add the custom domain, then update the DNS record at the registrar to the CNAME target Cloudflare gives you. No nameserver transfer needed.
- Don't do this until the Pages project is confirmed working on its `*.pages.dev` URL first.

## 4. GitHub Pages teardown (after cutover confirmed working)

- Once Cloudflare Pages is serving the site correctly on the real domain, disable GitHub Pages on this repo (Settings → Pages → disable) to avoid two hosts fighting over the same domain.
