import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { anyone, authenticated } from '@/access'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  typescript: { interface: 'Media' },
  labels: { singular: 'Image ou fichier', plural: 'Images et fichiers' },
  admin: {
    group: 'Contenu',
    description: 'Photos, logo et PDF. Une image de 1600 px de large suffit ; le site la redimensionne.',
  },
  access: { create: authenticated, delete: authenticated, read: anyone, update: authenticated },
  fields: [
    {
      name: 'alt',
      label: 'Description de l’image',
      type: 'text',
      required: true,
      admin: {
        description: 'Une phrase qui décrit la photo (lue par Google et par les lecteurs d’écran). Ex. « Enfants en roller en file indienne sur la piste ».',
      },
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../public/media'),
    adminThumbnail: 'miniature',
    focalPoint: true,
    mimeTypes: ['image/*', 'application/pdf'],
    imageSizes: [
      { name: 'miniature', width: 400, withoutEnlargement: true },
      { name: 'carte', width: 900, withoutEnlargement: true },
      { name: 'large', width: 1800, withoutEnlargement: true },
      { name: 'og', width: 1200, height: 630, crop: 'center', withoutEnlargement: true },
    ],
  },
}
