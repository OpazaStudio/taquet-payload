import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'
import { getServerSideURL } from '@/utilities/getURL'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getServerSideURL()
  const payload = await getPayloadClient()
  const actus = await payload.find({ collection: 'actualites', where: { publie: { equals: true } }, limit: 500, select: { slug: true, updatedAt: true } })
  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/patinoire-roller-la-rochelle`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/cours`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/anniversaires`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/acces`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/contact`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${base}/actualites`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${base}/galerie`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${base}/mentions-legales`, changeFrequency: 'yearly', priority: 0.1 },
  ]
  for (const a of actus.docs) {
    pages.push({ url: `${base}/actualites/${a.slug}`, lastModified: a.updatedAt ?? undefined, changeFrequency: 'monthly', priority: 0.5 })
  }
  return pages
}
