import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload, type Payload } from 'payload'
import config from '../src/payload.config'
import { ACCES, ACCUEIL, ANNIVERSAIRES, CONTACT, COURS, GALERIE, INFOS, MEDIA, MENTIONS, PAGE_COURS, PATINOIRE } from './content'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const ctx = () => ({ disableRevalidate: true })

async function ensureAdmin(payload: Payload) {
  const email = process.env.SEED_ADMIN_EMAIL || 'admin@musicdanceroller.com'
  const password = process.env.SEED_ADMIN_PASSWORD || 'autaquet-2026'
  const existing = await payload.find({ collection: 'users', where: { email: { equals: email } }, limit: 1 })
  if (existing.totalDocs) return payload.logger.info(`Utilisateur ${email} déjà présent.`)
  await payload.create({ collection: 'users', data: { email, password, nom: 'Gérant' } })
  payload.logger.info(`Utilisateur admin créé : ${email} (mot de passe à changer dès la première connexion).`)
}

async function uploadMedia(payload: Payload): Promise<Record<string, number>> {
  const ids: Record<string, number> = {}
  for (const [key, m] of Object.entries(MEDIA)) {
    const found = await payload.find({ collection: 'media', where: { filename: { equals: m.file } }, limit: 1 })
    if (found.docs[0]) { ids[key] = found.docs[0].id; continue }
    const doc = await payload.create({ collection: 'media', data: { alt: m.alt }, filePath: path.join(dirname, 'media', m.file), context: ctx() })
    ids[key] = doc.id
    payload.logger.info(`Média ajouté : ${m.file}`)
  }
  return ids
}

async function seed() {
  const payload = await getPayload({ config })
  payload.logger.info('Seed : début')

  await ensureAdmin(payload)
  const media = await uploadMedia(payload)
  const m = (key?: string) => (key ? media[key] : undefined)

  await payload.updateGlobal({ slug: 'infos-pratiques', context: ctx(), data: { ...INFOS, logo: m('logo') } as never })

  await payload.updateGlobal({
    slug: 'accueil', context: ctx(),
    data: {
      ...ACCUEIL,
      bandeau: { ...ACCUEIL.bandeau, photo: m(ACCUEIL.bandeau.photo) },
      univers: ACCUEIL.univers.map((u) => ({ ...u, photo: m(u.photo) })),
    } as never,
  })
  await payload.updateGlobal({ slug: 'patinoire', context: ctx(), data: { ...PATINOIRE, photo: m(PATINOIRE.photo), reglement: m(PATINOIRE.reglement) } as never })
  await payload.updateGlobal({ slug: 'page-cours', context: ctx(), data: { ...PAGE_COURS, photo: m(PAGE_COURS.photo) } as never })
  await payload.updateGlobal({ slug: 'anniversaires', context: ctx(), data: { ...ANNIVERSAIRES, photo: m(ANNIVERSAIRES.photo), carteInvitation: m(ANNIVERSAIRES.carteInvitation) } as never })
  await payload.updateGlobal({ slug: 'acces', context: ctx(), data: { ...ACCES, photo: m(ACCES.photo) } as never })
  await payload.updateGlobal({ slug: 'contact', context: ctx(), data: { ...CONTACT, photo: m(CONTACT.photo) } as never })
  await payload.updateGlobal({ slug: 'mentions-legales', context: ctx(), data: MENTIONS as never })
  payload.logger.info('Pages remplies.')

  const coursExistants = await payload.count({ collection: 'cours' })
  if (coursExistants.totalDocs === 0) {
    for (const c of COURS) {
      await payload.create({ collection: 'cours', context: ctx(), data: { ...c, image: m(c.image) } as never })
    }
    payload.logger.info(`${COURS.length} cours créés.`)
  }

  const photosExistantes = await payload.count({ collection: 'galerie-photos' })
  if (photosExistantes.totalDocs === 0) {
    let ordre = 1
    for (const g of GALERIE) {
      await payload.create({ collection: 'galerie-photos', context: ctx(), data: { image: media[g.media], legende: g.legende, ordre: ordre++ } })
    }
    payload.logger.info(`${GALERIE.length} photos de galerie créées.`)
  }

  payload.logger.info('Seed : terminé.')
  process.exit(0)
}

seed().catch((e) => { console.error(e); process.exit(1) })
