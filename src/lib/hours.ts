export type Jour = 'lundi' | 'mardi' | 'mercredi' | 'jeudi' | 'vendredi' | 'samedi' | 'dimanche'

export type Creneau = { jour: Jour; ouverture: string; fermeture: string; precision?: string | null }

export const JOURS: Jour[] = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche']
export const JOUR_LABEL: Record<Jour, string> = {
  lundi: 'Lundi', mardi: 'Mardi', mercredi: 'Mercredi', jeudi: 'Jeudi', vendredi: 'Vendredi', samedi: 'Samedi', dimanche: 'Dimanche',
}

export const toMinutes = (h: string): number => {
  const m = h.trim().match(/^(\d{1,2})\s*[:h.]?\s*(\d{0,2})$/i)
  if (!m) return NaN
  return parseInt(m[1], 10) * 60 + (m[2] ? parseInt(m[2], 10) : 0)
}

export const fmt = (h: string | number): string => {
  const mins = typeof h === 'number' ? h : toMinutes(h)
  if (Number.isNaN(mins)) return String(h)
  const hh = Math.floor(mins / 60) % 24
  const mm = mins % 60
  return mm === 0 ? `${hh}h` : `${hh}h${String(mm).padStart(2, '0')}`
}

export const nowInParis = (date = new Date()): { jour: Jour; minutes: number } => {
  const parts = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Europe/Paris', weekday: 'long', hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const weekday = get('weekday').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '') as Jour
  return { jour: weekday, minutes: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) }
}

export type OpeningState =
  | { open: true; until: string; precision?: string | null }
  | { open: false; next: { jour: Jour; ouverture: string; isToday: boolean; isTomorrow: boolean } | null }

export const getOpeningState = (horaires: Creneau[], date = new Date()): OpeningState => {
  if (!horaires?.length) return { open: false, next: null }
  const { jour, minutes } = nowInParis(date)
  const todayIdx = JOURS.indexOf(jour)
  for (const c of horaires) {
    if (c.jour !== jour) continue
    const o = toMinutes(c.ouverture)
    const f = toMinutes(c.fermeture)
    const end = f <= o ? f + 24 * 60 : f
    if (minutes >= o && minutes < end) return { open: true, until: fmt(f), precision: c.precision }
  }
  for (let offset = 0; offset < 7; offset++) {
    const j = JOURS[(todayIdx + offset) % 7]
    const candidates = horaires
      .filter((c) => c.jour === j && (offset > 0 || toMinutes(c.ouverture) > minutes))
      .sort((a, b) => toMinutes(a.ouverture) - toMinutes(b.ouverture))
    if (candidates[0]) {
      return { open: false, next: { jour: j, ouverture: fmt(candidates[0].ouverture), isToday: offset === 0, isTomorrow: offset === 1 } }
    }
  }
  return { open: false, next: null }
}

export const groupByDay = <T extends { jour: Jour }>(items: T[]): Array<{ jour: Jour; items: T[] }> =>
  JOURS.map((jour) => ({ jour, items: items.filter((i) => i.jour === jour) })).filter((d) => d.items.length > 0)

export const toSchemaHours = (horaires: Creneau[]): string[] => {
  const abbr: Record<Jour, string> = { lundi: 'Mo', mardi: 'Tu', mercredi: 'We', jeudi: 'Th', vendredi: 'Fr', samedi: 'Sa', dimanche: 'Su' }
  const pad = (h: string) => {
    const m = toMinutes(h)
    return Number.isNaN(m) ? h : `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
  }
  return horaires.map((c) => `${abbr[c.jour]} ${pad(c.ouverture)}-${pad(c.fermeture)}`)
}
