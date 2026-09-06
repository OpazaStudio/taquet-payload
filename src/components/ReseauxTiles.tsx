import { Facebook, Instagram } from 'lucide-react'
import type { InfosPratiques } from '@/payload-types'
import { instagramHandle } from '@/lib/reseaux'

type Props = { infos: Pick<InfosPratiques, 'nom' | 'reseaux'>; variant?: 'large' | 'compact'; className?: string }

export function ReseauxTiles({ infos, variant = 'large', className = '' }: Props) {
  const fb = infos.reseaux?.facebook
  const ig = infos.reseaux?.instagram
  if (!fb && !ig) return null
  const insta = instagramHandle(ig)
  if (variant === 'compact') {
    return (
      <>
        {fb && (
          <a href={fb} target="_blank" rel="noopener" className={`tile tile-lit tile-aqua tile-ink flex items-center gap-3 p-4 font-display text-[1rem] font-bold ${className}`}>
            <Facebook className="size-6" strokeWidth={2.25} aria-hidden="true" />Facebook
          </a>
        )}
        {ig && (
          <a href={ig} target="_blank" rel="noopener" className={`tile tile-lit tile-fuchsia tile-ink flex items-center gap-3 p-4 font-display text-[1rem] font-bold ${className}`}>
            <Instagram className="size-6" strokeWidth={2.25} aria-hidden="true" />Instagram
          </a>
        )}
      </>
    )
  }
  return (
    <div className={`grid gap-px bg-chrome-700 md:grid-cols-2 ${className}`}>
      {fb && (
        <a href={fb} target="_blank" rel="noopener" className="tile tile-lit tile-aqua tile-ink flex min-h-[13rem] flex-col justify-between p-6 sm:p-8">
          <Facebook className="size-9" strokeWidth={2.25} aria-hidden="true" />
          <span className="mt-8">
            <span className="font-display-tight block text-[clamp(1.75rem,4vw,2.75rem)] font-black">Facebook</span>
            <span className="mt-2 block text-[1.0625rem] font-semibold">Page « {infos.nom} » · écrivez-nous sur Messenger</span>
          </span>
        </a>
      )}
      {ig && (
        <a href={ig} target="_blank" rel="noopener" className="tile tile-lit tile-fuchsia tile-ink flex min-h-[13rem] flex-col justify-between p-6 sm:p-8">
          <Instagram className="size-9" strokeWidth={2.25} aria-hidden="true" />
          <span className="mt-8">
            <span className="font-display-tight block text-[clamp(1.75rem,4vw,2.75rem)] font-black">Instagram</span>
            <span className="mt-2 block text-[1.0625rem] font-semibold">{insta ?? 'Notre compte'} · envoyez-nous un message privé</span>
          </span>
        </a>
      )}
    </div>
  )
}
