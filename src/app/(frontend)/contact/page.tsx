import type { Metadata } from 'next'
import { pageFacetFrom } from '@/lib/couleurs'
import { facetFor } from '@/lib/nav'
import { getApparence, getGlobal, getInfos } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { ContactView } from './ContactView'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('contact')
  return buildMetadata({ meta: page.meta, title: page.titre, description: 'Contactez la patinoire roller Au Taquet à Aytré (La Rochelle) : téléphone, Facebook, Instagram, réservation d’anniversaires et privatisation.', path: '/contact', image: page.photo })
}

export default async function Page() {
  const [page, infos, apparence] = await Promise.all([getGlobal('contact'), getInfos(), getApparence()])
  return <ContactView page={page} infos={infos} facet={facetFor('/contact', pageFacetFrom(apparence))} />
}
