import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/access'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const JOURS = [
  { label: 'Lundi', value: 'lundi' },
  { label: 'Mardi', value: 'mardi' },
  { label: 'Mercredi', value: 'mercredi' },
  { label: 'Jeudi', value: 'jeudi' },
  { label: 'Vendredi', value: 'vendredi' },
  { label: 'Samedi', value: 'samedi' },
  { label: 'Dimanche', value: 'dimanche' },
]

export const COULEURS = [
  { label: 'Fuchsia', value: 'fuchsia' },
  { label: 'Mandarine', value: 'mandarine' },
  { label: 'Aqua', value: 'aqua' },
  { label: 'Blanc', value: 'blanc' },
]

export const Cours: CollectionConfig = {
  slug: 'cours',
  typescript: { interface: 'Cours' },
  labels: { singular: 'Cours', plural: 'Cours' },
  admin: {
    useAsTitle: 'nom',
    defaultColumns: ['nom', 'intervenant', 'ordre'],
    group: 'Contenu',
    description: 'Un cours par intervenant. Ils s’affichent sur la page Cours et dans le planning de la semaine.',
  },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  defaultSort: 'ordre',
  hooks: {
    afterChange: [revalidateCollection(['/', '/cours'])],
    afterDelete: [revalidateCollectionDelete(['/', '/cours'])],
  },
  fields: [
    { name: 'nom', label: 'Nom du cours', type: 'text', required: true, admin: { description: 'Ex. « Roller », « Roller dance », « Zumba ».' } },
    {
      type: 'row',
      fields: [
        { name: 'intervenant', label: 'Intervenant·e', type: 'text', admin: { width: '50%' } },
        { name: 'organisme', label: 'Association / organisme', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'telephone', label: 'Téléphone d’inscription', type: 'text', admin: { width: '50%' } },
        { name: 'siteWeb', label: 'Site web', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'description', label: 'Description courte', type: 'textarea', admin: { description: 'Niveaux, public, ce qu’il faut savoir. 2 ou 3 phrases.' } },
    {
      name: 'creneaux',
      label: 'Créneaux',
      labels: { singular: 'Créneau', plural: 'Créneaux' },
      type: 'array',
      admin: { description: 'Un créneau par ligne. Les heures au format 17:00.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'jour', label: 'Jour', type: 'select', options: JOURS, required: true, admin: { width: '25%' } },
            { name: 'debut', label: 'Début', type: 'text', required: true, admin: { width: '20%', placeholder: '17:00' } },
            { name: 'fin', label: 'Fin', type: 'text', admin: { width: '20%', placeholder: '19:00' } },
            { name: 'niveau', label: 'Niveau / public', type: 'text', admin: { width: '35%', placeholder: 'Débutants' } },
          ],
        },
      ],
    },
    { name: 'image', label: 'Photo', type: 'upload', relationTo: 'media' },
    { name: 'couleur', label: 'Couleur de la tuile', type: 'select', options: COULEURS, defaultValue: 'mandarine', admin: { position: 'sidebar' } },
    { name: 'ordre', label: 'Ordre d’affichage', type: 'number', defaultValue: 10, admin: { position: 'sidebar' } },
  ],
}
