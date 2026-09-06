'use client'
import { Mail, MapPin, Phone } from 'lucide-react'
import type { Contact, InfosPratiques } from '@/payload-types'
import { Img } from '@/components/Img'
import { PageHero } from '@/components/PageHero'
import { PhoneTile } from '@/components/PhoneTile'
import { ReseauxTiles } from '@/components/ReseauxTiles'
import { telHref } from '@/lib/format'
import type { FacetCouleur } from '@/lib/nav'
import { useLiveDoc } from '@/lib/useLiveDoc'

export function ContactView({ page: initial, infos: initialInfos, facet }: { page: Contact; infos: InfosPratiques; facet: FacetCouleur }) {
  const page = useLiveDoc(initial, { globalSlug: 'contact' }, 2)
  const infos = useLiveDoc(initialInfos, { globalSlug: 'infos-pratiques' }, 1)
  return (
    <>
      <PageHero titre={page.titre} facet={facet} aside={<PhoneTile telephone={infos.telephone} label="Le plus rapide : appeler" compact />}>
        {page.intro && <p>{page.intro}</p>}
      </PageHero>

      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:py-32">
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-mirror">{page.reseaux?.titre || 'Écrivez-nous sur les réseaux'}</h2>
        {page.reseaux?.texte && <p className="mt-3 max-w-[60ch] text-[1.0625rem] text-chrome-100">{page.reseaux.texte}</p>}
        <ReseauxTiles infos={infos} className="mt-8" />

        <div className="mt-px grid gap-px bg-chrome-700 lg:grid-cols-12">
          <div className="tile tile-chrome p-5 text-mirror lg:col-span-4">
            <h3 className="flex items-center gap-2 font-display text-[0.9375rem] font-bold"><Phone className="size-4" strokeWidth={2.5} aria-hidden="true" />Par téléphone</h3>
            <p className="mt-3 text-[1.0625rem]">
              <a href={telHref(infos.telephone)} className="font-display text-[1.25rem] font-bold hover:text-[var(--facet)]">{infos.telephone}</a>
              {infos.telephoneMobile && <><br /><a href={telHref(infos.telephoneMobile)} className="hover:text-[var(--facet)]">{infos.telephoneMobile}</a></>}
            </p>
          </div>
          {infos.email && (
            <a href={`mailto:${infos.email}`} className="tile tile-lit tile-chrome flex flex-col p-5 text-mirror lg:col-span-4">
              <span className="flex items-center gap-2 font-display text-[0.9375rem] font-bold"><Mail className="size-4" strokeWidth={2.5} aria-hidden="true" />Par e-mail</span>
              <span className="mt-3 text-[1.0625rem] break-all">{infos.email}</span>
            </a>
          )}
          <div className={`tile tile-chrome p-5 text-mirror ${infos.email ? 'lg:col-span-4' : 'lg:col-span-8'}`}>
            <h3 className="flex items-center gap-2 font-display text-[0.9375rem] font-bold"><MapPin className="size-4" strokeWidth={2.5} aria-hidden="true" />Sur place</h3>
            <address className="mt-3 not-italic text-[1.0625rem] text-chrome-100">
              {infos.adresse.rue}{infos.adresse.complement && <>, {infos.adresse.complement}</>}<br />
              {infos.adresse.codePostal} {infos.adresse.ville}
            </address>
            {infos.adresse.lienItineraire && (
              <a href={infos.adresse.lienItineraire} target="_blank" rel="noopener" className="mt-3 inline-block underline decoration-[var(--facet)] decoration-2 underline-offset-4 hover:text-[var(--facet)]">Itinéraire</a>
            )}
          </div>
          {page.photo && (
            <div className="tile relative aspect-[21/9] bg-chrome-900 lg:col-span-12"><Img media={page.photo} fill sizes="(min-width:1440px) 1440px, 100vw" /></div>
          )}
        </div>
      </section>
    </>
  )
}
