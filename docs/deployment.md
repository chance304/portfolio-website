# Deployment runbook: Cloudflare Pages

Decided in ADR-003 ([#6](https://github.com/chance304/portfolio-website/issues/6)) and
ADR-004 ([#7](https://github.com/chance304/portfolio-website/issues/7)). Steps marked
**(owner)** need account access. Everything else is already in the repo
(`wrangler.toml`, `public/_headers`, `functions/api/contact.ts`, CI).

> **Correction to the July plan:** an *apex* domain (`shobhittripathi.com`) on
> Cloudflare Pages requires the domain's **nameservers to move to Cloudflare**.
> A plain CNAME only works for subdomains
> ([Cloudflare docs](https://developers.cloudflare.com/pages/configuration/custom-domains/)).
> Moving DNS also unlocks free **Email Routing** for the professional contact
> address from ADR-005.

## 0. Before anything: record current DNS (owner, 5 min)

Export or screenshot every record at the current DNS provider (Squarespace):
A/AAAA, CNAME, MX, TXT (SPF/DKIM/verification). Cloudflare's import usually
finds them, but this list is the rollback reference.

## 1. Create the Pages project (owner, 10 min)

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → `chance304/portfolio-website`.
2. Production branch: **`website-revamp`**. Not `main`: GitHub Pages still serves the old site from `main`'s root, and `main` must stay untouched until after cutover, so it remains the rollback.
3. Build command: `npm run build` · Output directory: `out` · Environment variable `NODE_VERSION=22`.
4. Every PR now gets a preview URL (`<hash>.portfolio-website.pages.dev`).

## 2. Contact endpoint (owner, 15 min)

1. **KV for rate limiting:** `npx wrangler kv namespace create CONTACT_RATE_LIMIT`, paste the id into `wrangler.toml` and **uncomment** the `[[kv_namespaces]]` block, then commit. (Or bind a namespace named `CONTACT_RATE_LIMIT` in *Pages → Settings → Bindings*.)
2. **Resend:** create an account, add and verify the domain `shobhittripathi.com` (it gives SPF/DKIM records; add them in Cloudflare DNS after step 4, or at the current provider before).
3. **Secrets** in *Pages → Settings → Variables and Secrets* (Production and Preview):
   - `RESEND_API_KEY`: from Resend
   - `CONTACT_FROM_EMAIL`: e.g. `Portfolio <contact@shobhittripathi.com>` (verified domain)
   - `CONTACT_TO_EMAIL`: the inbox that should receive messages

   Per the standing rule, flag each secret's name, purpose and location when you create it. Never the value.

## 3. Analytics (owner, 5 min)

*Cloudflare → Analytics & Logs → Web Analytics → Add site* → copy the **token** →
add `NEXT_PUBLIC_CF_BEACON_TOKEN` as a Pages **build** variable. The beacon renders only
when the token is set (`src/components/Analytics.tsx`).

## 4. Move DNS to Cloudflare (owner, 30 min + propagation)

1. Cloudflare → **Add a domain** → `shobhittripathi.com` → Free plan. Check the imported records against step 0.
2. At Squarespace Domains, replace the nameservers with the two Cloudflare gives you. Propagation: minutes to 24 h.
3. Until cutover, keep the existing GitHub Pages A records (185.199.108–111.153) so the old site keeps serving.

## 5. Professional email address (owner, 10 min): ADR-005

Cloudflare → **Email → Email Routing** → enable → route `hello@shobhittripathi.com`
(or your choice) → your inbox. Then replace the personal address on public
profiles (GitHub profile README) with the alias.

## 6. Cutover

The old site keeps serving from GitHub Pages (`main`) until the domain moves.
**Don't merge into `main` before step 6.4**: GitHub Pages would start serving the
Next.js source instead of the old site.

1. Check the Pages production URL (built from `website-revamp`): `BASE_URL=https://portfolio-website.pages.dev npm run smoke`.
2. **(owner)** Pages → **Custom domains** → add `shobhittripathi.com` and `www.shobhittripathi.com`. Cloudflare replaces the GitHub Pages A records with the Pages record.
3. After DNS updates: `BASE_URL=https://shobhittripathi.com npm run smoke`.
4. After 48 h stable: merge `website-revamp` → `main` via PR, switch the Pages production branch to `main`, and make the CI checks required on `main`.

## 7. Rollback (≤ 30 minutes)

If the smoke tests fail after cutover:

1. Pages → Custom domains → **remove** `shobhittripathi.com`.
2. Cloudflare DNS → re-add the four GitHub Pages A records (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`) and the `www` CNAME to `chance304.github.io`.
3. GitHub Pages is still enabled and `main` still holds the old site (step 6.4 hasn't run), so the old site serves again once DNS updates.

## 8. Teardown (after step 6.4)

Repo → Settings → Pages → disable GitHub Pages. The `CNAME` file from the old site is no longer needed.

## 9. Post-launch

- Search Console (domain property, DNS TXT in Cloudflare) and Bing Webmaster Tools; submit `https://shobhittripathi.com/sitemap.xml`.
- Google Rich Results Test on `/` and `/quantum-foundry/`.
- First AI-visibility check with `docs/ai-visibility.md`.
