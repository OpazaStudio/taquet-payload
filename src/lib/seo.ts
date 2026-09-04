import type { Metadata } from 'next'
import { getServerSideURL } from '@/utilities/getURL'
import { mediaUrl, type MediaRef } from './media'

type Meta = { title?: string | null; description?: string | null; image?: MediaRef } | null | undefined

export const SITE = {
  name: 'Au Taquet',
  alt: 'Music Dance Roller',
  tagline: 'patinoire roller couverte à La Rochelle (Aytré)',
}

const absolute = (u: string | null): string | undefined => {
  if (!u) return undefined
  return u.startsWith('http') ? u : `${getServerSideURL()}${u}`
}

export const buildMetadata = (opts: {
  meta?: Meta
  title: string
  description: string
  path: string
  image?: MediaRef
  type?: 'website' | 'article'
}): Metadata => {
  const custom = opts.meta?.title?.trim()
  const title = custom || opts.title
  const description = opts.meta?.description?.trim() || opts.description
  const img = absolute(mediaUrl(opts.meta?.image, 'og') ?? mediaUrl(opts.image, 'og') ?? mediaUrl(opts.image)) ?? `${getServerSideURL()}/opengraph.jpg`
  const url = `${getServerSideURL()}${opts.path}`
  return {
    title: custom ? { absolute: custom } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: `${SITE.name} · ${SITE.alt}`,
      locale: 'fr_FR',
      type: opts.type ?? 'website',
      images: [{ url: img, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [img] },
  }
}
