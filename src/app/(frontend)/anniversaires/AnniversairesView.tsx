'use client'
import { Check, FileText } from 'lucide-react'
import type { Anniversaires, InfosPratiques } from '@/payload-types'
import { Img } from '@/components/Img'
import { PageHero } from '@/components/PageHero'
import { PhoneTile } from '@/components/PhoneTile'
import { RichText } from '@/components/RichText'
import { euros } from '@/lib/format'
import { mediaUrl } from '@/lib/media'
import { useLiveDoc } from '@/lib/useLiveDoc'

export function AnniversairesView({ page: initial, infos }: { page: Anniversaires; infos: InfosPratiques }) {
  const page = useLiveDoc(initial, { globalSlug: 'anniversaires' }, 2)
  const carte = mediaUrl(page.carteInvitation)

  return (
    <>
      <PageHero titre={page.titre} facet="fuchsia" aside={<PhoneTile telephone={infos.telephone} label="Réserver une table" compact />}>
        <RichText data={page.intro} />
      </PageHero>

      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:py-32">
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-mirror">Les formules</h2>
        <p className="mt-3 max-w-[60ch] text-chrome-100">Prix par personne. {page.acompte ? `Un acompte de ${euros(page.acompte)} est demandé à la réservation.` : ''}</p>
        <ul className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4">
          {page.formules?.map((f, i) => (
            <li key={f.id ?? i} className={`tile flex flex-col p-5 ${i % 2 === 0 ? 'tile-fuchsia tile-ink' : 'tile-mirror'}`}>
              <h3 className="font-display text-[1.25rem] font-black leading-tight">{f.nom}</h3>
              {f.creneau && <p className="mt-1 text-[0.9375rem] font-semibold">{f.creneau}</p>}
              <p className="font-display-tight mt-5 text-[3.25rem] font-black leading-none">{euros(f.prix)}<span className="ml-1 font-display text-[0.9375rem] font-medium">/ pers.</span></p>
              <ul className="mt-5 space-y-2 text-[0.9375rem]">
                {f.inclus?.map((x, j) => <li key={x.id ?? j} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0" strokeWidth={3} aria-hidden="true" />{x.texte}</li>)}
              </ul>
              {f.note && <p className="mt-auto pt-5 text-[0.8125rem] leading-snug">{f.note}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-6">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-mirror">Comment ça se passe</h2>
            <RichText data={page.conditions} className="mt-6 text-chrome-100" />
            {carte && (
              <a href={carte} target="_blank" rel="noopener" className="tile tile-lit tile-mirror mt-8 inline-flex items-center gap-3 px-5 py-4 font-display text-[0.9375rem] font-bold">
                <FileText className="size-5" aria-hidden="true" />Carte d’invitation à imprimer (PDF)
              </a>
            )}
          </div>
          <div className="tile relative aspect-[4/3] bg-chrome-900 lg:col-span-6 lg:aspect-auto lg:min-h-[360px]">
            <Img media={page.photo} fill sizes="(min-width:1024px) 50vw, 100vw" priority />
          </div>
        </div>
      </section>
    </>
  )
}
