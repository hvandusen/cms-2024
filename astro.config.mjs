// @ts-check
import { defineConfig } from 'astro/config'

// Content lives in src/content (see src/content.config.ts), where the CMS
// commits it. Everything in public/ is served at the site root as-is.
export default defineConfig({
  site: 'https://henryvd.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
})
