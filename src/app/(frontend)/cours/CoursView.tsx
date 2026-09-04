'use client'
import { Globe, Phone } from 'lucide-react'
import type { Cours, InfosPratiques, PageCours } from '@/payload-types'
import { Img } from '@/components/Img'
import { PageHero } from '@/components/PageHero'
import { Planning } from '@/components/Planning'
import { RichText } from '@/components/RichText'
import { telHref } from '@/lib/format'
import { fmt, JOUR_LABEL } from '@/lib/hours'
import { FACET_TILE_CLASS, type Facet } from '@/lib/nav'
import { useLiveDoc } from '@/lib/useLiveDoc'

export function CoursView({ page: initial, infos, cours: initialCours }: { page: PageCours; infos: InfosPratiques; cours: Cours[] }) {
  const page = useLiveDoc(initial, { globalSlug: 'page-cours' }, 2)
  const cours = initialCours

  return (
    <>
      <PageHero titre={page.titre} facet="mandarine" aside={page.saison ? <p className="tile tile-mandarine tile-ink inline-block px-5 py-3 font-display text-[1rem] font-bold">{page.saison}</p> : undefined}>
        <RichText data={page.intro} />
      </PageHero>

      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:py-32">
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-mirror">Le planning de la semaine</h2>
        <div className="mt-8"><Planning cours={cours} infos={infos} /></div>
        {page.note && <p className="mt-4 text-[0.9375rem] text-chrome-300">{page.note}</p>}
      </section>

      <section>
        <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:py-32">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-mirror">Les cours et leurs intervenants</h2>
          <ul className="mt-8 grid gap-px bg-chrome-700 md:grid-cols-2">
            {cours.map((c) => {
              const tile = FACET_TILE_CLASS[(c.couleur ?? 'mandarine') as Facet]
              const tels = (c.telephone ?? '').split('/').map((t) => t.trim()).filter(Boolean)
              return (
                <li key={c.id} id={`cours-${c.id}`} className="flex flex-col bg-chrome-950 sm:flex-row">
                  <div className={`tile ${tile} tile-ink flex w-full shrink-0 flex-col sm:w-64`}>
                    {c.image && <div className="relative aspect-[4/3]"><Img media={c.image} fill sizes="(min-width:640px) 256px, 100vw" /></div>}
                    <div className="flex flex-1 flex-col justify-between p-5">
                      <h3 className="font-display text-[1.375rem] font-black leading-tight">{c.nom}</h3>
                      <p className="mt-4 text-[0.9375rem] font-semibold leading-snug">
                        {c.intervenant}{c.organisme && <><br /><span className="font-normal">{c.organisme}</span></>}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    {c.description && <p className="max-w-[48ch] text-chrome-100">{c.description}</p>}
                    <ul className="mt-4 space-y-1 text-[0.9375rem] text-chrome-100">
                      {c.creneaux?.map((k, i) => (
                        <li key={k.id ?? i} className="flex gap-3">
                          <span className="w-24 shrink-0 font-semibold text-mirror">{JOUR_LABEL[k.jour]}</span>
                          <span className="tabular-nums">{fmt(k.debut)}{k.fin ? `–${fmt(k.fin)}` : ''}{k.niveau && <span className="text-chrome-300"> · {k.niveau}</span>}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
                      {tels.map((t) => <a key={t} href={telHref(t)} className="inline-flex items-center gap-2 font-semibold text-mirror hover:text-[var(--facet)]"><Phone className="size-4" aria-hidden="true" />{t}</a>)}
                      {c.siteWeb && <a href={c.siteWeb} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-chrome-100 hover:text-[var(--facet)]"><Globe className="size-4" aria-hidden="true" />{c.siteWeb.replace(/^https?:\/\/(www\.)?/, '')}</a>}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </>
  )
}
