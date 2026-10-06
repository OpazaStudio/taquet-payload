'use client'
import { useEffect, useState } from 'react'
import { fmt, fmtFin, getOpeningState, groupByDay, JOUR_LABEL, type Creneau, type OpeningState as State } from '@/lib/hours'

type Props = { horaires: Creneau[]; annonce?: string | null; className?: string }

export function OpeningState({ horaires, annonce, className = '' }: Props) {
  const [state, setState] = useState<State | null>(null)

  useEffect(() => {
    const tick = () => setState(getOpeningState(horaires))
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [horaires])

  const summary = (
    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[0.9375rem] leading-snug">
      {groupByDay(horaires).map((d) => (
        <div key={d.jour} className="contents">
          <dt className="font-semibold">{JOUR_LABEL[d.jour].slice(0, 3)}.</dt>
          <dd>
            {d.items.map((c, i) => (
              <span key={i} className="block">
                <span className="tabular-nums">{fmt(c.ouverture)}–{fmtFin(c.fermeture)}</span>
                {c.precision && <span className="block text-[0.8125rem] opacity-75">{c.precision}</span>}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  )

  if (annonce) {
    return (
      <div className={className}>
        <span className="block font-display text-[1.375rem] leading-tight">{annonce}</span>
      </div>
    )
  }

  if (!state) {
    return (
      <div className={className}>
        <span className="block font-display text-[1.375rem] leading-tight">Ouvert au public le week-end</span>
        {summary}
      </div>
    )
  }

  if (state.open) {
    return (
      <div className={className}>
        <span className="block font-display text-[1.375rem] leading-tight">
          <span className="mr-2 inline-block size-3 rounded-full bg-ink align-middle motion-safe:animate-pulse" aria-hidden="true" />
          Ouvert jusqu’à {state.until}
        </span>
        {summary}
      </div>
    )
  }

  const next = state.next
  const when = next ? (next.isToday ? `aujourd’hui à ${next.ouverture}` : next.isTomorrow ? `demain à ${next.ouverture}` : `${JOUR_LABEL[next.jour].toLowerCase()} à ${next.ouverture}`) : null
  return (
    <div className={className}>
      <span className="block font-display text-[1.375rem] leading-tight">{when ? `Ouvre ${when}` : 'Fermé pour le moment'}</span>
      {summary}
    </div>
  )
}
