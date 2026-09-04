import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/access'
import { slugField } from '@/fields/slug'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

const paths = (doc: { slug?: string }) => ['/', '/actualites', ...(doc?.slug ? [`/actualites/${doc.slug}`] : [])]

export const Actualites: CollectionConfig = {
  slug: 'actualites',
  typescript: { interface: 'Actualite' },
  labels: { singular: 'Actualité', plural: 'Actualités' },
  admin: {
    useAsTitle: 'titre',
    defaultColumns: ['titre', 'date', 'publie'],
    group: 'Contenu',
    description: 'Soirées, événements, fermetures exceptionnelles. Les actualités publiées apparaissent sur l’accueil.',
    livePreview: { url: ({ data }) => `/actualites/${data?.slug ?? ''}` },
  },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  defaultSort: '-date',
  hooks: {
    afterChange: [revalidateCollection(paths)],
    afterDelete: [revalidateCollectionDelete(paths)],
  },
  fields: [
    { name: 'titre', label: 'Titre', type: 'text', required: true },
    { name: 'date', label: 'Date', type: 'date', required: true, defaultValue: () => new Date().toISOString(), admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' } } },
    { name: 'publie', label: 'Publiée', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    slugField('titre'),
    { name: 'image', label: 'Photo', type: 'upload', relationTo: 'media' },
    { name: 'resume', label: 'Résumé', type: 'textarea', required: true, admin: { description: 'Une ou deux phrases affichées dans la liste et sur l’accueil.' } },
    { name: 'contenu', label: 'Texte', type: 'richText' },
  ],
}
