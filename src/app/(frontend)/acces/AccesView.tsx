'use client'
import { MapPin, Navigation } from 'lucide-react'
import type { Acces, InfosPratiques } from '@/payload-types'
import { Img } from '@/components/Img'
import { MapFrame } from '@/components/MapFrame'
import { PageHero } from '@/components/PageHero'
import { useLiveDoc } from '@/lib/useLiveDoc'

export function AccesView({ page: initial, infos: initialInfos }: { page: Acces; infos: InfosPratiques }) {
  const page = useLiveDoc(initial, { globalSlug: 'acces' }, 2)
  const infos = useLiveDoc(initialInfos, { globalSlug: 'infos-pratiques' }, 1)
  const { latitude: lat, longitude: lon } = infos.adresse
  const osm = lat && lon ? `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.012},${lat - 0.007},${lon + 0.012},${lat + 0.007}&layer=mapnik&marker=${lat},${lon}` : null
  const mapSrc = page.carteEmbed?.startsWith('https://www.google.com/maps/embed') ? page.carteEmbed : osm

  return (
    <>
      <PageHero titre={page.titre} facet="aqua">
        {page.intro && <p>{page.intro}</p>}
      </PageHero>

      <section>
        <div className="mx-auto grid max-w-[1440px] lg:grid-cols-12">
          <div className="tile tile-aqua tile-ink flex flex-col justify-between p-6 lg:col-span-4">
            <address className="not-italic">
              <span className="flex items-start gap-2 font-display text-[1.375rem] font-black leading-tight"><MapPin className="mt-1 size-6 shrink-0" strokeWidth={2.5} aria-hidden="true" />{infos.nom}</span>
              <span className="mt-4 block text-[1.0625rem] leading-snug">
                {infos.adresse.rue}<br />{infos.adresse.complement && <>{infos.adresse.complement}<br /></>}{infos.adresse.codePostal} {infos.adresse.ville}
              </span>
            </address>
            {infos.adresse.lienItineraire && (
              <a href={infos.adresse.lienItineraire} target="_blank" rel="noopener" className="tile tile-lit tile-mirror mt-8 inline-flex items-center gap-3 self-start px-5 py-4 font-display text-[0.9375rem] font-bold">
                <Navigation className="size-5" aria-hidden="true" />Lancer l’itinéraire
              </a>
            )}
          </div>
          <div className="relative min-h-[360px] bg-chrome-900 lg:col-span-8 lg:min-h-[480px]">
            {mapSrc ? (
              <MapFrame src={mapSrc} title={`Plan d’accès à ${infos.nom}, ${infos.adresse.ville}`} />
            ) : (
              <Img media={page.photo} fill sizes="(min-width:1024px) 66vw, 100vw" />
            )}
          </div>
        </div>
      </section>

      {page.itineraires?.length ? (
        <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:py-32">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-mirror">Itinéraires</h2>
          <ul className="mt-8 grid gap-px bg-chrome-700 md:grid-cols-3">
            {page.itineraires.map((it, i) => (
              <li key={it.id ?? i} className="tile tile-chrome p-6">
                <h3 className="font-display text-[1.125rem] font-bold text-mirror">Depuis {it.depuis}</h3>
                <p className="mt-3 text-pretty text-chrome-100">{it.instructions}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  )
}
