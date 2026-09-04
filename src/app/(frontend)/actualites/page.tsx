import type { Metadata } from 'next'
import Link from 'next/link'
import { Img } from '@/components/Img'
import { PageHero } from '@/components/PageHero'
import { dateLongue } from '@/lib/format'
import { getPayloadClient } from '@/lib/payload'
import { buildMetadata } from '@/lib/seo'

export const dynamic = 'force-static'
export const revalidate = 86400

export const metadata: Metadata = buildMetadata({ title: 'Actualités', description: 'Soirées, événements et informations de la patinoire roller Au Taquet à Aytré, La Rochelle.', path: '/actualites' })

export default async function Page() {
  const payload = await getPayloadClient()
  const actus = await payload.find({ collection: 'actualites', where: { publie: { equals: true } }, sort: '-date', limit: 100, depth: 1 })
  return (
    <>
      <PageHero titre="Actualités" facet="mandarine">
        <p>Soirées à thème, événements, fermetures exceptionnelles : tout ce qui se passe à la patinoire.</p>
      </PageHero>
      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:py-32">
        {actus.docs.length === 0 ? (
          <div className="tile tile-chrome max-w-[60ch] p-6 text-chrome-100">
            <p className="font-display text-[1.25rem] font-bold text-mirror">Rien de neuf pour le moment.</p>
            <p className="mt-2">Les prochaines soirées seront annoncées ici et sur nos réseaux. En attendant, la piste est ouverte tous les week-ends.</p>
          </div>
        ) : (
          <ul className="grid gap-px bg-chrome-700 md:grid-cols-2 lg:grid-cols-3">
            {actus.docs.map((a) => (
              <li key={a.id} className="tile tile-chrome flex flex-col">
                {a.image && <div className="relative aspect-[16/9]"><Img media={a.image} fill sizes="(min-width:1024px) 33vw, 100vw" /></div>}
                <div className="flex flex-1 flex-col p-5">
                  <time dateTime={a.date} className="text-[0.875rem] text-chrome-300">{dateLongue(a.date)}</time>
                  <h2 className="mt-2 font-display text-[1.25rem] font-bold leading-tight text-mirror"><Link href={`/actualites/${a.slug}`} className="hover:text-[var(--facet)]">{a.titre}</Link></h2>
                  <p className="mt-2 text-chrome-100">{a.resume}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
