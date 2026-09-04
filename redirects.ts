import type { NextConfig } from 'next'

const anciennes: Array<[string, string]> = [
  ['/index.php', '/'],
  ['/piste_rollers_larochelle_charente_maritime.php', '/patinoire-roller-la-rochelle'],
  ['/espace_loisir_couvert_rollers.php', '/patinoire-roller-la-rochelle'],
  ['/cours_collectifs_rollers_larochelle.php', '/cours'],
  ['/organisation_anniversaires_parc_loisirs_larochelle.php', '/anniversaires'],
  ['/acces_piste_rollers_larochelle.php', '/acces'],
  ['/contact_piste_rollers_larochelle.php', '/contact'],
  ['/actualites_rollers_larochelle.php', '/actualites'],
  ['/diaporama_animations_au_taquet.php', '/galerie'],
  ['/mentions_piste_rollers_larochelle.php', '/mentions-legales'],
  ['/liens_piste_rollers_larochelle.php', '/'],
]

export const redirects: NextConfig['redirects'] = async () =>
  anciennes.map(([source, destination]) => ({ source, destination, permanent: true }))
