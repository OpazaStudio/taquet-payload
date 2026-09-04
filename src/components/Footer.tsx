import Link from 'next/link'
import { Facebook, Instagram } from 'lucide-react'
import type { InfosPratiques } from '@/payload-types'
import { fmt, groupByDay, JOUR_LABEL } from '@/lib/hours'
import { telHref } from '@/lib/format'
import { NAV } from '@/lib/nav'

export function Footer({ infos }: { infos: InfosPratiques }) {
  const jours = groupByDay(infos.horaires ?? [])
  return (
    <footer className="border-t joint bg-chrome-950">
      <div className="mx-auto max-w-[1440px] px-4 pt-16 pb-8 sm:px-6">
        <p className="font-display-tight text-balance text-[clamp(2.5rem,7vw,5.5rem)] font-black uppercase text-mirror">
          {infos.nom}
          <span className="block text-[0.32em] font-medium normal-case tracking-normal text-chrome-300">{infos.nomSite} · patinoire roller couverte, La Rochelle</span>
        </p>

        <div className="mt-12 grid gap-px bg-chrome-700 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-chrome-950 p-6">
            <h2 className="font-display text-[0.9375rem] font-bold text-mirror">Adresse</h2>
            <address className="mt-3 not-italic text-chrome-100">
              {infos.adresse.rue}<br />
              {infos.adresse.complement && <>{infos.adresse.complement}<br /></>}
              {infos.adresse.codePostal} {infos.adresse.ville}
            </address>
            {infos.adresse.lienItineraire && (
              <a href={infos.adresse.lienItineraire} target="_blank" rel="noopener" className="mt-3 inline-block underline decoration-[var(--facet)] decoration-2 hover:text-[var(--facet)]">Itinéraire</a>
            )}
          </div>
          <div className="bg-chrome-950 p-6">
            <h2 className="font-display text-[0.9375rem] font-bold text-mirror">Téléphone</h2>
            <p className="mt-3">
              <a href={telHref(infos.telephone)} className="font-display text-[1.125rem] font-bold text-mirror hover:text-[var(--facet)]">{infos.telephone}</a>
              {infos.telephoneMobile && <><br /><a href={telHref(infos.telephoneMobile)} className="text-chrome-100 hover:text-[var(--facet)]">{infos.telephoneMobile}</a></>}
              {infos.email && <><br /><a href={`mailto:${infos.email}`} className="text-chrome-100 hover:text-[var(--facet)]">{infos.email}</a></>}
            </p>
          </div>
          <div className="bg-chrome-950 p-6">
            <h2 className="font-display text-[0.9375rem] font-bold text-mirror">Ouvert au public</h2>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
              {jours.map((d) => (
                <div key={d.jour} className="contents">
                  <dt className="text-chrome-300">{JOUR_LABEL[d.jour]}</dt>
                  <dd className="text-chrome-100">{d.items.map((c) => `${fmt(c.ouverture)}–${fmt(c.fermeture)}`).join(', ')}</dd>
                </div>
              ))}
            </dl>
            {infos.mentionVacances && <p className="mt-3 text-[0.9375rem] text-chrome-300">{infos.mentionVacances}</p>}
          </div>
          <div className="bg-chrome-950 p-6">
            <h2 className="font-display text-[0.9375rem] font-bold text-mirror">Suivez-nous</h2>
            <ul className="mt-3 space-y-2">
              {infos.reseaux?.facebook && (
                <li><a href={infos.reseaux.facebook} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-[var(--facet)]"><Facebook className="size-4" aria-hidden="true" />Facebook « Au Taquet »</a></li>
              )}
              {infos.reseaux?.instagram && (
                <li><a href={infos.reseaux.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 hover:text-[var(--facet)]"><Instagram className="size-4" aria-hidden="true" />Instagram « musicdanceroller »</a></li>
              )}
            </ul>
            <nav aria-label="Pages" className="mt-6">
              <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[0.9375rem]">
                {NAV.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-[var(--facet)]">{n.label}</Link></li>)}
                <li><Link href="/actualites" className="hover:text-[var(--facet)]">Actualités</Link></li>
                <li><Link href="/galerie" className="hover:text-[var(--facet)]">Galerie</Link></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-[0.8125rem] text-chrome-300">
          <p>
            {infos.raisonSociale && <>{infos.raisonSociale}</>}
            {infos.siret && <> · SIRET {infos.siret}</>}
            {' · '}
            <Link href="/mentions-legales" className="underline underline-offset-2 hover:text-mirror">Mentions légales</Link>
          </p>
          <p>
            Site réalisé par{' '}
            <a href="https://opaza.fr" target="_blank" rel="noopener" className="underline underline-offset-2 hover:text-mirror">Opaza Studio</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
