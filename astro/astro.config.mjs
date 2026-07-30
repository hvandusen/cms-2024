// @ts-check
import { defineConfig } from 'astro/config'

// The Astro site lives in astro/ while the Gatsby site still owns the repo root,
// so both can build from the same markdown until the cutover. Content is read
// from ../src/pages/work — see src/content.config.ts.
export default defineConfig({
  site: 'https://henryvd.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
})
