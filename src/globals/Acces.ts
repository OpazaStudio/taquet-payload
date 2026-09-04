import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '@/access'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Acces: GlobalConfig = {
  slug: 'acces',
  typescript: { interface: 'Acces' },
  label: 'Accès',
  admin: { group: 'Pages', livePreview: { url: '/acces' } },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal(['/acces'])] },
  fields: [
    { name: 'titre', label: 'Titre', type: 'text', required: true },
    { name: 'intro', label: 'Introduction', type: 'textarea' },
    {
      name: 'itineraires',
      label: 'Itinéraires',
      labels: { singular: 'Itinéraire', plural: 'Itinéraires' },
      type: 'array',
      fields: [
        { name: 'depuis', label: 'En venant de', type: 'text', required: true, admin: { placeholder: 'Rochefort' } },
        { name: 'instructions', label: 'Instructions', type: 'textarea', required: true },
      ],
    },
    { name: 'carteEmbed', label: 'Carte Google Maps (URL d’intégration)', type: 'text', admin: { description: 'Sur Google Maps : Partager → Intégrer une carte → copier uniquement l’adresse qui commence par https://www.google.com/maps/embed.' } },
    { name: 'photo', label: 'Photo', type: 'upload', relationTo: 'media' },
  ],
}
