'use client'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import type { Accueil, Actualite, Cours, GaleriePhoto, InfosPratiques } from '@/payload-types'
import { DiscoBall } from '@/components/DiscoBall'
import { Img } from '@/components/Img'
import { LightField } from '@/components/LightField'
import { OpeningState } from '@/components/OpeningState'
import { PhoneTile } from '@/components/PhoneTile'
import { PhotoMosaic } from '@/components/PhotoMosaic'
import { Planning } from '@/components/Planning'
import { RichText } from '@/components/RichText'
import { dateLongue, euros, telHref } from '@/lib/format'
import { useLiveDoc } from '@/lib/useLiveDoc'

type Props = { accueil: Accueil; infos: InfosPratiques; cours: Cours[]; photos: GaleriePhoto[]; actus: Actualite[] }

const UNIVERS_TILES = ['tile-aqua', 'tile-mandarine', 'tile-fuchsia']
const UNIVERS_SPANS = ['lg:col-span-5', 'lg:col-span-4', 'lg:col-span-3']

export function AccueilView({ accueil: initialAccueil, infos: initialInfos, cours, photos, actus }: Props) {
  const accueil = useLiveDoc(initialAccueil, { globalSlug: 'accueil' }, 2)
  const infos = useLiveDoc(initialInfos, { globalSlug: 'infos-pratiques' }, 1)
  const tarif = infos.tarifs?.[0]
  const location = infos.tarifs?.find((t) => /location/i.test(t.libelle))

  return (
    <>
      <section className="relative overflow-hidden">
        <LightField tint="all" variant="home" />
        <div className="pointer-events-none absolute -top-36 -right-36 [--ball:220px] lg:-top-[24%] lg:-right-[28%] lg:[--ball:760px] xl:-right-[22%]" aria-hidden="true">
          <DiscoBall size={760} tint="all" drive />
        </div>

        <div className="relative mx-auto max-w-[1440px] px-4 pt-24 pb-8 sm:px-6 lg:pt-24 lg:pb-20">
          <h1 className="font-display-tight text-mirror">
            <span className="block text-balance text-[clamp(2.75rem,9vw,7rem)] font-black lg:max-w-[9ch]">{accueil.bandeau.titre}</span>
            <span className="mt-4 block max-w-[20ch] text-balance font-display text-[clamp(1.25rem,2.6vw,2rem)] font-medium leading-tight text-chrome-100">{accueil.bandeau.sousTitre}</span>
          </h1>
          {accueil.bandeau.accroche && <p className="mt-8 hidden max-w-[52ch] text-pretty text-lg text-chrome-100 lg:block">{accueil.bandeau.accroche}</p>}
        </div>

        <div className="relative">
          <div className="mx-auto grid max-w-[1440px] grid-cols-2 sm:px-6 lg:grid-cols-4">
            <div className="tile tile-aqua tile-ink min-h-[10rem] p-5">
              <OpeningState horaires={infos.horaires ?? []} annonce={infos.annonce?.active ? infos.annonce.texte : null} />
            </div>
            <div className="tile tile-mirror flex min-h-[10rem] flex-col justify-between p-5">
              {tarif ? (
                <>
                  <span className="font-display text-[1.375rem] font-medium leading-tight">{tarif.libelle} <span className="font-black">{euros(tarif.prix)}</span></span>
                  <span className="mt-2 text-[0.9375rem] leading-snug">
                    {tarif.precision}{location && <><br />{location.libelle} {euros(location.prix)}</>}
                  </span>
                </>
              ) : (
                <span className="font-display text-[1.375rem] font-medium">Tarifs sur place</span>
              )}
            </div>
            <div className="tile tile-chrome flex min-h-[10rem] flex-col justify-between p-5 text-mirror">
              <span className="flex items-start gap-2 font-display text-[1.375rem] font-medium leading-tight"><MapPin className="mt-1 size-5 shrink-0" aria-hidden="true" />{infos.adresse.ville}, {infos.adresse.complement ?? ''}</span>
              <span className="mt-2 text-[0.9375rem] leading-snug text-chrome-300">
                {infos.adresse.rue}, {infos.adresse.codePostal} {infos.adresse.ville}
                {infos.adresse.lienItineraire && <> · <a href={infos.adresse.lienItineraire} target="_blank" rel="noopener" className="text-mirror underline decoration-aqua decoration-2 underline-offset-2">Itinéraire</a></>}
              </span>
            </div>
            <PhoneTile telephone={infos.telephone} className="min-h-[10rem]" />
          </div>
          {accueil.bandeau.accroche && <p className="mx-auto max-w-[1440px] px-4 py-6 text-pretty text-[1.0625rem] text-chrome-100 sm:px-6 lg:hidden">{accueil.bandeau.accroche}</p>}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:py-32">
        <div className="lg:col-span-6">
          <h2 className="font-display text-balance text-[clamp(1.875rem,4vw,3rem)] font-black text-mirror">{accueil.presentation.titre}</h2>
          <RichText data={accueil.presentation.texte} className="mt-6 text-[1.0625rem] text-chrome-100 sm:text-lg" />
          {accueil.bandeau.boutonSecondaire?.texte && accueil.bandeau.boutonSecondaire.lien && (
            <Link href={accueil.bandeau.boutonSecondaire.lien} className="tile tile-lit tile-mirror mt-8 inline-flex items-center gap-3 px-6 py-4 font-display text-[0.9375rem] font-bold">
              {accueil.bandeau.boutonSecondaire.texte}<ArrowRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
            </Link>
          )}
        </div>
        <div className="tile relative aspect-[4/3] bg-chrome-900 lg:col-span-6 lg:aspect-auto lg:min-h-[420px]">
          <Img media={accueil.bandeau.photo} fill sizes="(min-width:1024px) 50vw, 100vw" priority />
        </div>
      </section>

      {accueil.univers?.length ? (
        <section>
          <ul className="mx-auto grid max-w-[1440px] lg:grid-cols-12">
            {accueil.univers.map((u, i) => (
              <li key={u.id ?? i} className={`tile ${UNIVERS_TILES[i % 3]} tile-ink flex flex-col ${UNIVERS_SPANS[i % 3]}`}>
                <div className="relative aspect-[16/9] bg-chrome-900">
                  <Img media={u.photo} fill sizes="(min-width:1024px) 40vw, 100vw" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-balance text-[1.5rem] font-black leading-tight">{u.titre}</h2>
                  <p className="mt-3 max-w-[40ch] text-pretty text-[1rem] leading-snug">{u.texte}</p>
                  {u.chiffre && (
                    <p className="mt-6">
                      <span className="font-display-tight block text-[3rem] font-black leading-none">{u.chiffre}</span>
                      <span className="mt-1 block text-[0.9375rem] font-semibold">{u.chiffreLegende}</span>
                    </p>
                  )}
                  <Link href={u.lien} className="mt-auto inline-flex items-center gap-2 pt-6 font-display text-[0.9375rem] font-bold underline decoration-ink decoration-2 underline-offset-4 hover:no-underline">
                    {u.lienTexte}<ArrowRight className="size-4" strokeWidth={2.5} aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-mirror">La semaine à la patinoire</h2>
          <Link href="/cours" className="font-display text-[0.9375rem] font-bold underline decoration-[var(--facet)] decoration-2 underline-offset-4 hover:text-[var(--facet)]">Détail des cours</Link>
        </div>
        <p className="mt-3 max-w-[60ch] text-chrome-100">Le patinage libre est ouvert à tous ; les cours sont sur inscription auprès de chaque intervenant.{infos.seancesPrivees && <> {infos.seancesPrivees}</>}</p>
        <div className="mt-8"><Planning cours={cours} infos={infos} compact /></div>
      </section>

      {photos.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-4 pb-20 sm:px-6 lg:pb-32">
          <PhotoMosaic photos={photos} />
        </section>
      )}

      {actus.length > 0 && (
        <section>
          <div className="mx-auto max-w-[1440px] px-4 py-20 sm:px-6 lg:py-32">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-mirror">Actualités</h2>
              <Link href="/actualites" className="font-display text-[0.9375rem] font-bold underline decoration-[var(--facet)] decoration-2 underline-offset-4 hover:text-[var(--facet)]">Toutes les actualités</Link>
            </div>
            <ul className="mt-6 grid gap-px bg-chrome-700 md:grid-cols-3">
              {actus.map((a) => (
                <li key={a.id} className="tile tile-chrome flex flex-col">
                  {a.image && <div className="relative aspect-[16/9]"><Img media={a.image} fill sizes="(min-width:768px) 33vw, 100vw" /></div>}
                  <div className="flex flex-1 flex-col p-5">
                    <time dateTime={a.date} className="text-[0.875rem] text-chrome-300">{dateLongue(a.date)}</time>
                    <h3 className="mt-2 font-display text-[1.125rem] font-bold leading-tight text-mirror"><Link href={`/actualites/${a.slug}`} className="hover:text-[var(--facet)]">{a.titre}</Link></h3>
                    <p className="mt-2 text-[0.9375rem] text-chrome-100">{a.resume}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {accueil.privatisation?.titre && (
        <section>
          <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:py-32">
            <div className="lg:col-span-8">
              <h2 className="font-display-tight text-balance text-[clamp(2rem,5vw,4rem)] font-black text-mirror">{accueil.privatisation.titre}</h2>
              <p className="mt-6 max-w-[60ch] text-pretty text-[1.0625rem] text-chrome-100 sm:text-lg">{accueil.privatisation.texte}</p>
            </div>
            <div className="grid gap-px bg-chrome-700 lg:col-span-4">
              <PhoneTile telephone={infos.telephone} label="Appeler" compact />
              {infos.telephoneMobile && (
                <a href={telHref(infos.telephoneMobile)} className="tile tile-lit tile-chrome flex items-center justify-between p-5 font-display text-[1rem] font-bold text-mirror">Ou le mobile<span className="tabular-nums">{infos.telephoneMobile}</span></a>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
