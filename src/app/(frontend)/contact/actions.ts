'use server'
import { getPayloadClient } from '@/lib/payload'

export type EtatFormulaire = { ok: boolean; erreur?: string; champs?: Record<string, string> }

const clean = (v: FormDataEntryValue | null, max = 2000) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export async function envoyerMessage(_prev: EtatFormulaire, formData: FormData): Promise<EtatFormulaire> {
  if (clean(formData.get('site_web'))) return { ok: true }
  const nom = clean(formData.get('nom'), 120)
  const email = clean(formData.get('email'), 200)
  const telephone = clean(formData.get('telephone'), 40)
  const message = clean(formData.get('message'), 4000)
  const champs = { nom, email, telephone, message }

  if (!nom || !email || !message) return { ok: false, erreur: 'Merci d’indiquer votre nom, votre e-mail et votre message.', champs }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, erreur: 'L’adresse e-mail ne semble pas valide.', champs }

  try {
    const payload = await getPayloadClient()
    await payload.create({ collection: 'messages-contact', data: { nom, email, telephone, message }, overrideAccess: true })

    const to = process.env.CONTACT_TO_EMAIL
    const key = process.env.RESEND_API_KEY
    if (to && key) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Site Au Taquet <site@musicdanceroller.com>',
          to: [to],
          reply_to: email,
          subject: `Message du site : ${nom}`,
          text: `Nom : ${nom}\nE-mail : ${email}\nTéléphone : ${telephone || '—'}\n\n${message}`,
        }),
      }).catch((e) => payload.logger.warn(`Envoi Resend impossible : ${e}`))
    }
    return { ok: true }
  } catch (e) {
    console.error(e)
    return { ok: false, erreur: 'Le message n’a pas pu être envoyé. Appelez-nous ou réessayez dans un instant.', champs }
  }
}
