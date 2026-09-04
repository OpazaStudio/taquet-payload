'use client'
import { useActionState } from 'react'
import { Send } from 'lucide-react'
import { envoyerMessage, type EtatFormulaire } from './actions'

const field = 'tile tile-chrome w-full px-4 py-3 text-mirror placeholder:text-chrome-500 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-mirror'
const label = 'block font-display text-[0.8125rem] font-bold text-mirror'

export function ContactForm({ messageSucces }: { messageSucces: string }) {
  const [etat, action, pending] = useActionState<EtatFormulaire, FormData>(envoyerMessage, { ok: false })

  if (etat.ok) {
    return (
      <div className="tile tile-fuchsia tile-ink p-6" role="status">
        <p className="font-display text-[1.25rem] font-black leading-tight">{messageSucces}</p>
      </div>
    )
  }

  return (
    <form action={action} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className={label}>Votre nom</label>
          <input id="nom" name="nom" required autoComplete="name" defaultValue={etat.champs?.nom} className={`mt-2 ${field}`} />
        </div>
        <div>
          <label htmlFor="telephone" className={label}>Téléphone <span className="font-normal text-chrome-300">(facultatif)</span></label>
          <input id="telephone" name="telephone" type="tel" autoComplete="tel" defaultValue={etat.champs?.telephone} className={`mt-2 ${field}`} />
        </div>
      </div>
      <div>
        <label htmlFor="email" className={label}>Votre e-mail</label>
        <input id="email" name="email" type="email" required autoComplete="email" defaultValue={etat.champs?.email} className={`mt-2 ${field}`} />
      </div>
      <div>
        <label htmlFor="message" className={label}>Votre demande</label>
        <textarea id="message" name="message" required rows={6} defaultValue={etat.champs?.message} placeholder="Date, nombre de personnes, ce que vous avez en tête…" className={`mt-2 ${field} resize-y`} />
      </div>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="site_web">Ne pas remplir</label>
        <input id="site_web" name="site_web" tabIndex={-1} autoComplete="off" />
      </div>
      {etat.erreur && <p role="alert" className="tile tile-mandarine tile-ink px-4 py-3 text-[0.9375rem] font-semibold">{etat.erreur}</p>}
      <button type="submit" disabled={pending} aria-busy={pending} className="tile tile-lit tile-facet tile-ink inline-flex items-center justify-center gap-3 px-6 py-4 font-display text-[0.9375rem] font-bold disabled:opacity-60 sm:justify-self-start">
        <Send className="size-4" strokeWidth={2.5} aria-hidden="true" />{pending ? 'Envoi…' : 'Envoyer le message'}
      </button>
    </form>
  )
}
