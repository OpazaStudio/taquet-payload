import type { Metadata } from 'next'
import { pageFacetFrom } from '@/lib/couleurs'
import { facetFor } from '@/lib/nav'
import { getApparence, getGlobal, getInfos } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { PatinoireView } from './PatinoireView'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('patinoire')
  return buildMetadata({ meta: page.meta, title: page.titre, description: 'Patinoire de roller couverte de 1000 m² à Aytré, La Rochelle : horaires, tarifs, location de rollers, règles.', path: '/patinoire-roller-la-rochelle', image: page.photo })
}

export default async function Page() {
  const [page, infos, apparence] = await Promise.all([getGlobal('patinoire'), getInfos(), getApparence()])
  return <PatinoireView page={page} infos={infos} facet={facetFor('/patinoire-roller-la-rochelle', pageFacetFrom(apparence))} />
}
