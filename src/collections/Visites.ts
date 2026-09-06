import { createHash } from 'crypto'
import type { CollectionConfig, PayloadHandler } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import { authenticated } from '@/access'
import { drizzleDe } from '@/lib/db'

const BOT_RE = /bot|crawl|spider|slurp|preview|fetch|monitor|headless|lighthouse|pingdom|facebookexternalhit|whatsapp|telegram|curl|wget|python|node-fetch|axios|go-http/i

export const jourParis = (d = new Date()) => new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d)

const cheminValide = (v: unknown): string | null => {
  if (typeof v !== 'string' || !v.startsWith('/') || v.length > 200 || v.startsWith('//')) return null
  const c = v.split(/[?#]/)[0].replace(/\/+$/, '') || '/'
  return c.startsWith('/admin') || c.startsWith('/api') || /[^\w\-/%.~]/.test(c) ? null : c
}

const enregistrer: PayloadHandler = async (req) => {
  const ok = Response.json({ ok: true })
  if (req.user) return ok
  let corps: { chemin?: unknown } = {}
  try { corps = (await req.json?.()) ?? {} } catch {}
  const chemin = cheminValide(corps.chemin)
  const ua = req.headers.get('user-agent') ?? ''
  if (!chemin || !ua || BOT_RE.test(ua)) return ok
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || req.headers.get('x-real-ip') || ''
  const jour = jourParis()
  const visiteur = createHash('sha256').update(`${req.payload.secret}|${jour}|${ip}|${ua}`).digest('hex').slice(0, 20)
  const db = drizzleDe(req.payload)
  await db.execute(sql`
    insert into visites (jour, chemin, visiteur, vues, updated_at, created_at)
    values (${jour}, ${chemin}, ${visiteur}, 1, now(), now())
    on conflict (jour, chemin, visiteur) do update set vues = visites.vues + 1, updated_at = now()`)
  if (Math.random() < 0.01) {
    const limite = new Date()
    limite.setMonth(limite.getMonth() - 13)
    await db.execute(sql`delete from visites where jour < ${jourParis(limite)}`)
  }
  return ok
}

export const Visites: CollectionConfig = {
  slug: 'visites',
  typescript: { interface: 'Visite' },
  labels: { singular: 'Visite', plural: 'Visites' },
  admin: { hidden: true },
  access: { create: () => false, delete: authenticated, read: authenticated, update: () => false },
  indexes: [{ fields: ['jour', 'chemin', 'visiteur'], unique: true }],
  endpoints: [{ path: '/enregistrer', method: 'post', handler: enregistrer }],
  fields: [
    { name: 'jour', type: 'text', required: true, index: true },
    { name: 'chemin', type: 'text', required: true },
    { name: 'visiteur', type: 'text', required: true },
    { name: 'vues', type: 'number', required: true, defaultValue: 1 },
  ],
}
