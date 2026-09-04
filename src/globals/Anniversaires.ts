import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '@/access'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Anniversaires: GlobalConfig = {
  slug: 'anniversaires',
  typescript: { interface: 'Anniversaires' },
  label: 'Anniversaires',
  admin: { group: 'Pages', livePreview: { url: '/anniversaires' } },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal(['/anniversaires', '/'])] },
  fields: [
    { name: 'titre', label: 'Titre', type: 'text', required: true },
    { name: 'intro', label: 'Introduction', type: 'richText' },
    { name: 'photo', label: 'Photo', type: 'upload', relationTo: 'media' },
    {
      name: 'formules',
      label: 'Formules',
      labels: { singular: 'Formule', plural: 'Formules' },
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'nom', label: 'Nom', type: 'text', required: true, admin: { width: '40%', placeholder: 'Après-midi' } },
            { name: 'creneau', label: 'Créneau', type: 'text', admin: { width: '35%', placeholder: 'Samedi et dimanche après-midi' } },
            { name: 'prix', label: 'Prix / pers. (€)', type: 'number', required: true, admin: { width: '25%', step: 0.5 } },
          ],
        },
        {
          name: 'inclus',
          label: 'Ce qui est compris',
          labels: { singular: 'Élément', plural: 'Éléments' },
          type: 'array',
          fields: [{ name: 'texte', label: 'Élément', type: 'text', required: true }],
        },
        { name: 'note', label: 'Note', type: 'text', admin: { placeholder: 'Goûter au choix : maxi cookie, part de gâteau, muffin, donut.' } },
      ],
    },
    { name: 'acompte', label: 'Acompte à la réservation (€)', type: 'number' },
    { name: 'conditions', label: 'Conditions', type: 'richText' },
    { name: 'carteInvitation', label: 'Carte d’invitation (PDF)', type: 'upload', relationTo: 'media' },
  ],
}
