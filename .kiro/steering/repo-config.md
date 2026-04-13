---
inclusion: auto
---

# Repository Configuration

## GitHub Pages

This repo publishes static HTML prototypes via GitHub Pages from the `docs/` folder on the main branch.

- All publishable HTML files live in `docs/`.
- `docs/index.html` is the landing page that links to each prototype.
- When adding a new HTML prototype, place it in `docs/` and add a link to it in `docs/index.html`.

## Folder Structure

- `docs/` — GitHub Pages root. Contains self-contained HTML prototypes (no build step).
- `sailwind-starter-main/` — React + Vite + Tailwind project (separate from the static prototypes).
- `Aurora MCP/` — MCP server project for Aurora.
- `Case Management Studio/` — Screen designs and analysis docs for CMS.
- Root `.md` files — Feature analysis and UX design documents.

## HTML Prototype Conventions

- Each HTML file is fully self-contained (inline CSS/JS, CDN-hosted fonts and icons).
- Shared design tokens: font `Manrope`, primary color `#2322F0`, sidebar background `#0A0A48`.
- External dependencies loaded via CDN: Font Awesome 6.5.1, Google Fonts (Manrope).
- No cross-file references between prototypes — each page stands alone.
