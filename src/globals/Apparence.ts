import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '@/access'
import { ALL_PATHS, revalidateGlobal } from '@/hooks/revalidate'
import { FACET_LABEL, FACETS, HEX_RE, PAGES_APPARENCE } from '@/lib/couleurs'
import { FACET_HEX, PAGE_FACET } from '@/lib/nav'

const optionsCouleur = FACETS.map((f) => ({ label: FACET_LABEL[f], value: f }))

export const Apparence: GlobalConfig = {
  slug: 'apparence',
  typescript: { interface: 'Apparence' },
  label: 'Couleurs',
  admin: {
    group: 'Réglages',
    description: 'La couleur de chaque page et les trois couleurs de la palette du site.',
    livePreview: { url: '/' },
  },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal(ALL_PATHS, ['apparence'])] },
  fields: [
    {
      name: 'pages',
      label: 'Couleur de chaque page',
      type: 'group',
      admin: { description: 'La couleur choisie colore le titre de la page dans le menu, le bouton d’appel, les tuiles et les reflets de la boule à facettes.' },
      fields: PAGES_APPARENCE.map((p) => ({
        name: p.name,
        label: p.label,
        type: 'select' as const,
        options: optionsCouleur,
        defaultValue: PAGE_FACET[p.path],
        required: true,
        admin: { width: '33%' },
      })),
    },
    {
      name: 'palette',
      label: 'Palette',
      type: 'group',
      admin: { description: 'Les trois couleurs du site. Le texte posé dessus est toujours noir : préférez des teintes vives et claires.' },
      fields: [
        {
          type: 'row',
          fields: FACETS.map((f) => ({
            name: f,
            label: FACET_LABEL[f],
            type: 'text' as const,
            defaultValue: FACET_HEX[f],
            required: true,
            validate: (v: unknown) => (typeof v === 'string' && HEX_RE.test(v.trim()) ? true : 'Format attendu : #ff3fa4'),
            admin: { width: '33%', components: { Field: '/components/admin/ChampCouleur#ChampCouleur' } },
          })),
        },
      ],
    },
  ],
}
