# henryvd.com

Astro site, content edited with Sveltia CMS at `/admin/`.

- `src/pages/`, `src/layouts/`, `src/components/`, `src/styles/` — the site.
- `src/content/work/*.md`, `src/content/about/index.md` — content. The CMS commits work entries here, to `main`. Schemas are in `src/content.config.ts`.
- `public/` — served at the site root as-is: `/admin` (CMS), `/img`, `/fonts`, `/emojigrid`, `_headers`.

## Develop

    npm install
    npm run dev

## Deploy

Netlify builds `main` (`npm run build` → `dist`, see `netlify.toml`). CMS commits trigger a build; media uploads are `[skip ci]`. The CMS's "Publish Changes" button fires the Netlify build hook (set once per browser in Sveltia Settings → Advanced → Deploy Hook).
