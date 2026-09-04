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
    { name: 'messageSucces', label: 'Message après envoi', type: 'text', defaultValue: 'Merci, votre message est bien arrivé. Nous vous répondons au plus vite.' },
    { name: 'photo', label: 'Photo', type: 'upload', relationTo: 'media' },
  ],
}
