import type { Metadata } from 'next'
import { getGlobal, getInfos } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { AnniversairesView } from './AnniversairesView'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('anniversaires')
  return buildMetadata({ meta: page.meta, title: page.titre, description: 'Anniversaires d’enfants à la patinoire roller Au Taquet (Aytré, La Rochelle) : table réservée en bord de piste, entrée, boisson et goûter compris.', path: '/anniversaires', image: page.photo })
}

export default async function Page() {
  const [page, infos] = await Promise.all([getGlobal('anniversaires'), getInfos()])
  return <AnniversairesView page={page} infos={infos} />
}
