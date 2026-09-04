import type { Metadata } from 'next'
import { getGlobal, getInfos, getPayloadClient } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'
import { CoursView } from './CoursView'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  const page = await getGlobal('page-cours')
  return buildMetadata({ meta: page.meta, title: page.titre, description: 'Cours de roller, roller dance, zumba, K-pop, salsa, rock et jump dance à la patinoire Au Taquet, Aytré, La Rochelle.', path: '/cours', image: page.photo })
}

export default async function Page() {
  const payload = await getPayloadClient()
  const [page, infos, cours] = await Promise.all([getGlobal('page-cours'), getInfos(), payload.find({ collection: 'cours', sort: 'ordre', limit: 50, depth: 1 })])
  return <CoursView page={page} infos={infos} cours={cours.docs} />
}
