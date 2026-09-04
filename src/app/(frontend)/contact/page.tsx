import type { Metadata } from 'next'
import { getGlobal, getInfos } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { ContactView } from './ContactView'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('contact')
  return buildMetadata({ meta: page.meta, title: page.titre, description: 'Contactez la patinoire roller Au Taquet à Aytré (La Rochelle) : téléphone, formulaire, réservation d’anniversaires et privatisation.', path: '/contact', image: page.photo })
}

export default async function Page() {
  const [page, infos] = await Promise.all([getGlobal('contact'), getInfos()])
  return <ContactView page={page} infos={infos} />
}
