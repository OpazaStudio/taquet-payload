import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function reset() {
  const payload = await getPayload({ config })
  for (const collection of ['galerie-photos', 'cours', 'actualites', 'media'] as const) {
    const res = await payload.delete({ collection, where: { id: { exists: true } }, context: { disableRevalidate: true } })
    payload.logger.info(`${collection} : ${res.docs.length} supprimé(s)${res.errors.length ? `, ${res.errors.length} erreur(s)` : ''}`)
    for (const e of res.errors) payload.logger.error(e)
  }
  process.exit(0)
}

reset().catch((e) => { console.error(e); process.exit(1) })
