import type { Metadata } from 'next'
import { getGlobal, getInfos } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { PatinoireView } from './PatinoireView'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('patinoire')
  return buildMetadata({ meta: page.meta, title: page.titre, description: 'Patinoire de roller couverte de 1000 m² à Aytré, La Rochelle : horaires, tarifs, location de rollers, règles.', path: '/patinoire-roller-la-rochelle', image: page.photo })
}

export default async function Page() {
  const [page, infos] = await Promise.all([getGlobal('patinoire'), getInfos()])
  return <PatinoireView page={page} infos={infos} />
}
