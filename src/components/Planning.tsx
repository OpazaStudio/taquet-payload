import type { Cours, InfosPratiques } from '@/payload-types'
import { fmt, JOURS, JOUR_LABEL, toMinutes, type Jour } from '@/lib/hours'
import { FACET_TILE_CLASS, type Facet } from '@/lib/nav'
import { PlanningReveal } from './PlanningReveal'

type Item = { jour: Jour; debut: string; fin?: string | null; label: string; sub?: string | null; tile: string; ink: boolean }

export function Planning({ cours, infos, compact = false }: { cours: Cours[]; infos: InfosPratiques; compact?: boolean }) {
  const items: Item[] = []
  for (const h of infos.horaires ?? []) {
    items.push({ jour: h.jour, debut: h.ouverture, fin: h.fermeture, label: 'Patinage libre', sub: h.precision, tile: 'tile-mirror', ink: true })
  }
  for (const c of cours) {
    for (const k of c.creneaux ?? []) {
      items.push({ jour: k.jour, debut: k.debut, fin: k.fin, label: c.nom, sub: k.niveau, tile: FACET_TILE_CLASS[(c.couleur ?? 'mandarine') as Facet], ink: true })
    }
  }
  const byDay = JOURS.map((jour) => ({
    jour,
    items: items.filter((i) => i.jour === jour).sort((a, b) => toMinutes(a.debut) - toMinutes(b.debut)),
  }))

  return (
    <PlanningReveal>
    <div className="bg-chrome-700">
      <ol className="grid gap-px md:grid-cols-7">
        {byDay.map((d) => (
          <li key={d.jour} className="flex flex-col gap-px bg-chrome-700">
            <h3 className={`bg-chrome-950 px-3 py-3 font-display text-[0.8125rem] font-bold uppercase tracking-[0.04em] text-mirror ${d.items.length === 0 ? 'text-chrome-500' : ''}`}>{JOUR_LABEL[d.jour]}</h3>
            <ol className={`flex flex-1 flex-col gap-px bg-chrome-700 ${d.items.length === 0 ? 'min-h-12 md:min-h-40' : ''}`}>
              {d.items.length === 0 && <li className="flex-1 bg-chrome-950 px-3 py-3 text-[0.875rem] text-chrome-500">Fermé au public</li>}
              {d.items.map((it, i) => (
                <li key={i} data-tile className={`tile ${it.tile} ${it.ink ? 'tile-ink' : ''} px-3 py-3 ${compact ? '' : 'md:py-4'}`}>
                  <span className="block text-[0.875rem] font-semibold tabular-nums">
                    {fmt(it.debut)}{it.fin ? `–${fmt(it.fin)}` : ''}
                  </span>
                  <span className="block font-display text-[0.9375rem] font-bold leading-tight">{it.label}</span>
                  {it.sub && !compact && <span className="mt-1 block text-[0.8125rem] leading-snug">{it.sub}</span>}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>
    </div>
    </PlanningReveal>
  )
}
