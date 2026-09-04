import type { Metadata } from 'next'
import { RichText } from '@/components/RichText'
import { getGlobal } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export const dynamic = 'force-static'
export const revalidate = 86400

export const metadata: Metadata = { ...buildMetadata({ title: 'Mentions légales', description: 'Mentions légales du site musicdanceroller.com, patinoire roller Au Taquet.', path: '/mentions-legales' }), robots: { index: false, follow: true } }

export default async function Page() {
  const page = await getGlobal('mentions-legales')
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:py-32">
      <h1 className="font-display-tight text-[clamp(2rem,5vw,4rem)] font-black text-mirror">{page.titre}</h1>
      <RichText data={page.contenu} className="mt-8 text-chrome-100" />
    </section>
  )
}
