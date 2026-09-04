import type { GlobalConfig } from 'payload'
import { anyone, authenticated } from '@/access'
import { JOURS } from '@/collections/Cours'
import { ALL_PATHS, revalidateGlobal } from '@/hooks/revalidate'

export const InfosPratiques: GlobalConfig = {
  slug: 'infos-pratiques',
  typescript: { interface: 'InfosPratiques' },
  label: 'Infos pratiques',
  admin: {
    group: 'Réglages',
    description: 'Horaires, tarifs, adresse, téléphones : ces informations s’affichent sur toutes les pages.',
    livePreview: { url: '/' },
  },
  access: { read: anyone, update: authenticated },
  hooks: { afterChange: [revalidateGlobal(ALL_PATHS, ['infos-pratiques'])] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Horaires',
          fields: [
            {
              name: 'horaires',
              label: 'Ouverture au public (patinage libre)',
              labels: { singular: 'Créneau', plural: 'Créneaux' },
              type: 'array',
              admin: { description: 'Un créneau par ligne. Heures au format 14:00. Sert aussi à afficher « Ouvert en ce moment » sur le site.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'jour', label: 'Jour', type: 'select', options: JOURS, required: true, admin: { width: '25%' } },
                    { name: 'ouverture', label: 'Ouverture', type: 'text', required: true, admin: { width: '20%', placeholder: '14:00' } },
                    { name: 'fermeture', label: 'Fermeture', type: 'text', required: true, admin: { width: '20%', placeholder: '20:00' } },
                    { name: 'precision', label: 'Précision', type: 'text', admin: { width: '35%', placeholder: 'Jusqu’à minuit le 1er samedi du mois' } },
                  ],
                },
              ],
            },
            { name: 'mentionVacances', label: 'Vacances scolaires', type: 'text', admin: { description: 'Ex. « Ouvert tous les après-midis pendant les vacances scolaires ».' } },
            { name: 'seancesPrivees', label: 'Séances privées', type: 'text', admin: { description: 'Ex. « Mercredi 14h30–16h30, uniquement avec la carte d’abonnement ».' } },
            {
              name: 'annonce',
              label: 'Annonce du moment',
              type: 'group',
              admin: { description: 'Un message court affiché en haut du site (fermeture exceptionnelle, soirée spéciale, horaires de vacances).' },
              fields: [
                { name: 'active', label: 'Afficher l’annonce', type: 'checkbox', defaultValue: false },
                { name: 'texte', label: 'Texte', type: 'text', admin: { condition: (_, siblingData) => Boolean(siblingData?.active) } },
              ],
            },
          ],
        },
        {
          label: 'Tarifs',
          fields: [
            {
              name: 'tarifs',
              label: 'Tarifs',
              labels: { singular: 'Tarif', plural: 'Tarifs' },
              type: 'array',
              admin: { description: 'Le premier tarif s’affiche en grand sur l’accueil.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'libelle', label: 'Libellé', type: 'text', required: true, admin: { width: '45%', placeholder: 'Entrée' } },
                    { name: 'prix', label: 'Prix (€)', type: 'number', required: true, admin: { width: '20%', step: 0.5 } },
                    { name: 'precision', label: 'Précision', type: 'text', admin: { width: '35%', placeholder: 'Rollers non compris' } },
                  ],
                },
              ],
            },
            { name: 'tarifsNote', label: 'Note sous les tarifs', type: 'text', admin: { placeholder: 'Chaussettes obligatoires, protections recommandées.' } },
          ],
        },
        {
          label: 'Coordonnées',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'nom', label: 'Nom de l’enseigne', type: 'text', required: true, defaultValue: 'Au Taquet', admin: { width: '50%' } },
                { name: 'nomSite', label: 'Nom du site', type: 'text', required: true, defaultValue: 'Music Dance Roller', admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'telephone', label: 'Téléphone fixe', type: 'text', required: true, admin: { width: '33%' } },
                { name: 'telephoneMobile', label: 'Téléphone mobile', type: 'text', admin: { width: '33%' } },
                { name: 'email', label: 'E-mail', type: 'email', admin: { width: '34%' } },
              ],
            },
            {
              name: 'adresse',
              label: 'Adresse',
              type: 'group',
              fields: [
                { name: 'rue', label: 'Rue', type: 'text', required: true },
                {
                  type: 'row',
                  fields: [
                    { name: 'complement', label: 'Complément', type: 'text', admin: { width: '40%', placeholder: 'Zone de Belle Aire' } },
                    { name: 'codePostal', label: 'Code postal', type: 'text', required: true, admin: { width: '20%' } },
                    { name: 'ville', label: 'Ville', type: 'text', required: true, admin: { width: '40%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'latitude', label: 'Latitude', type: 'number', admin: { width: '50%', step: 0.000001 } },
                    { name: 'longitude', label: 'Longitude', type: 'number', admin: { width: '50%', step: 0.000001 } },
                  ],
                },
                { name: 'lienItineraire', label: 'Lien « Itinéraire » (Google Maps)', type: 'text' },
              ],
            },
            {
              name: 'reseaux',
              label: 'Réseaux sociaux',
              type: 'group',
              fields: [
                { name: 'facebook', label: 'Page Facebook (URL)', type: 'text' },
                { name: 'instagram', label: 'Compte Instagram (URL)', type: 'text' },
              ],
            },
            { name: 'logo', label: 'Logo', type: 'upload', relationTo: 'media' },
            {
              type: 'row',
              fields: [
                { name: 'raisonSociale', label: 'Raison sociale', type: 'text', admin: { width: '50%' } },
                { name: 'siret', label: 'SIRET', type: 'text', admin: { width: '50%' } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
