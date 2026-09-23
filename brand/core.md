# Brand core

The single source for how Shobhit Tripathi is described anywhere public.
Decided in [ADR-001 (#4)](https://github.com/chance304/portfolio-website/issues/4).
Every profile, bio, résumé and page is a **facet** of this file: facets change the
order and emphasis of the pillars, never the core sentence.

## Core sentence

> **Engineering leader who builds rigorous, AI-native platforms end to end.**

Considered alternatives, kept for the record:

| Option | Why not chosen |
|---|---|
| Engineer who builds production platforms from infrastructure to research-grade software | Accurate, but drops the leadership signal |
| Platform and AI engineering leader, from identity infrastructure to open-source research software | Too long to use verbatim in headlines |
| Builder of rigorous systems: platforms, AI tooling and research software | Reads as a portfolio list, not an identity |

## Current status line

> **CTO / IT Director, NS Engineering**

The existing public title. No other status is published.

## Proof pillars

Default order. Each pillar lists the only proof points that may be used publicly;
every one traces to the evidence bank (kept privately).

| # | Pillar | Proof points (public-safe) |
|---|---|---|
| 1 | **Platform & infrastructure** | Designed and runs a company's entire technology stack as its sole engineer: identity and single sign-on, private networking across environments, CI/CD from zero, production monitoring, and ERP. At Deloitte, owned the Kubernetes/Helm layer of a 99.9%-uptime microservices platform. |
| 2 | **AI-native engineering** | AI-assisted engineering (agentic tooling) is the default way the stack is built and maintained, not an experiment. Hands-on retrieval (RAG) and vector-search systems. |
| 3 | **Research rigor** | Quantum Foundry: an open-source (Apache-2.0) multi-physics semiconductor simulator whose core rule is never to report a number a solver didn't produce. IBM Qiskit Global Summer School. |
| 4 | **Enterprise delivery** | 7+ years at Deloitte (11+ years in total). Technology Guild Guru, Deloitte's highest internal recognition for blockchain expertise. Led the team that built a Deloitte-wide inter-firm agreement system. Scrum Master and client-facing technical lead. Mentored 50+ engineers. |

## Audience facets

| Audience | Pillar order | Lead with |
|---|---|---|
| **Default** (site, GitHub, general) | 1 · 2 · 3 · 4 | the core sentence |
| **Leadership roles** (CTO, head of engineering) | 4 · 1 · 2 · 3 | owning technology end to end for a company, plus the Deloitte delivery record |
| **Platform / infrastructure roles** | 1 · 2 · 4 · 3 | the stack built solo, the Kubernetes platform |
| **AI engineering roles** | 2 · 1 · 3 · 4 | the AI-native way of building, plus retrieval systems |
| **Research supervisors** | 3 · 2 · 1 · 4 | Quantum Foundry and its rigor rule |
| **Freelance clients** | 1 · 2 · 4 · 3 | shipped, production-grade delivery |

## Voice

- **Direct.** Short sentences, no filler, no superlatives ("world-class", "passionate").
- **Evidence over adjectives.** Say what was built and what it does; let the reader judge.
- **Honest about limits.** State what isn't finished yet. It's the same rule as Quantum Foundry's.
- **Systems and scope only for company work.** No named incidents, bugs, audit findings or client-internal detail ([ADR-006, #9](https://github.com/chance304/portfolio-website/issues/9)).
- **No phone number anywhere public** ([ADR-005, #8](https://github.com/chance304/portfolio-website/issues/8)).
- Internal product and codebase names aren't used in public copy. Describe what the system does instead.

## Where each facet lives

| Surface | Facet | Source |
|---|---|---|
| shobhittripathi.com | Default | this file + `brand/bios.md` |
| GitHub profile README | Default | `brand/bios.md` (150-word bio) |
| Professional network profile | Default headline, Leadership-ordered About | `brand/bios.md` |
| Résumé variants | per role type | single résumé source (kept privately) |
| Freelance marketplaces | Platform or AI | `brand/bios.md` headlines |
