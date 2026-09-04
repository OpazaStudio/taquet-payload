import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { JsonLd } from '@/components/JsonLd'
import { getPayloadClient } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { mediaUrl } from '@/lib/media'
import { getServerSideURL } from '@/utilities/getURL'
import { ActualiteView } from './ActualiteView'

export const dynamic = 'force-static'
export const revalidate = 86400
export const dynamicParams = true

const getActu = async (slug: string) => {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'actualites', where: { slug: { equals: slug }, publie: { equals: true } }, limit: 1, depth: 1 })
  return res.docs[0] ?? null
}

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const res = await payload.find({ collection: 'actualites', where: { publie: { equals: true } }, limit: 500, select: { slug: true } })
  return res.docs.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const actu = await getActu(slug)
  if (!actu) return {}
  return buildMetadata({ meta: actu.meta, title: actu.titre, description: actu.resume, path: `/actualites/${actu.slug}`, image: actu.image, type: 'article' })
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const actu = await getActu(slug)
  if (!actu) notFound()
  const img = mediaUrl(actu.image)
  return (
    <>
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'NewsArticle', headline: actu.titre, description: actu.resume, datePublished: actu.date,
        dateModified: actu.updatedAt, ...(img ? { image: img.startsWith('http') ? img : `${getServerSideURL()}${img}` } : {}),
        author: { '@type': 'Organization', name: 'Au Taquet' }, publisher: { '@type': 'Organization', name: 'Au Taquet' },
      }} />
      <JsonLd data={{
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: getServerSideURL() },
          { '@type': 'ListItem', position: 2, name: 'Actualités', item: `${getServerSideURL()}/actualites` },
          { '@type': 'ListItem', position: 3, name: actu.titre },
        ],
      }} />
      <div className="mx-auto max-w-[1440px] px-4 pt-8 sm:px-6">
        <Link href="/actualites" className="inline-flex items-center gap-2 text-[0.9375rem] text-chrome-300 hover:text-mirror"><ArrowLeft className="size-4" aria-hidden="true" />Toutes les actualités</Link>
      </div>
      <ActualiteView actu={actu} />
    </>
  )
}
