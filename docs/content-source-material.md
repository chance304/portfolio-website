# Content Source Material

Raw material gathered from Jarvis (personal knowledge base) and the NS Engineering knowledge tree, for the content-update discussion. Not copy yet — this is the evidence base to draft from.

## Headline finding: the current site is out of date

`index.html` currently frames you as **"Senior Full Stack Developer at Deloitte"** — present tense. That's no longer accurate. You left Deloitte; you're now **Founder & Operator of NS Engineering (NSEGS)**, a geotechnical services company in Kathmandu, where you've built the entire technical stack — identity/infra, ERP, a custom Frappe app, a self-hosted collaboration suite, a marketplace product, and internal AI tooling — largely solo. That's a materially different (and stronger) story than "enterprise developer at a Big 4."

## Who you are now

- **Founder & operator**, NS Engineering (NSEGS) — geotechnical services, Kathmandu, Nepal. Building the org and its entire tech stack simultaneously, largely as the sole technical operator.
- Before that: 7+ years at **Deloitte**, reaching **Technology Guild Guru** (Deloitte's highest internal blockchain certification), plus Blockchain Architect/Practitioner certs, Hyperledger Apprentice Badge, DAML Smart Contract certification. Real historical repos back this up: `hlfabric_supplychain` (Hyperledger supply-chain demo), `hl-admin` (Angular Hyperledger admin tool), `hlfabric_kafka`, `dapptoken`, `truffle_eth_class2`.
- Left Deloitte because it stopped being interesting — monotony is what drains you; you need work with a clear standard/structure to aim for, and problems worth researching properly.
- How you think: dreamer → engineer loop (imagine wide, then reality-check what's buildable); go quiet and work in isolation, then surface with answers, not half-formed questions; direct communicator, no fluff; deep researcher — pull every thread until the picture is complete, then act.
- Values: requirements/quality/standards are non-negotiable; scientific correctness over intuition at work; structure over chaos.
- Currently learning Chinese, and AI as a discipline, alongside whatever problem is in front of you.

## What you've actually built (verifiable, from real repos/sessions)

### 1. Identity & infrastructure (NS Engineering) — the least "portfolio-visible" but most technically serious work
- Stood up a real **Samba Active Directory domain controller + Keycloak SSO**, federated via LDAP — not a toy auth demo, an actual production identity backbone for a company.
- Root-caused and fixed a federation bug that meant AD↔Keycloak had likely **never worked end-to-end** (wrong LDAP hostname + untrusted self-signed cert), and issued a real internal CA via `step` CLI for LDAPS.
- Designed and deployed **origin-based OU routing**: writes from prod's WireGuard IP land in the real AD OU, everything else routes to a Test OU — so a stage/dev restore or test run can never mutate a real employee's account. Live-verified end to end (create → assign-role → offboard) through the real API.
- Found (via live testing, not code review) that the AD service account had **zero delegated write rights** and a connection-pooling strategy that silently returned false success — both root-caused and fixed, verified via `samba-tool`, not just API 200s.
- Built a **WireGuard mesh** across multiple VPS's connecting the identity stack to the ERP stack, with real CI/CD (GitHub Actions) rather than hand-applied SSH changes — deliberate move from "reactive SSH ops" to pipeline-driven infra changes.
- Built `provisioning-relay` — a durable, queued (FastAPI + RQ) microservice so a downed provisioning service never blocks or silently drops an employee-creation event; live-tested by killing the service mid-flight and confirming self-healing.
- Diagnosed and fixed a **production monitoring crash-loop**: Prometheus had been silently crash-looping for 5–13 days on two servers due to an invalid Go-template expression in alert rules — a bug that meant "monitoring was up" was false for weeks. Fixed with the correct built-in template function, verified with `promtool` against the live instance before shipping.
- Pattern worth naming as a personal engineering signature: **insisting on live verification over trusting green checkmarks** — repeatedly, "deployed successfully" and "actually works" turned out to be different claims, and real bugs (dormant for weeks/months) were only found by actually exercising the system end-to-end.

### 2. Self-hosted enterprise collaboration suite — built from scratch, "our own Office 365/Workspace"
- **Mattermost** (`ns-collab`) — internal team chat, SSO'd against the AD/Keycloak stack, running in Entry mode pinned to a specific ESR release for stability.
- **Mailcow** (`ns-mail`) — self-hosted employee email (chose self-hosted over Zoho/M365/Google Workspace deliberately, for data sovereignty and consistency with the rest of the self-hosted stack — not because it was cheaper).
- **Nextcloud + OnlyOffice Docs** (`ns-docs`) — real-time Word/Excel/PowerPoint-compatible document collaboration, chosen over Collabora specifically because NS's real workflows (calibration trackers, financial exports) are Excel-heavy and format-fidelity-sensitive.
- All three integrate with the same central identity system — a coherent internal platform, not three disconnected tools.

### 3. ERP / custom enterprise application development
- **nserp** — ERPNext (Frappe) hosting with a real 3-environment (dev/stage/prod) pipeline and CI/CD.
- **eng_lab_suite** — a custom Frappe application built for NS Engineering's material testing and calibration lab operations. This is a genuinely large piece of enterprise software:
  - Full lab workflow: Lab Project → Sample → Test → Report, calibration schedules, rate lists, billing.
  - **Org Command Center** — 17 Frappe pages across 8 organizational roles, with a shared JS commons library (cut ~300-line pages down to ~80–100 lines each).
  - **OKR system**: Org Goal → Workstream → Task, with automatic progress rollup at each tier.
  - **My Tasks** — rebuilt as real nested trees (not flat lists) across three domains, with a full audit trail piggybacked onto Frappe's native comment system.
  - **Investigation Project management** — rolls up artifacts from multiple linked Lab Projects into one unified view rather than duplicating tracking.
  - A real Playwright end-to-end test suite (11+ test cases) wired to a self-hosted CI runner.
  - Digitized an entire **ISO/IEC 17025 quality management system** for the calibration lab from a Quality Manager's raw paper handover (Quality Manual, 37 pieces of reference equipment, historical calibration certificates back to FY 2082-83, PT comparison data) — built as a 5-phase migration, each phase verified dry-run → real-run → idempotent re-run.

### 4. Products / platforms
- **Engineering Bazar** — Nepal's engineering & construction marketplace, connecting clients with NEC/NAAN-verified engineers, architects, contractors, and firms. React 19 + TypeScript + Vite + Tailwind + shadcn/ui. All 14 core user journeys built as a working prototype with a live demo mode.
- **Orbit** — NS Engineering's internal AI platform: a rule-based (deliberately non-LLM, for zero latency/cost/hallucination in demos) chatbot engine plus a standalone React hub, designed to grow into a full PM-agent orchestrator.
- **Jarvis** — your personal AI operating system: a persistent knowledge layer so every AI session has full continuity on your goals, projects, and decisions, evolving toward a fully proactive/ambient personal assistant.

### 5. Organizational / governance work (not just code)
- Drove NS Engineering's IT function from reactive "developer for hire" to a governance-driven department: a formal MOU covering the full development lifecycle, a pre-approved budget model, and a Train-the-Trainer approach — a deliberate structural response to a board that communicated over WhatsApp with undefined timelines while holding IT solely accountable.
- Designed the **Lab Incharge** role from scratch, modeled on ISO/IEC 17025 practice — a genuine quality/compliance ownership role, not a title invented to backfill an ERP gap.

### 6. Personal ventures / side projects
- **Real Nepal Co.** — curated Nepal travel journeys for travelers, React + Vite + TypeScript + Tailwind. Built with your wife and a business partner (Tsarmoire) — an actual ideation-to-build step on the travel venture.
- **Tsarmoire microsites** — café reservation system, launch site, feedback tool, manufacturing static site — shipped one-off event/business tools for a partner's café brand.
- **mssql-restore-kit** — a developer tool for restoring MSSQL `.bak` files via Docker in three commands.
- **n8n automation hub** — self-hosted workflow automation, spanning personal + NS use cases.

## Tone / personality material for an About section

- Sci-fi fan; the "dreamer → engineer" framing is real and could work as a genuine personal-brand thread (imagination first, then rigorous build).
- Explicitly research-driven: doesn't take secondary-source claims at face value — multiple documented cases of checking a claim against primary docs/live systems and finding the popular claim wrong (e.g. OnlyOffice's real service topology, MailChannels' free-tier status).
- Comfortable owning mistakes and re-reviewing his own work critically (e.g., catching his own reused SSH key, re-reviewing his own PR and finding a real gap in it).

## Content decisions (locked, 2026-07-13)

1. **Positioning**: lead with **builder first, founder second** — hands-on technical builder is the primary identity; "founder/operator of NS Engineering" is context, not the headline.
2. **No product names**: Engineering Bazar, Orbit, and Jarvis are **excluded entirely** — don't name them, don't describe them even by circumlocution as identifiable projects. Where their underlying work is worth showing, describe it purely by **stack/capability**, genericized (e.g. "a React 19 + TypeScript + Tailwind marketplace platform for verified professionals," "a rule-based conversational engine," "a persistent AI knowledge system for continuity across sessions") with no project name attached.
3. **Deloitte stays prominent** — do not minimize it. Keep it as a real, visible part of the experience narrative (7+ years, Technology Guild Guru, blockchain work), alongside the NS Engineering builder story, not overshadowed by it.

## Still open (not yet decided — need you)

1. **Confidentiality depth**: how much NS Engineering infra detail is fine at outline level ("built and hardened the identity/SSO backbone") vs. too specific for a public site (real bug counts, exact security-fix mechanics) — your call on where the line is.
2. **Hero content**: given eng bazar/orbit/jarvis are now out, which of the remaining categories (identity/infra, self-hosted collaboration suite, eng_lab_suite/ERP, governance work, personal ventures, Deloitte/blockchain) become the 2–4 flagship case studies vs. a shorter skills/experience list.
3. **Social links** (LinkedIn/GitHub/email) are currently dead placeholders — need the real URLs before this ships.
