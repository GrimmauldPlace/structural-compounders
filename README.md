# Investment Framework Workbook

A single-page editorial site presenting six investor frameworks ranked by a three-axis weighting model — composite conviction scoring, eleven-step research workflow, sell discipline, position sizing, bottleneck test, and failure log.

**Version 5.4 · April 2026**

-----

## Files

- `index.html` — the full workbook as a single scrolling page
- `style.css` — editorial typography and layout
- `README.md` — this file

That’s it. No build step, no dependencies, no frameworks.

-----

## Deploy to GitHub Pages

### Option A — Dedicated repo (cleanest URL)

1. Create a new GitHub repo. Any name works, but `investment-framework` is a good one.
1. Upload `index.html`, `style.css`, and `README.md` to the repo root (or drag-and-drop via the web UI).
1. In the repo, go to **Settings → Pages**.
1. Under **Build and deployment → Source**, select **Deploy from a branch**.
1. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
1. Wait 30–60 seconds. Your site will be live at:
   `https://<your-github-username>.github.io/investment-framework/`

### Option B — User site (shortest URL)

If you create a repo named exactly `<your-username>.github.io` and push the same three files to it, the site will be served from `https://<your-username>.github.io/` with no subpath.

### Local preview

You can preview locally by just opening `index.html` in a browser — no server required. If you want a local server for cleaner testing:

```bash
cd /path/to/this/folder
python3 -m http.server 8000
# then visit http://localhost:8000
```

-----

## Editing

To update the content, edit `index.html` directly. The file is organized top-to-bottom exactly as the workbook reads:

- Masthead and philosophy
- Part I — theory, frameworks, reading list
- Part II — screeners, weighting, calculator, workflow, watchlist
- Part III — sell, sizing, cyclicality, bottleneck, quarterly check, failure log, end note

Each major section has an `id` you can link to directly — for example, `#bottleneck` or `#watchlist`.

To tweak colors, typography, or spacing, edit the CSS variables at the top of `style.css` under `:root`.

-----

## Fonts

The site loads Playfair Display, Source Serif 4, and JetBrains Mono from Google Fonts. If you want offline support, self-host these or swap them for system fonts in the CSS.

-----

## Browser support

Tested to work in current Chrome, Safari, and Firefox. Mobile layout collapses the sidebar into a top-right hamburger menu.
