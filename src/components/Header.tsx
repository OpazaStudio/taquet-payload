import Link from 'next/link'
import type { InfosPratiques } from '@/payload-types'
import { NavTiles } from './NavTiles'

export function Header({ infos }: { infos: InfosPratiques }) {
  return (
    <header className="sticky top-0 z-50 border-b joint bg-chrome-950/95 backdrop-blur-[2px]">
      {infos.annonce?.active && infos.annonce.texte && (
        <p className="tile-facet tile-ink px-4 py-2 text-center text-[0.9375rem] font-semibold">{infos.annonce.texte}</p>
      )}
      <div className="mx-auto flex h-16 max-w-[1440px] items-stretch gap-px px-2 sm:px-4">
        <Link href="/" className="tile tile-chrome group flex flex-col justify-center px-4 leading-none hover:bg-mirror" aria-label={`${infos.nom}, accueil`}>
          <span className="font-display text-[1.0625rem] font-black uppercase tracking-[-0.02em] text-mirror group-hover:text-ink">{infos.nom}</span>
          <span className="mt-1 text-[0.6875rem] font-semibold text-chrome-300 group-hover:text-chrome-700">{infos.nomSite}</span>
        </Link>
        <div className="flex-1" />
        <NavTiles telephone={infos.telephone} />
      </div>
    </header>
  )
}
