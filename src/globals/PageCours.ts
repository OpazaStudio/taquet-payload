import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '@/access'
import { revalidateGlobal } from '@/hooks/revalidate'

export const PageCours: GlobalConfig = {
  slug: 'page-cours',
  typescript: { interface: 'PageCours' },
  label: 'Cours (page)',
  admin: { group: 'Pages', livePreview: { url: '/cours' }, description: 'Le texte d’introduction. Les cours eux-mêmes se gèrent dans Contenu → Cours.' },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal(['/cours'])] },
  fields: [
    { name: 'titre', label: 'Titre', type: 'text', required: true },
    { name: 'saison', label: 'Saison', type: 'text', admin: { placeholder: 'Saison 2025 / 2026' } },
    { name: 'intro', label: 'Introduction', type: 'richText' },
    { name: 'photo', label: 'Photo', type: 'upload', relationTo: 'media' },
    { name: 'note', label: 'Note sous les cours', type: 'text', admin: { placeholder: 'Inscriptions et renseignements directement auprès de chaque intervenant.' } },
  ],
}
