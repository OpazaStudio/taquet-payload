import type { Metadata } from 'next'
import { getGlobal, getInfos } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { AccesView } from './AccesView'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('acces')
  return buildMetadata({ meta: page.meta, title: page.titre, description: 'Adresse, plan et itinéraires pour venir à la patinoire roller Au Taquet, zone de Belle Aire à Aytré, près de La Rochelle.', path: '/acces', image: page.photo })
}

export default async function Page() {
  const [page, infos] = await Promise.all([getGlobal('acces'), getInfos()])
  return <AccesView page={page} infos={infos} />
}
