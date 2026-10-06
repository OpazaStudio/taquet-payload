import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '@/access'
import { ALL_PATHS, revalidateGlobal } from '@/hooks/revalidate'
import { BASE_COULEURS, BLANC, CLE_RE, cleDepuis, HEX_RE, PAGES_APPARENCE, type LigneCouleur } from '@/lib/couleurs'
import { PAGE_FACET } from '@/lib/nav'

const lignesDe = (data: unknown): LigneCouleur[] => {
  const c = (data as { couleurs?: unknown } | undefined)?.couleurs
  return Array.isArray(c) ? (c as LigneCouleur[]) : []
}

export const Apparence: GlobalConfig = {
  slug: 'apparence',
  typescript: { interface: 'Apparence' },
  label: 'Couleurs',
  admin: {
    group: 'Réglages',
    description: 'La palette du site et la couleur de chaque page.',
    livePreview: { url: '/' },
  },
  access: { read: anyone, update: authenticated },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data || !Array.isArray(data.couleurs)) return data
        const prises = new Set<string>()
        for (const l of data.couleurs as LigneCouleur[]) {
          const cle = l.cle?.trim() ?? ''
          if (CLE_RE.test(cle) && cle !== BLANC && !prises.has(cle)) {
            l.cle = cle
          } else {
            l.cle = cleDepuis(l.nom ?? '', prises)
          }
          prises.add(l.cle)
        }
        return data
      },
    ],
    afterChange: [revalidateGlobal(ALL_PATHS, ['apparence'])],
  },
  fields: [
    {
      name: 'pages',
      label: 'Couleur de chaque page',
      type: 'group',
      admin: { description: 'La couleur choisie colore le titre de la page dans le menu, le bouton d’appel, les tuiles et les reflets de la boule à facettes. Une couleur ajoutée à la palette apparaît ici après l’enregistrement.' },
      fields: PAGES_APPARENCE.map((p) => ({
        name: p.name,
        label: p.label,
        type: 'text' as const,
        defaultValue: PAGE_FACET[p.path],
        required: true,
        validate: (v: unknown, { data }: { data: unknown }) => {
          const cles = lignesDe(data).map((l) => l.cle).filter(Boolean)
          const valides = cles.length ? cles : BASE_COULEURS.map((b) => b.cle)
          return typeof v === 'string' && valides.includes(v) ? true : 'Choisissez une couleur de la palette.'
        },
        admin: { width: '33%', components: { Field: '/components/admin/ChoixCouleur#ChoixCouleur' } },
      })),
    },
    {
      name: 'couleurs',
      label: 'Palette',
      labels: { singular: 'Couleur', plural: 'Couleurs' },
      type: 'array',
      minRows: 1,
      defaultValue: BASE_COULEURS,
      admin: {
        description: 'Les couleurs du site. Le texte posé dessus est toujours noir : préférez des teintes vives et claires. Le rose, l’orange et le bleu font partie de l’identité du site : vous pouvez changer leur teinte, pas les supprimer.',
        initCollapsed: true,
        components: { RowLabel: '/components/admin/LigneCouleur#LigneCouleur' },
      },
      validate: (v: unknown) => {
        const lignes = Array.isArray(v) ? (v as LigneCouleur[]) : []
        const manquantes = BASE_COULEURS.filter((b) => !lignes.some((l) => l.cle === b.cle))
        return manquantes.length ? `Couleur indispensable supprimée : ${manquantes.map((b) => b.nom).join(', ')}.` : true
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'nom', label: 'Nom', type: 'text', required: true, admin: { width: '50%', placeholder: 'Vert fluo' } },
            {
              name: 'hex',
              label: 'Teinte',
              type: 'text',
              required: true,
              validate: (v: unknown) => (typeof v === 'string' && HEX_RE.test(v.trim()) ? true : 'Format attendu : #ff3fa4'),
              admin: { width: '50%', components: { Field: '/components/admin/ChampCouleur#ChampCouleur' } },
            },
          ],
        },
        { name: 'cle', label: 'Identifiant', type: 'text', admin: { readOnly: true, description: 'Généré à l’enregistrement à partir du nom, puis figé.' } },
      ],
    },
  ],
}
