'use client'
import { useEffect, useState } from 'react'
import { fmt, getOpeningState, groupByDay, JOUR_LABEL, type Creneau, type OpeningState as State } from '@/lib/hours'

type Props = { horaires: Creneau[]; annonce?: string | null; className?: string }

export function OpeningState({ horaires, annonce, className = '' }: Props) {
  const [state, setState] = useState<State | null>(null)

  useEffect(() => {
    const tick = () => setState(getOpeningState(horaires))
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [horaires])

  const summary = groupByDay(horaires)
    .map((d) => `${JOUR_LABEL[d.jour].slice(0, 3)}. ${d.items.map((c) => `${fmt(c.ouverture)}–${fmt(c.fermeture)}`).join(', ')}`)
    .join(' · ')

  if (annonce) {
    return (
      <p className={className}>
        <span className="font-display text-[1.375rem] leading-tight">{annonce}</span>
      </p>
    )
  }

  if (!state) {
    return (
      <p className={className}>
        <span className="font-display text-[1.375rem] leading-tight">Ouvert au public le week-end</span>
        <span className="mt-2 block text-[0.9375rem] leading-snug">{summary}</span>
      </p>
    )
  }

  if (state.open) {
    return (
      <p className={className}>
        <span className="font-display text-[1.375rem] leading-tight">
          <span className="mr-2 inline-block size-3 rounded-full bg-ink align-middle motion-safe:animate-pulse" aria-hidden="true" />
          Ouvert jusqu’à {state.until}
        </span>
        <span className="mt-2 block text-[0.9375rem] leading-snug">{state.precision ?? summary}</span>
      </p>
    )
  }

  const next = state.next
  const when = next ? (next.isToday ? `aujourd’hui à ${next.ouverture}` : next.isTomorrow ? `demain à ${next.ouverture}` : `${JOUR_LABEL[next.jour].toLowerCase()} à ${next.ouverture}`) : null
  return (
    <p className={className}>
      <span className="font-display text-[1.375rem] leading-tight">{when ? `Ouvre ${when}` : 'Fermé pour le moment'}</span>
      <span className="mt-2 block text-[0.9375rem] leading-snug">{summary}</span>
    </p>
  )
}
