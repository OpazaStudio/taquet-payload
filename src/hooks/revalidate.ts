import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

const safeRevalidate = (paths: string[], tags: string[] = []) => {
  try {
    for (const p of paths) revalidatePath(p)
    for (const t of tags) revalidateTag(t, 'max')
    revalidateTag('sitemap', 'max')
  } catch {}
}

export const revalidateGlobal =
  (paths: string[], tags: string[] = []): GlobalAfterChangeHook =>
  ({ doc, req: { context } }) => {
    if (!context.disableRevalidate) safeRevalidate(paths, tags)
    return doc
  }

export const revalidateCollection =
  (paths: string[] | ((doc: any) => string[]), tags: string[] = []): CollectionAfterChangeHook =>
  ({ doc, req: { context } }) => {
    if (!context.disableRevalidate) safeRevalidate(typeof paths === 'function' ? paths(doc) : paths, tags)
    return doc
  }

export const revalidateCollectionDelete =
  (paths: string[] | ((doc: any) => string[]), tags: string[] = []): CollectionAfterDeleteHook =>
  ({ doc, req: { context } }) => {
    if (!context.disableRevalidate) safeRevalidate(typeof paths === 'function' ? paths(doc) : paths, tags)
    return doc
  }

export const ALL_PATHS = [
  '/',
  '/patinoire-roller-la-rochelle',
  '/cours',
  '/anniversaires',
  '/acces',
  '/contact',
  '/actualites',
  '/galerie',
  '/mentions-legales',
]
