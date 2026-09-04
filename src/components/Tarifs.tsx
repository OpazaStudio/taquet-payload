import type { InfosPratiques } from '@/payload-types'
import { euros } from '@/lib/format'

export function Tarifs({ infos, titre = 'Tarifs' }: { infos: InfosPratiques; titre?: string }) {
  const tarifs = infos.tarifs ?? []
  if (!tarifs.length) return null
  return (
    <div>
      <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-black text-mirror">{titre}</h2>
      <ul className="mt-6 grid gap-px bg-chrome-700 sm:grid-cols-2 lg:grid-cols-4">
        {tarifs.map((t, i) => (
          <li key={t.id ?? i} className={`tile flex min-h-[9.5rem] flex-col justify-between p-5 ${i === 0 ? 'tile-facet tile-ink' : 'tile-chrome text-mirror'}`}>
            <span className="font-display text-[0.9375rem] font-bold leading-snug">{t.libelle}</span>
            <span className="mt-4">
              <span className="font-display-tight block text-[2.75rem] font-black leading-none">{euros(t.prix)}</span>
              {t.precision && <span className={`mt-2 block text-[0.9375rem] leading-snug ${i === 0 ? '' : 'text-chrome-300'}`}>{t.precision}</span>}
            </span>
          </li>
        ))}
      </ul>
      {infos.tarifsNote && <p className="mt-4 text-[0.9375rem] text-chrome-300">{infos.tarifsNote}</p>}
    </div>
  )
}
