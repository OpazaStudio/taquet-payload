import type { Metadata } from 'next'
import { Img } from '@/components/Img'
import { PageHero } from '@/components/PageHero'
import { getPayloadClient } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export const dynamic = 'force-static'
export const revalidate = 86400

export const metadata: Metadata = buildMetadata({ title: 'Galerie photos', description: 'La patinoire roller Au Taquet en photos : la piste, la boule à facettes, les cours, les soirées et les anniversaires.', path: '/galerie' })

const SPANS = ['sm:col-span-2 sm:row-span-2', '', '', '', 'sm:col-span-2', '', '', 'sm:row-span-2', '', '']

export default async function Page() {
  const payload = await getPayloadClient()
  const photos = await payload.find({ collection: 'galerie-photos', sort: 'ordre', limit: 200, depth: 1 })
  return (
    <>
      <PageHero titre="La salle en photos" facet="aqua">
        <p>La piste, la boule, les cours, les soirées. Pour le reste, il faut venir.</p>
      </PageHero>
      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:py-32">
        {photos.docs.length === 0 ? (
          <p className="tile tile-chrome max-w-[60ch] p-6 text-chrome-100">Les photos arrivent bientôt.</p>
        ) : (
          <ul className="grid grid-cols-2 gap-px bg-chrome-700 sm:auto-rows-[200px] sm:grid-cols-4 lg:auto-rows-[240px]">
            {photos.docs.map((p, i) => (
              <li key={p.id} className={`tile relative aspect-square bg-chrome-900 sm:aspect-auto ${SPANS[i % SPANS.length]}`}>
                <Img media={p.image} alt={p.legende} fill sizes="(min-width:1024px) 25vw, 50vw" />
                <span className="absolute inset-x-0 bottom-0 bg-chrome-950/85 px-3 py-2 text-[0.8125rem] text-mirror">{p.legende}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
