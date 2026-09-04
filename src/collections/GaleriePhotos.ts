import type { CollectionConfig } from 'payload'
import { anyone, authenticated } from '@/access'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'

export const GaleriePhotos: CollectionConfig = {
  slug: 'galerie-photos',
  typescript: { interface: 'GaleriePhoto' },
  labels: { singular: 'Photo de la galerie', plural: 'Galerie photos' },
  admin: {
    useAsTitle: 'legende',
    defaultColumns: ['image', 'legende', 'ordre'],
    group: 'Contenu',
    description: 'Les photos de la page Galerie. Les premières (ordre le plus petit) apparaissent aussi sur l’accueil.',
  },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  defaultSort: 'ordre',
  hooks: {
    afterChange: [revalidateCollection(['/', '/galerie'])],
    afterDelete: [revalidateCollectionDelete(['/', '/galerie'])],
  },
  fields: [
    { name: 'image', label: 'Photo', type: 'upload', relationTo: 'media', required: true },
    { name: 'legende', label: 'Légende', type: 'text', required: true },
    { name: 'ordre', label: 'Ordre', type: 'number', defaultValue: 10, admin: { position: 'sidebar' } },
  ],
}
