import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '@/access'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Patinoire: GlobalConfig = {
  slug: 'patinoire',
  typescript: { interface: 'Patinoire' },
  label: 'La patinoire',
  admin: { group: 'Pages', livePreview: { url: '/patinoire-roller-la-rochelle' } },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal(['/patinoire-roller-la-rochelle'])] },
  fields: [
    { name: 'titre', label: 'Titre', type: 'text', required: true },
    { name: 'intro', label: 'Introduction', type: 'richText' },
    { name: 'photo', label: 'Photo principale', type: 'upload', relationTo: 'media' },
    {
      name: 'chiffres',
      label: 'Chiffres clés',
      labels: { singular: 'Chiffre', plural: 'Chiffres' },
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'valeur', label: 'Valeur', type: 'text', required: true, admin: { width: '40%', placeholder: '1000 m²' } },
            { name: 'legende', label: 'Légende', type: 'text', required: true, admin: { width: '60%', placeholder: 'd’espace couvert' } },
          ],
        },
      ],
    },
    {
      name: 'equipements',
      label: 'Sur place',
      labels: { singular: 'Équipement', plural: 'Équipements' },
      type: 'array',
      fields: [
        { name: 'titre', label: 'Titre', type: 'text', required: true },
        { name: 'texte', label: 'Texte', type: 'text' },
      ],
    },
    {
      name: 'regles',
      label: 'À savoir avant de venir',
      labels: { singular: 'Règle', plural: 'Règles' },
      type: 'array',
      fields: [{ name: 'texte', label: 'Règle', type: 'text', required: true }],
    },
    { name: 'reglement', label: 'Règlement intérieur (PDF)', type: 'upload', relationTo: 'media' },
    { name: 'tarifsTitre', label: 'Titre de la section tarifs', type: 'text', defaultValue: 'Tarifs' },
  ],
}
