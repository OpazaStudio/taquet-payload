import type { Metadata } from 'next'
import { getGlobal, getInfos, getPayloadClient } from '@/lib/payload'
import { buildMetadata, SITE } from '@/lib/seo'
import { AccueilView } from './AccueilView'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const accueil = await getGlobal('accueil')
  return buildMetadata({
    meta: accueil.meta,
    title: `${SITE.alt} · ${SITE.name}, ${SITE.tagline}`,
    description: accueil.bandeau?.accroche ?? '',
    path: '/',
    image: accueil.bandeau?.photo,
  })
}

export default async function Page() {
  const payload = await getPayloadClient()
  const [accueil, infos, cours, photos, actus] = await Promise.all([
    getGlobal('accueil'),
    getInfos(),
    payload.find({ collection: 'cours', sort: 'ordre', limit: 50, depth: 0 }),
    payload.find({ collection: 'galerie-photos', sort: 'ordre', limit: 5, depth: 1 }),
    payload.find({ collection: 'actualites', where: { publie: { equals: true } }, sort: '-date', limit: 3, depth: 1 }),
  ])
  return <AccueilView accueil={accueil} infos={infos} cours={cours.docs} photos={photos.docs} actus={actus.docs} />
}
