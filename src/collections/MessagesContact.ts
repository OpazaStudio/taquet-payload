import type { CollectionConfig } from 'payload'
import { authenticated } from '@/access'

export const MessagesContact: CollectionConfig = {
  slug: 'messages-contact',
  typescript: { interface: 'MessageContact' },
  labels: { singular: 'Message reçu', plural: 'Messages reçus' },
  admin: {
    useAsTitle: 'nom',
    defaultColumns: ['nom', 'email', 'telephone', 'createdAt', 'lu'],
    group: 'Administration',
    description: 'Les demandes envoyées depuis le formulaire de contact du site.',
  },
  access: { create: () => false, delete: authenticated, read: authenticated, update: authenticated },
  defaultSort: '-createdAt',
  fields: [
    { name: 'nom', label: 'Nom', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'email', label: 'E-mail', type: 'email', required: true, admin: { width: '50%' } },
        { name: 'telephone', label: 'Téléphone', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'message', label: 'Message', type: 'textarea', required: true },
    { name: 'lu', label: 'Traité', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}
