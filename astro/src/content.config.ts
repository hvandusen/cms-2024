import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

// Every shape below was derived by parsing all 133 files in src/pages/work,
// not from the Decap config — the config allows block types (header, code)
// that no entry actually uses, and omits nothing that entries do use.

const imageBlock = z.object({
  type: z.literal('image'),
  // Cloudinary URLs. Decap's image widget with multiple:true always writes a
  // list, even when there is one image.
  image: z.array(z.string()),
  caption: z.string().optional(),
})

const videoBlock = z.object({
  type: z.literal('video'),
  video: z.array(z.string()),
  caption: z.string().optional(),
})

const textBlock = z.object({
  type: z.literal('text'),
  text: z.string(),
})

const youtubeBlock = z.object({
  type: z.literal('youtube'),
  // Named `text` in the CMS config even though it holds a URL.
  text: z.string(),
  caption: z.string().optional(),
})

// No entry uses these two yet, but the CMS offers them in the Blocks dropdown.
// Without them here, the first time you pick one the build fails validation.
const headerBlock = z.object({
  type: z.literal('header'),
  header: z.string(),
})

const codeBlock = z.object({
  type: z.literal('code'),
  // Decap's code widget writes either a bare string or {code, lang} depending
  // on output_code_only, and this one is unconfigured — so accept both.
  code: z
    .union([z.string(), z.object({ code: z.string(), lang: z.string().optional() })])
    .optional(),
})

const block = z.discriminatedUnion('type', [
  imageBlock,
  videoBlock,
  textBlock,
  youtubeBlock,
  headerBlock,
  codeBlock,
])

export type Block = z.infer<typeof block>

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../src/pages/work' }),
  schema: z.object({
    templateKey: z.literal('work'),
    title: z.string(),
    // Drives which layout an entry gets: "Candusen page" entries are paper.js
    // sketches, everything else is a standard work page.
    type: z.enum([
      'Candusen page',
      'Drawing',
      'Website',
      'client site',
      'essay',
      'mix',
      'print',
      'software',
    ]),
    date: z.coerce.date(),
    'date-finish': z.coerce.date().optional(),

    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    desort: z.boolean().optional(),

    description: z.string().optional(),
    url: z.string().optional(),
    display_url: z.string().optional(),

    featuredimage: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    interactivity: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),

    grid_col: z.number().optional(),
    grid_row: z.number().optional(),

    price_id: z.string().optional(),
    price_test_id: z.string().optional(),

    // paper.js source, executed client-side against a canvas.
    paper_code: z.object({ code: z.string() }).optional(),

    postContent: z.array(block).optional(),
  }),
})

// One entry (src/pages/about/index.md), but routing it through a collection
// keeps it on the same glob loader as work/ rather than reaching across the
// project root with a raw import.
const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../src/pages/about' }),
  schema: z.object({
    templateKey: z.literal('about'),
    title: z.string(),
    type: z.literal('about'),
  }),
})

export const collections = { work, about }
