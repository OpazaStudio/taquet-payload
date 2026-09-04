'use client'
import type { Actualite } from '@/payload-types'
import { Img } from '@/components/Img'
import { RichText } from '@/components/RichText'
import { dateLongue } from '@/lib/format'
import { useLiveDoc } from '@/lib/useLiveDoc'

export function ActualiteView({ actu: initial }: { actu: Actualite }) {
  const actu = useLiveDoc(initial, { collectionSlug: 'actualites' }, 1)
  return (
    <article className="mx-auto max-w-[1440px] px-4 pt-6 pb-20 sm:px-6 lg:pb-32">
      <div className="grid gap-10 lg:grid-cols-12">
        <header className="lg:col-span-7">
          <time dateTime={actu.date} className="font-display text-[0.9375rem] font-bold text-mandarine">{dateLongue(actu.date)}</time>
          <h1 className="font-display-tight mt-3 text-balance text-[clamp(2rem,5vw,4rem)] font-black text-mirror">{actu.titre}</h1>
          <p className="mt-6 max-w-[60ch] text-lg text-chrome-100">{actu.resume}</p>
          <RichText data={actu.contenu} className="mt-8 text-[1.0625rem] text-chrome-100" />
        </header>
        {actu.image && (
          <div className="tile relative aspect-[4/3] bg-chrome-900 lg:col-span-5">
            <Img media={actu.image} fill sizes="(min-width:1024px) 40vw, 100vw" priority />
          </div>
        )}
      </div>
    </article>
  )
}
