"""Render brand raster assets from their sources (run from the repo root):

    python3 brand/render_assets.py

Monogram (brand/assets/monogram.svg) → public/favicon.svg, favicon-16/32.png,
apple-touch-icon.png (180), icon-192/512.png.
OG template (brand/og/template.html) → public/og/<slug>.png (1200×630) for every
entry in brand/og/pages.json. Needs Python Playwright with Chromium installed.
"""
import json, pathlib, shutil, urllib.parse
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
BRAND, PUBLIC = ROOT / "brand", ROOT / "public"
MONO = BRAND / "assets" / "monogram.svg"
ICONS = {"favicon-16.png": 16, "favicon-32.png": 32, "apple-touch-icon.png": 180, "icon-192.png": 192, "icon-512.png": 512}

def main():
    PUBLIC.mkdir(exist_ok=True)
    shutil.copyfile(MONO, PUBLIC / "favicon.svg")
    with sync_playwright() as p:
        b = p.chromium.launch()
        for name, size in ICONS.items():
            pg = b.new_page(viewport={"width": size, "height": size})
            # Navigate to the SVG itself: a root <svg> with only a viewBox fills the viewport.
            # (An <img> on a set_content page can't load file:// URLs.)
            pg.goto(MONO.as_uri())
            pg.screenshot(path=str(PUBLIC / name), omit_background=True)
            pg.close()
            print("icon", name)
        pages = json.loads((BRAND / "og" / "pages.json").read_text())
        (PUBLIC / "og").mkdir(exist_ok=True)
        for slug, meta in pages.items():
            q = urllib.parse.urlencode({"title": meta["title"], "subtitle": meta["subtitle"], "kicker": meta.get("kicker", "")})
            pg = b.new_page(viewport={"width": 1200, "height": 630})
            pg.goto((BRAND / "og" / "template.html").as_uri() + "?" + q)
            pg.wait_for_timeout(600)
            pg.screenshot(path=str(PUBLIC / "og" / f"{slug}.png"))
            pg.close()
            print("og", slug)
        b.close()

if __name__ == "__main__":
    main()
