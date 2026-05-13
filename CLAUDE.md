# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

A single-page editorial site presenting the "Investment Framework Workbook" by Will Dowd (currently v5.4, April 2026). It is a pure static site — no build step, no package manager, no frameworks, no dependencies. The repo is intended for GitHub Pages deployment.

Files are limited to:
- `index.html` — the entire workbook as one scrolling document (~1,270 lines)
- `style.css` — editorial typography and layout (~1,130 lines)
- `README.md` — deployment + editing notes

## Local preview

Open `index.html` directly in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

There are no tests, no linters, and no build commands. Do not introduce a toolchain (npm, bundlers, preprocessors, frameworks) unless the user explicitly asks — the "no build step" property is a design constraint called out in the README.

## Architecture

### Document structure (`index.html`)

The file is organized top-to-bottom as the workbook reads, with clearly delimited section comments (`<!-- ============================== PART I ============================== -->`) that mirror the table of contents:

- Masthead → Philosophy → Part I (theory) → Part II (practice) → Part III (discipline layer) → Colophon

Each major section uses a stable `id` (e.g. `#bottleneck`, `#watchlist`, `#buffett`) that is referenced by the sidebar TOC and may be linked externally. Preserve these IDs when editing — renaming one silently breaks the TOC highlight and any external links.

A small inline `<script>` at the bottom of `index.html` handles three things:
1. Mobile TOC toggle (hamburger button).
2. Auto-closing the TOC on link click below 1024px width.
3. An `IntersectionObserver` that adds `.current` to the TOC link of the section currently in view. For a new section to participate in TOC highlighting, it must (a) live inside `main`, (b) be a `section`, `article`, or `.part-divider` with an `id`, and (c) have a matching `a[href="#that-id"]` inside `#toc`.

### Styling (`style.css`)

- Design tokens live in `:root` at the top: palette (`--ink`, `--paper`, `--accent`, `--navy`, …), type families (`--display` Playfair Display, `--body` Source Serif 4, `--mono` JetBrains Mono), a spacing scale (`--s-1` … `--s-7`), and layout widths (`--toc-w`, `--max-body`). Tweak these rather than hardcoding values further down.
- The stylesheet is grouped into clearly banner-commented sections (`/* ===== SECTION ===== */`) that roughly correspond to document regions (TOC, masthead, frameworks, screeners, weighting, calculator, workflow, scorecard, bottleneck, deterioration, workflow list, colophon, print). When adding new component CSS, match this pattern and keep it co-located with related components rather than appending to the bottom.
- A `@media print` block at the end of the file makes the workbook printable; new layout-affecting rules should be sanity-checked against it (e.g. they shouldn't reintroduce the TOC or constrain `main.content` width on paper).

### Fonts

Google Fonts (Playfair Display, Source Serif 4, JetBrains Mono) are loaded via `<link>` in the `<head>`. If you change font usage, update both the Google Fonts URL and the `--display` / `--body` / `--mono` CSS variables.

## Editing conventions

- Content lives in `index.html`. Treat the section comment banners as the file's outline — keep them when adding/removing sections so the document remains navigable.
- The version string appears in three places that must stay in sync: the `<title>`/masthead in `index.html`, the TOC header (`.toc-version`), and the README. When bumping versions, update all three.
- The site is fully static and renders without JavaScript except for TOC interactivity. Don't make content depend on JS execution.
- Mobile layout collapses the sidebar at <1024px; verify changes at both desktop and mobile widths.
