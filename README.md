# henryvd.com

Astro site in `astro/`, content edited with Sveltia CMS at `/admin/`.

- `astro/` — the site (pages, layouts, components, styles). Content schemas are in `astro/src/content.config.ts`.
- `src/pages/work/*.md`, `src/pages/about/index.md` — content. The CMS commits work entries here, to `main`.
- `static/` — served at the site root as-is (Astro's `publicDir`): `/admin`, `/img`, `/fonts`, `/emojigrid`, `_headers`.

## Develop

    cd astro
    npm install
    npm run dev

## Deploy

Netlify builds `main` from `astro/` (`npm run build` → `astro/dist`, see `netlify.toml`). CMS commits trigger a build; media uploads are `[skip ci]`. The CMS's "Publish Changes" button fires the Netlify build hook (set once per browser in Sveltia Settings → Advanced → Deploy Hook).
