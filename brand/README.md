# Brand

The source of truth for how Shobhit Tripathi presents publicly. Built in
**M0 · Brand Foundation** ([#10](https://github.com/chance304/portfolio-website/issues/10)).

| File | What it is |
|---|---|
| [`core.md`](core.md) | Core sentence, status line, proof pillars, audience facets, voice rules (ADR-001 [#4](https://github.com/chance304/portfolio-website/issues/4)) |
| [`bios.md`](bios.md) | Bios at 50/150/300 words and headline variants with verified character counts |
| [`tokens.css`](tokens.css) / [`tokens.json`](tokens.json) | Colour, type and radius tokens (light/dark, WCAG AA checked) |
| [`assets/monogram.svg`](assets/monogram.svg) | The ST monogram |
| [`og/`](og/) | 1200×630 Open Graph template and per-page config |
| [`render_assets.py`](render_assets.py) | Regenerates favicons, app icons and OG images into `public/` |

## Regenerating assets

```bash
python3 brand/render_assets.py   # needs Python Playwright + Chromium
```

Add a page's OG card by adding an entry to `og/pages.json` and re-running.

## Rules

- Change wording in `core.md` / `bios.md` first; every other surface copies from here.
- Every public claim must be verifiable. The evidence is kept privately.
- Company work stays at system/scope level (ADR-006 [#9](https://github.com/chance304/portfolio-website/issues/9)).
- No phone number anywhere public (ADR-005 [#8](https://github.com/chance304/portfolio-website/issues/8)).
