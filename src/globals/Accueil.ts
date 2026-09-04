import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '@/access'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Accueil: GlobalConfig = {
  slug: 'accueil',
  typescript: { interface: 'Accueil' },
  label: 'Accueil',
  admin: { group: 'Pages', livePreview: { url: '/' } },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal(['/'])] },
  fields: [
    {
      name: 'bandeau',
      label: 'Bandeau d’accueil',
      type: 'group',
      fields: [
        { name: 'titre', label: 'Titre', type: 'text', required: true, admin: { description: 'En très grand. Ex. « Music Dance Roller ».' } },
        { name: 'sousTitre', label: 'Sous-titre', type: 'text', required: true, admin: { description: 'Ex. « La patinoire roller couverte de La Rochelle ».' } },
        { name: 'accroche', label: 'Accroche', type: 'textarea', admin: { description: 'Deux phrases maximum.' } },
        { name: 'photo', label: 'Photo du bandeau', type: 'upload', relationTo: 'media' },
        { name: 'boutonSecondaire', label: 'Bouton secondaire', type: 'group', fields: [
          { name: 'texte', label: 'Texte', type: 'text', defaultValue: 'Réserver un anniversaire' },
          { name: 'lien', label: 'Lien', type: 'text', defaultValue: '/anniversaires' },
        ] },
      ],
    },
    {
      name: 'presentation',
      label: 'Présentation',
      type: 'group',
      fields: [
        { name: 'titre', label: 'Titre', type: 'text', required: true },
        { name: 'texte', label: 'Texte', type: 'richText' },
      ],
    },
    {
      name: 'univers',
      label: 'Les trois univers',
      labels: { singular: 'Univers', plural: 'Univers' },
      type: 'array',
      minRows: 3,
      maxRows: 3,
      admin: { description: 'Roller libre, cours, anniversaires : trois panneaux sur l’accueil.' },
      fields: [
        { name: 'titre', label: 'Titre', type: 'text', required: true },
        { name: 'texte', label: 'Texte', type: 'textarea', required: true },
        {
          type: 'row',
          fields: [
            { name: 'chiffre', label: 'Chiffre mis en avant', type: 'text', admin: { width: '40%', placeholder: '500 m²' } },
            { name: 'chiffreLegende', label: 'Légende du chiffre', type: 'text', admin: { width: '60%', placeholder: 'de piste' } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'lienTexte', label: 'Texte du lien', type: 'text', required: true, admin: { width: '50%' } },
            { name: 'lien', label: 'Lien', type: 'text', required: true, admin: { width: '50%', placeholder: '/cours' } },
          ],
        },
        { name: 'photo', label: 'Photo', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'privatisation',
      label: 'Privatisation',
      type: 'group',
      fields: [
        { name: 'titre', label: 'Titre', type: 'text' },
        { name: 'texte', label: 'Texte', type: 'textarea' },
      ],
    },
  ],
}
