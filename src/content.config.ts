import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SERVICE_IDS } from './data/services';
import { FOCUS_IDS } from './data/giving';

// Case studies: one Markdown file per project in src/content/work.
// The file name becomes the URL: hireflow.md → /work/hireflow/
const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string().max(240),
      context: z.enum(['employment', 'internship', 'personal', 'research', 'client']),
      /** Shown on cards, e.g. "Internship · CodeSoft". */
      contextLabel: z.string(),
      role: z.string(),
      period: z.string().optional(),
      stack: z.array(z.string()).min(1),
      metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      services: z.array(z.enum(SERVICE_IDS)).default([]),
      badge: z.string().optional(),
      pdf: z.url().optional(),
      pdfLabel: z.string().default('Full case study (PDF)'),
      repo: z.url().optional(),
      live: z.url().optional(),
      cover: image().optional(),
      featured: z.boolean().default(false),
      order: z.number().int(),
      draft: z.boolean().default(false),
    }),
});

// Giving Back drives: one Markdown file per drive in src/content/drives.
// Put the drive's photos next to its file and list them under `photos`.
const drives = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/drives' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      status: z.enum(['planned', 'done']).default('done'),
      place: z.string(),
      focus: z.enum(FOCUS_IDS),
      summary: z.string(),
      volunteers: z.number().int().positive().optional(),
      /** What was achieved, e.g. "40 blankets" or "25 water bowls". */
      result: z.string().optional(),
      photos: z
        .array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() }))
        .default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { work, drives };
