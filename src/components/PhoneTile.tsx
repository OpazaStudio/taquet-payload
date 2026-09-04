import { Phone } from 'lucide-react'
import { telHref } from '@/lib/format'

export function PhoneTile({ telephone, label = 'Appeler pour réserver', className = '', compact = false }: { telephone: string; label?: string; className?: string; compact?: boolean }) {
  return (
    <a href={telHref(telephone)} className={`tile tile-lit tile-facet tile-ink flex flex-col p-5 ${compact ? 'self-start' : 'justify-between'} ${className}`}>
      <span className="flex items-center gap-2 font-display text-[0.9375rem] font-bold"><Phone className="size-5" strokeWidth={2.5} aria-hidden="true" />{label}</span>
      <span className={`font-display-tight block text-[clamp(1.125rem,4.7vw,2rem)] font-black tabular-nums ${compact ? 'mt-3' : 'mt-6'}`}>{telephone}</span>
    </a>
  )
}
