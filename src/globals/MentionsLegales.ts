import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '@/access'
import { revalidateGlobal } from '@/hooks/revalidate'

export const MentionsLegales: GlobalConfig = {
  slug: 'mentions-legales',
  typescript: { interface: 'MentionsLegales' },
  label: 'Mentions légales',
  admin: { group: 'Pages', livePreview: { url: '/mentions-legales' } },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal(['/mentions-legales'])] },
  fields: [
    { name: 'titre', label: 'Titre', type: 'text', required: true, defaultValue: 'Mentions légales' },
    { name: 'contenu', label: 'Contenu', type: 'richText' },
  ],
}
