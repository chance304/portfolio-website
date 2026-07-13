# Website Revamp — Discussion & Decisions

Log of the planning conversation before any implementation work starts. No todo/task plan yet — that comes after content direction is settled.

## Current state (audit, 2026-07-13)

- **Stack:** plain static HTML/CSS/vanilla JS. No `package.json`, no build step, no framework.
- **Files:** `index.html` (434 lines), `app.js` (537 lines), `style.css` (1589 lines), `resources/me.jpeg`.
- **Hosting:** GitHub Pages (`chance304/portfolio-website`, `main` branch, root), legacy build type (not Actions-based).
- **Domain:** `shobhittripathi.com`, DNS on Google Domains/Squarespace nameservers, A-records pointed at GitHub Pages IPs (185.199.108–111.153). HTTPS cert valid to 2026-08-23.
- **Content:** single page — Hero, About, Skills, Experience, Projects, Contact, Footer. Deloitte-focused (7+ yrs, Technology Guild Guru, 17 microservices, blockchain/RAG/AI projects, 4 project case studies, certifications).
- **Known gaps:**
  - Contact form is fake — `handleFormSubmit` validates then calls `submitForm`, which only simulates success. Nothing is actually sent anywhere.
  - Footer social links (LinkedIn/GitHub/Email) are dead `href="#"` placeholders.
  - No favicon, no OG/social preview tags, no sitemap/robots.txt.
  - No CI — deploy is legacy GitHub Pages "build from branch."
  - README has no dev instructions.

## Decisions made so far

### 1. Design source: 21st.dev
Chance will pull specific designs from [21st.dev](https://21st.dev/) to implement. Confirmed via research: 21st.dev is a **shadcn/ui-based component registry** ("npm for design engineers") — components are React + Tailwind + Radix, installed via `npx shadcn add "https://21st.dev/r/..."`, which copies source code directly into the project (no npm dependency, full ownership of the code once installed). Framework-agnostic at the component level — the shadcn CLI has first-class setup for both Next.js and Vite.

### 2. Framework: Vite + React (not Next.js)
Decided against Next.js. Reasoning:
- The site is a single page with hash-anchor sections (Hero/About/Skills/Experience/Projects/Contact) — no real multi-route need that would justify Next's file-based router.
- Static export (`output: 'export'`) — the only way to run Next on static-only hosting — disables the features that would otherwise justify Next: API routes, image optimization API, SSR, ISR. Under those hosting constraints Next's entire value proposition is switched off while still carrying its config surface and version churn.
- Even considering Cloudflare Pages (see below): Cloudflare's own Next adapter (`@cloudflare/next-on-pages`) is **deprecated**; the current recommended path is the OpenNext adapter, which runs on Workers (not Pages) and restricts SSR/API routes/ISR to edge runtime. Added complexity for no benefit here.
- Vite gets the same end result (static HTML/CSS/JS) with a lighter, more direct build and no fighting against disabled framework features.

**Stack:** Vite + React + Tailwind + shadcn/ui (component source from 21st.dev) + framer-motion.

### 3. Hosting: move from GitHub Pages to Cloudflare Pages
Reasoning:
- **Pages Functions** solve the one real gap in the current site — a working contact form backend — via a plain function file (e.g. `functions/api/contact.ts`), with no framework requirement. This works on top of a plain static Vite build.
- Email delivery: MailChannels' free email-sending integration for Cloudflare Workers was **sunset August 2024**. Use **Resend** (has a free tier) from the Pages Function instead.
- Preview deployments per branch/PR for iterating on the redesign safely before it hits production.
- Comparable or better CDN performance than GitHub Pages, same free tier.
- **DNS migration is low-friction:** domain is already on Google Domains/Squarespace nameservers with a plain A/CNAME record pointed at the current host. Moving to Cloudflare Pages only requires swapping that DNS record to point at the new Cloudflare Pages project — no nameserver transfer needed.

## Not yet decided / explicitly deferred

- Actual page content/copy revamp — separate discussion, next.
- Which specific 21st.dev components/designs to pull in — Chance is sourcing these.
- No implementation task list / todo plan yet — intentionally deferred until content direction is agreed.
- Contact form provider specifics (Resend account/domain auth setup) — not started.
- Whether social links (LinkedIn/GitHub/email) get filled in as part of this pass or separately.
