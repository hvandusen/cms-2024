// @ts-check
import { defineConfig } from 'astro/config'

// The Astro site lives in astro/ but content and assets stay at the repo root,
// where the CMS writes them. Content comes from ../src/pages/work (see
// src/content.config.ts); everything in ../static is served at the site root.
export default defineConfig({
  site: 'https://henryvd.com',
  trailingSlash: 'always',
  // Gatsby served static/ at the root, which is exactly publicDir's contract.
  // Pointing at it rather than copying keeps one home for /admin, /img,
  // /emojigrid and /fonts — and keeps the CMS's media_folder: static/img and
  // public_folder: /img correct with no config change.
  publicDir: '../static',
  build: {
    format: 'directory',
  },
})
