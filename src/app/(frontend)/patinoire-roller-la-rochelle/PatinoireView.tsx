'use client'
import { FileText } from 'lucide-react'
import type { InfosPratiques, Patinoire } from '@/payload-types'
import { Img } from '@/components/Img'
import { OpeningState } from '@/components/OpeningState'
import { PageHero } from '@/components/PageHero'
import { PhoneTile } from '@/components/PhoneTile'
import { RichText } from '@/components/RichText'
import { Tarifs } from '@/components/Tarifs'
import { fmt, groupByDay, JOUR_LABEL } from '@/lib/hours'
import { mediaUrl } from '@/lib/media'
import { useLiveDoc } from '@/lib/useLiveDoc'

export function PatinoireView({ page: initial, infos: initialInfos }: { page: Patinoire; infos: InfosPratiques }) {
  const page = useLiveDoc(initial, { globalSlug: 'patinoire' }, 2)
  const infos = useLiveDoc(initialInfos, { globalSlug: 'infos-pratiques' }, 1)
  const jours = groupByDay(infos.horaires ?? [])
  const reglement = mediaUrl(page.reglement)

  return (
    <>
      <PageHero titre={page.titre} facet="aqua">
        <RichText data={page.intro} />
      </PageHero>

      {page.chiffres?.length ? (
        <section>
          <p className="mx-auto max-w-[1440px] px-4 py-6 font-display text-balance text-[clamp(1.125rem,2.2vw,1.5rem)] font-bold leading-snug text-mirror sm:px-6">
            {page.chiffres.map((c, i) => (
              <span key={c.id ?? i}>
                {i > 0 && <span className="mx-3 text-aqua" aria-hidden="true">·</span>}
                <span className="text-aqua">{c.valeur}</span> {c.legende}
              </span>
            ))}
          </p>
        </section>
      ) : null}

      <section className="mx-auto grid max-w-[1440px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-7">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-mirror">Ouvert au public</h2>
          <div className="mt-6 grid gap-px bg-chrome-700 sm:grid-cols-2">
            <div className="tile tile-aqua tile-ink p-5"><OpeningState horaires={infos.horaires ?? []} annonce={infos.annonce?.active ? infos.annonce.texte : null} /></div>
            <dl className="tile tile-chrome p-5 text-mirror">
              {jours.map((d) => (
                <div key={d.jour} className="flex justify-between gap-4 py-1">
                  <dt className="font-display text-[0.9375rem] font-bold">{JOUR_LABEL[d.jour]}</dt>
                  <dd className="text-right tabular-nums">
                    {d.items.map((c, i) => <span key={i} className="block">{fmt(c.ouverture)}–{fmt(c.fermeture)}{c.precision && <span className="block text-[0.8125rem] text-chrome-300">{c.precision}</span>}</span>)}
                  </dd>
                </div>
              ))}
              {infos.mentionVacances && <p className="mt-3 border-t joint pt-3 text-[0.9375rem] text-chrome-300">{infos.mentionVacances}</p>}
              {infos.seancesPrivees && <p className="mt-2 text-[0.9375rem] text-chrome-300">Séances privées : {infos.seancesPrivees}</p>}
            </dl>
          </div>
        </div>
        <div className="tile relative aspect-[4/3] bg-chrome-900 lg:col-span-5 lg:aspect-auto">
          <Img media={page.photo} fill sizes="(min-width:1024px) 40vw, 100vw" priority />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-6 lg:pb-32">
        <Tarifs infos={infos} titre={page.tarifsTitre ?? 'Tarifs'} />
      </section>

      <section>
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-6">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-mirror">Sur place</h2>
            <ul className="mt-6 divide-y joint border-y joint">
              {page.equipements?.map((e, i) => (
                <li key={e.id ?? i} className="grid gap-1 py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <span className="font-display text-[1rem] font-bold text-mirror">{e.titre}</span>
                  <span className="text-chrome-100">{e.texte}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-mirror">À savoir avant de venir</h2>
            <ul className="mt-6 grid gap-px bg-chrome-700">
              {page.regles?.map((r, i) => (
                <li key={r.id ?? i} className="tile tile-chrome p-4 text-chrome-100">{r.texte}</li>
              ))}
            </ul>
            {reglement && (
              <a href={reglement} target="_blank" rel="noopener" className="tile tile-lit tile-mirror mt-6 inline-flex items-center gap-3 px-5 py-4 font-display text-[0.9375rem] font-bold">
                <FileText className="size-5" aria-hidden="true" />Règlement intérieur (PDF)
              </a>
            )}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-20 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="font-display-tight text-balance text-[clamp(2rem,5vw,4rem)] font-black text-mirror">Une question ? Un groupe ?</h2>
            <p className="mt-4 max-w-[60ch] text-chrome-100">Pour les groupes, les écoles, les centres de loisirs et les privatisations, appelez-nous : on adapte l’accueil.</p>
          </div>
          <PhoneTile telephone={infos.telephone} compact className="lg:col-span-4" />
        </div>
      </section>
    </>
  )
}
