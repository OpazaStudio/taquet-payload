import Link from 'next/link'
import type { GaleriePhoto } from '@/payload-types'
import { Img } from './Img'

const SPANS = ['lg:col-span-6 lg:row-span-2', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-3']

export function PhotoMosaic({ photos, titre = 'La salle en photos', lien = true }: { photos: GaleriePhoto[]; titre?: string; lien?: boolean }) {
  if (!photos.length) return null
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-mirror">{titre}</h2>
        {lien && <Link href="/galerie" className="font-display text-[0.9375rem] font-bold underline decoration-[var(--facet)] decoration-2 underline-offset-4 hover:text-[var(--facet)]">Toute la galerie</Link>}
      </div>
      <ul className="mt-6 grid grid-cols-2 gap-px bg-chrome-700 lg:grid-cols-12 lg:auto-rows-[220px]">
        {photos.slice(0, 5).map((p, i) => (
          <li key={p.id} className={`tile relative aspect-square bg-chrome-900 lg:aspect-auto ${SPANS[i]}`}>
            <Img media={p.image} alt={p.legende} fill sizes={i === 0 ? '(min-width:1024px) 50vw, 50vw' : '(min-width:1024px) 25vw, 50vw'} />
            <span className="absolute inset-x-0 bottom-0 bg-chrome-950/85 px-3 py-2 text-[0.8125rem] text-mirror">{p.legende}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
