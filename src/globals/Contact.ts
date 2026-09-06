import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '@/access'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Contact: GlobalConfig = {
  slug: 'contact',
  typescript: { interface: 'Contact' },
  label: 'Contact',
  admin: { group: 'Pages', livePreview: { url: '/contact' } },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal(['/contact'])] },
  fields: [
    { name: 'titre', label: 'Titre', type: 'text', required: true },
    { name: 'intro', label: 'Introduction', type: 'textarea' },
    {
      name: 'reseaux',
      label: 'Écrire sur les réseaux',
      type: 'group',
      admin: { description: 'Les liens Facebook et Instagram se règlent dans Réglages → Infos pratiques.' },
      fields: [
        { name: 'titre', label: 'Titre', type: 'text', defaultValue: 'Écrivez-nous sur les réseaux' },
        { name: 'texte', label: 'Texte', type: 'textarea', defaultValue: 'Une question, une réservation d’anniversaire, une privatisation ? Envoyez-nous un message sur Facebook ou Instagram : nous répondons rapidement.' },
      ],
    },
    { name: 'photo', label: 'Photo', type: 'upload', relationTo: 'media' },
  ],
}
