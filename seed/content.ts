import { rich } from './lexical'

export const MEDIA: Record<string, { file: string; alt: string }> = {
  logo: { file: 'logo-au-taquet.jpg', alt: 'Logo Au Taquet : patineuse devant une boule à facettes' },
  boule: { file: 'anniversaires-2.jpg', alt: 'La boule à facettes suspendue au-dessus de la piste de roller' },
  pisteRouge: { file: 'piste-lumieres-rouges.jpg', alt: 'La piste de roller couverte d’Au Taquet sous les lumières rouges' },
  pisteBleue: { file: 'anniversaires-3.jpg', alt: 'La piste de roller éclairée en bleu et violet' },
  pisteHaut: { file: 'accueil-3.jpg', alt: 'La piste de roller vue d’en haut, sous les projecteurs' },
  pisteCouleurs: { file: 'presentation-2.jpg', alt: 'La piste de roller sous des lumières vertes, jaunes et rouges' },
  location: { file: 'anniversaires-4.jpg', alt: 'Le comptoir de location : l’équipe remet une paire de rollers à un visiteur' },
  locationEtageres: { file: 'anim-6.jpg', alt: 'Les étagères de rollers de location aux roues orange' },
  patinsUnionJack: { file: 'anim-2.jpg', alt: 'Patins à roulettes et casque aux couleurs du drapeau britannique' },
  patinsNoirs: { file: 'contact-1.jpg', alt: 'Paire de patins quad noirs aux roues vertes' },
  patinStrass: { file: 'patin-strass-vinyle.jpg', alt: 'Le patin à strass et le vinyle qui décorent le bar' },
  coursEnfants: { file: 'cours-enfants-chaine.jpg', alt: 'Cours de roller : les enfants avancent en file indienne en se tenant la main' },
  coursEnfants2: { file: 'presentation-3.jpg', alt: 'Deux enfants en roller pendant un cours' },
  rollerDance: { file: 'galerie-8.jpg', alt: 'Un cours de roller dance pour adultes sur la piste' },
  soireeGroupe: { file: 'galerie-5.jpg', alt: 'Photo de groupe d’une soirée fluo sur la piste' },
  ballons: { file: 'galerie-26.jpg', alt: 'Soirée avec des ballons rouges lâchés sur la piste' },
  tablesAnniv: { file: 'galerie-21.jpg', alt: 'Une table de fête au bord de la piste' },
  tablesBord: { file: 'galerie-12.jpg', alt: 'Les tables en bord de piste, sous les lumières' },
  halloween: { file: 'galerie-17.jpg', alt: 'Soirée Halloween : citrouille devant l’enseigne Au Taquet' },
  danseGroupe: { file: 'anim-3.jpg', alt: 'Chorégraphie de groupe sur la piste' },
  soireeDanse: { file: 'galerie-20.jpg', alt: 'Une soirée dansante sur la piste' },
  patineurs: { file: 'galerie-9.jpg', alt: 'Des patineurs sur la piste pendant une séance publique' },
  detente: { file: 'acces-1.jpg', alt: 'Le coin détente : baby-foot, air hockey et bornes d’arcade' },
  flipper: { file: 'anim-7.jpg', alt: 'Une visiteuse devant le flipper du coin détente' },
  bar: { file: 'anim-5.jpg', alt: 'Le bar sans alcool et ses tabourets, au bord de la piste' },
  vitalSport: { file: 'galerie-24.jpg', alt: 'Le stand Au Taquet lors d’un événement Vital Sport' },
  reglementPdf: { file: 'reglement-interieur.pdf', alt: 'Extrait du règlement intérieur (PDF)' },
  invitationPdf: { file: 'carte-invitation-anniversaire.pdf', alt: 'Carte d’invitation anniversaire à imprimer (PDF)' },
}

export const GALERIE: Array<{ media: keyof typeof MEDIA; legende: string }> = [
  { media: 'boule', legende: 'La boule à facettes' },
  { media: 'pisteRouge', legende: 'La piste sous les lumières rouges' },
  { media: 'coursEnfants', legende: 'Cours de roller pour les enfants' },
  { media: 'soireeGroupe', legende: 'Soirée fluo' },
  { media: 'location', legende: 'Le comptoir de location' },
  { media: 'pisteBleue', legende: 'La piste en bleu' },
  { media: 'rollerDance', legende: 'Cours de roller dance' },
  { media: 'ballons', legende: 'Lâcher de ballons' },
  { media: 'halloween', legende: 'Soirée Halloween' },
  { media: 'tablesAnniv', legende: 'Une table d’anniversaire' },
  { media: 'patinStrass', legende: 'Le patin à strass du bar' },
  { media: 'locationEtageres', legende: 'Les rollers de location' },
  { media: 'danseGroupe', legende: 'Chorégraphie de groupe' },
  { media: 'detente', legende: 'Le coin détente' },
  { media: 'pisteCouleurs', legende: 'Jeux de lumière sur la piste' },
  { media: 'patineurs', legende: 'Séance publique' },
  { media: 'vitalSport', legende: 'Vital Sport' },
  { media: 'flipper', legende: 'Le flipper' },
]

export const INFOS = {
  nom: 'Au Taquet',
  nomSite: 'Music Dance Roller',
  telephone: '05 46 31 17 72',
  telephoneMobile: '06 62 06 58 23',
  adresse: {
    rue: '8 rue Léonard de Vinci',
    complement: 'Zone de Belle Aire',
    codePostal: '17440',
    ville: 'Aytré',
    latitude: 46.1328357,
    longitude: -1.0961877,
    lienItineraire: 'https://www.google.com/maps/dir/?api=1&destination=Au+Taquet+8+rue+L%C3%A9onard+de+Vinci+17440+Aytr%C3%A9',
  },
  reseaux: {
    facebook: 'https://www.facebook.com/pages/Au-Taquet/516734571713336',
    instagram: 'https://www.instagram.com/musicdanceroller/',
  },
  horaires: [
    { jour: 'samedi', ouverture: '14:00', fermeture: '20:00', precision: 'Jusqu’à minuit le 1er samedi du mois' },
    { jour: 'dimanche', ouverture: '14:30', fermeture: '19:00' },
  ],
  mentionVacances: 'Ouvert aussi pendant les vacances scolaires : appelez-nous pour les horaires du jour.',
  seancesPrivees: 'Le mercredi de 14h30 à 16h30, uniquement avec la carte d’abonnement.',
  annonce: { active: false, texte: '' },
  tarifs: [
    { libelle: 'Entrée', prix: 9, precision: 'Patinage libre, avec vos rollers ou quads' },
    { libelle: 'Moins de 5 ans', prix: 6 },
    { libelle: 'Carte 10 entrées', prix: 79 },
    { libelle: 'Location de rollers', prix: 4, precision: 'Si vous n’êtes pas équipé' },
  ],
  tarifsNote: 'Tarifs 2025. Chaussettes obligatoires, protections recommandées.',
  raisonSociale: 'Sarl 3LC',
  siret: '792 475 378 00016',
}

export const ACCUEIL = {
  bandeau: {
    titre: 'Music Dance Roller',
    sousTitre: 'La patinoire roller couverte de La Rochelle',
    accroche: 'Au Taquet, c’est 1000 m² couverts à Aytré pour patiner, danser et faire la fête en roller, en famille ou entre amis. Ouvert au public le week-end et pendant les vacances scolaires.',
    photo: 'pisteHaut',
    boutonSecondaire: { texte: 'Réserver un anniversaire', lien: '/anniversaires' },
  },
  presentation: {
    titre: 'Roller, musique et danse sous un même toit',
    texte: rich(
      'Depuis 2013, Au Taquet est la patinoire de roller d’Aytré, aux portes de La Rochelle : une piste couverte de 500 m², de la musique d’hier et d’aujourd’hui, des lumières, et des animations tout l’après-midi. On vient avec ses rollers ou ses quads, ou on en loue sur place.',
      'C’est aussi une école de patinage où plus de 200 élèves prennent des cours chaque semaine, et une salle de danse : salsa, zumba, rock, K-pop. En tout, plus de 500 élèves, petits et grands.',
      'Vous venez de Rochefort, Châtelaillon, Fouras ou de l’île de Ré ? Nous sommes zone de Belle Aire, juste à côté de La Rochelle. [Voir l’itinéraire](/acces).',
    ),
  },
  univers: [
    {
      titre: 'Patinage libre',
      texte: 'Samedi et dimanche après-midi, et pendant les vacances scolaires : la piste est à vous, en roller ou en quad, dans un univers de musique et de lumières.',
      chiffre: '9 €', chiffreLegende: 'l’entrée · location de rollers 4 €',
      lienTexte: 'Horaires et tarifs', lien: '/patinoire-roller-la-rochelle', photo: 'pisteCouleurs',
    },
    {
      titre: 'Cours de roller et de danse',
      texte: 'Roller, roller dance, zumba, K-pop, salsa, rock, jump dance : des cours pour les enfants et les adultes, du débutant au confirmé, toute la semaine.',
      chiffre: '500', chiffreLegende: 'élèves chaque semaine',
      lienTexte: 'Voir le planning', lien: '/cours', photo: 'coursEnfants2',
    },
    {
      titre: 'Anniversaires',
      texte: 'Une table réservée au bord de la piste, l’entrée, un goûter et une boisson : réservez par téléphone, on s’occupe du reste.',
      chiffre: '14 €', chiffreLegende: 'par enfant, formule après-midi',
      lienTexte: 'Les formules', lien: '/anniversaires', photo: 'ballons',
    },
  ],
  privatisation: {
    titre: 'Privatisez la salle',
    texte: 'Séminaires, soirées d’entreprise, arbres de Noël, expositions, défilés de mode, galas, bals, soirées à thème country, rock ou salsa : Au Taquet se privatise entièrement. Appelez-nous pour en parler.',
  },
  meta: {
    title: 'Music Dance Roller · Au Taquet, patinoire roller couverte à La Rochelle (Aytré)',
    description: 'Patinoire de roller couverte de 1000 m² à Aytré, La Rochelle : patinage libre le week-end, cours de roller et de danse, anniversaires, privatisation. Entrée 9 €, location de rollers sur place.',
  },
}

export const PATINOIRE = {
  titre: 'La patinoire roller d’Aytré, aux portes de La Rochelle',
  intro: rich(
    'Un espace couvert de 1000 m², dont une piste de roller de 500 m², une zone détente pour ceux qui ne patinent pas, un bar sans alcool, un vestiaire, le wifi gratuit, et une ambiance de musique et de lumières qui change tout.',
    'Vous pouvez venir avec vos propres rollers ou quads, ou en louer sur place. Les enfants de moins de 10 ans doivent être accompagnés d’un adulte.',
  ),
  photo: 'pisteBleue',
  chiffres: [
    { valeur: '1000 m²', legende: 'd’espace couvert' },
    { valeur: '500 m²', legende: 'de piste de roller' },
    { valeur: '2013', legende: 'ouverture à Aytré' },
  ],
  equipements: [
    { titre: 'Location de rollers et de quads', texte: '4 € la paire, toutes pointures, si vous n’êtes pas équipé.' },
    { titre: 'Bar sans alcool', texte: 'Boissons, goûters et encas sur place.' },
    { titre: 'Zone détente', texte: 'Tables en bord de piste pour les accompagnants, baby-foot, air hockey, bornes d’arcade.' },
    { titre: 'Vestiaire', texte: 'Pour laisser ses affaires le temps de patiner.' },
    { titre: 'Wifi gratuit', texte: 'En accès libre dans toute la salle.' },
  ],
  regles: [
    { texte: 'Les chaussettes sont obligatoires.' },
    { texte: 'Les protections (poignets, genoux, casque) sont fortement recommandées.' },
    { texte: 'Les enfants de moins de 10 ans doivent être accompagnés par un parent ; les mineurs restent sous la responsabilité des adultes.' },
    { texte: 'Les consommations personnelles ne sont pas acceptées.' },
    { texte: 'Votre présence dans nos locaux implique l’acceptation du règlement intérieur.' },
  ],
  reglement: 'reglementPdf',
  tarifsTitre: 'Tarifs',
  meta: {
    title: 'Patinoire roller couverte à La Rochelle : horaires, tarifs, location · Au Taquet',
    description: 'La patinoire roller Au Taquet à Aytré (La Rochelle) : 1000 m² couverts, piste de 500 m², location de rollers, bar, zone détente. Horaires d’ouverture au public et tarifs 2025.',
  },
}

export const PAGE_COURS = {
  titre: 'Cours de roller et de danse',
  saison: 'Saison 2025 / 2026',
  intro: rich(
    'Toute la semaine, des intervenants indépendants donnent leurs cours sur la piste d’Au Taquet : roller pour les enfants et les adultes, roller dance, zumba, K-pop, salsa, rock et jump dance.',
    'Les inscriptions se font directement auprès de chaque intervenant, par téléphone.',
  ),
  photo: 'rollerDance',
  note: 'Inscriptions et renseignements directement auprès de chaque intervenant.',
  meta: {
    title: 'Cours de roller, roller dance, zumba, salsa et K-pop à La Rochelle · Au Taquet',
    description: 'Le planning des cours à la patinoire Au Taquet (Aytré, La Rochelle) : roller enfants et adultes, roller dance, zumba, K-pop, salsa, rock, jump dance. Jours, horaires et contacts des intervenants.',
  },
}

export const COURS = [
  {
    nom: 'Roller', intervenant: 'Julie', organisme: 'Rool !', telephone: '06 06 86 85 58', siteWeb: 'https://www.roolnews.com',
    description: 'Initiation, perfectionnement et compétition. Cours enfants, et cours adultes débutants et confirmés.',
    couleur: 'aqua', ordre: 1, image: 'coursEnfants',
    creneaux: [
      { jour: 'lundi', debut: '17:00', fin: '19:00' },
      { jour: 'mercredi', debut: '09:45', fin: '11:30' },
      { jour: 'jeudi', debut: '17:00', fin: '21:30' },
      { jour: 'vendredi', debut: '16:15', fin: '19:15' },
    ],
  },
  {
    nom: 'Roller dance', intervenant: 'Lena', telephone: '07 66 52 53 37',
    description: 'Initiation et perfectionnement. Cours adultes, initiation et confirmés.',
    couleur: 'fuchsia', ordre: 2, image: 'rollerDance',
    creneaux: [
      { jour: 'mercredi', debut: '16:30', fin: '21:00' },
      { jour: 'vendredi', debut: '12:30', fin: '13:30' },
    ],
  },
  {
    nom: 'Zumba', intervenant: 'Dorine, professeure diplômée d’État', organisme: 'Corps et Âmes', telephone: '06 08 80 66 65', siteWeb: 'https://www.dansecorpsetames.fr',
    description: 'Zumba Kids et Zumba adultes. Cours à l’unité avec une carte de 5 ou 10 cours, frais d’inscription 15 €.',
    couleur: 'mandarine', ordre: 3,
    creneaux: [
      { jour: 'mardi', debut: '18:15', fin: '19:15', niveau: 'Zumba Kids' },
      { jour: 'mardi', debut: '19:30', fin: '20:30', niveau: 'Adultes' },
    ],
  },
  {
    nom: 'K-pop', intervenant: 'Lina', organisme: 'K-Pop Academy La Rochelle', telephone: '06 88 34 42 85',
    description: 'Chorégraphies K-pop, le samedi matin.',
    couleur: 'fuchsia', ordre: 4,
    creneaux: [
      { jour: 'samedi', debut: '10:30', fin: '' },
      { jour: 'samedi', debut: '12:30', fin: '' },
    ],
  },
  {
    nom: 'Salsa', intervenant: 'Victor', organisme: 'Latin 100 % Cuba', telephone: '07 68 05 62 66',
    description: 'Salsa cubaine, du débutant au confirmé, le lundi soir.',
    couleur: 'mandarine', ordre: 5,
    creneaux: [
      { jour: 'lundi', debut: '19:00', fin: '20:00', niveau: 'Débutants' },
      { jour: 'lundi', debut: '20:00', fin: '21:00', niveau: 'Intermédiaires' },
      { jour: 'lundi', debut: '21:00', fin: '22:00', niveau: 'Tous niveaux' },
    ],
  },
  {
    nom: 'Rock', intervenant: 'Pascaline et Henry', organisme: 'Let’s Rock and Swing', telephone: '06 80 74 56 09 / 06 13 02 98 83',
    description: 'Rock à danser, débutants et intermédiaires, le vendredi soir.',
    couleur: 'aqua', ordre: 6,
    creneaux: [
      { jour: 'vendredi', debut: '20:15', fin: '21:15', niveau: 'Débutants' },
      { jour: 'vendredi', debut: '21:15', fin: '22:15', niveau: 'Intermédiaires' },
    ],
  },
  {
    nom: 'Jump dance', intervenant: 'Pauline', telephone: '06 86 17 96 19',
    description: 'Corde à sauter en musique, le samedi matin.',
    couleur: 'blanc', ordre: 7,
    creneaux: [{ jour: 'samedi', debut: '09:30', fin: '10:30' }],
  },
]

export const ANNIVERSAIRES = {
  titre: 'Fêter un anniversaire à la patinoire',
  intro: rich(
    'Pour organiser un anniversaire, il suffit de réserver une table en bord de piste, par téléphone au **05 46 31 17 72** ou depuis la [page contact](/contact). Les places sont limitées.',
    'Les enfants patinent, les parents ont une table réservée pour le gâteau et les cadeaux. L’entrée, une boisson et un goûter ou un encas sont compris.',
  ),
  photo: 'ballons',
  formules: [
    { nom: 'Après-midi', creneau: 'Samedi et dimanche après-midi', prix: 14, inclus: ['Entrée', '1 boisson au choix', '1 goûter au choix', '1 table réservée en bord de piste'].map((texte) => ({ texte })), note: 'Goûter au choix : maxi cookie, part de gâteau au chocolat, muffin, donut.' },
    { nom: 'Après-midi avec rollers', creneau: 'Samedi et dimanche après-midi', prix: 16, inclus: ['Entrée', 'Location de rollers et protections poignets', '1 boisson au choix', '1 goûter au choix', '1 table réservée en bord de piste'].map((texte) => ({ texte })), note: 'Goûter au choix : maxi cookie, part de gâteau au chocolat, muffin, donut.' },
    { nom: 'Samedi soir', creneau: '', prix: 16, inclus: ['Entrée', '1 boisson au choix', '1 encas salé au choix', '1 table réservée en bord de piste'].map((texte) => ({ texte })), note: 'Encas au choix : hot-dog, croque-monsieur, panini.' },
    { nom: 'Samedi soir avec rollers', creneau: '', prix: 18, inclus: ['Entrée', 'Location de rollers', '1 boisson au choix', '1 encas salé au choix', '1 table réservée en bord de piste'].map((texte) => ({ texte })), note: 'Encas au choix : hot-dog, croque-monsieur, panini.' },
  ],
  acompte: 20,
  conditions: rich(
    'Un acompte de 20 € est demandé à la réservation. Sans confirmation, la réservation est annulée. Après confirmation, l’acompte n’est pas remboursable.',
    'Enterrements de vie de jeune fille ou de garçon, diplômes, soirées entre amis : la même formule fonctionne pour les grands. Appelez-nous.',
  ),
  carteInvitation: 'invitationPdf',
  meta: {
    title: 'Anniversaire à la patinoire roller de La Rochelle : formules dès 14 € · Au Taquet',
    description: 'Organisez un anniversaire d’enfant à la patinoire roller Au Taquet (Aytré, La Rochelle) : table réservée en bord de piste, entrée, boisson et goûter compris. Formules de 14 à 18 € par personne, réservation par téléphone.',
  },
}

export const ACCES = {
  titre: 'Venir à la patinoire',
  intro: 'Au Taquet se trouve à Aytré, zone de Belle Aire, juste à côté de La Rochelle, en direction de Castorama.',
  itineraires: [
    { depuis: 'Rochefort', instructions: 'Prendre la direction La Rochelle, puis la sortie Aytré, ZI de Belle Aire. Prendre à droite, puis au 1er rond-point la troisième sortie, et ensuite la première à gauche direction Castorama.' },
    { depuis: 'La Rochelle (par la rocade)', instructions: 'Prendre la direction d’Aytré, ZI de Belle Aire. Au 1er rond-point la troisième sortie, au 2e rond-point la troisième sortie, et ensuite la première à gauche direction Castorama.' },
    { depuis: 'Niort', instructions: 'Prendre la direction Bordeaux, puis la sortie Aytré, ZI de Belle Aire. Au 1er rond-point la troisième sortie, au 2e rond-point la troisième sortie, et ensuite la première à gauche direction Castorama.' },
  ],
  carteEmbed: '',
  photo: 'pisteHaut',
  meta: {
    title: 'Accès et plan : patinoire roller Au Taquet à Aytré, près de La Rochelle',
    description: 'Comment venir à la patinoire roller Au Taquet : 8 rue Léonard de Vinci, zone de Belle Aire, 17440 Aytré. Itinéraires depuis La Rochelle, Rochefort et Niort, plan d’accès.',
  },
}

export const CONTACT = {
  titre: 'Contactez-nous',
  intro: 'Une question, une réservation d’anniversaire, une privatisation ? Le plus simple est d’appeler. Sinon, écrivez-nous ici et nous vous répondons rapidement.',
  messageSucces: 'Merci, votre message est bien arrivé. Nous vous répondons au plus vite.',
  photo: 'location',
  meta: {
    title: 'Contact · Au Taquet, patinoire roller La Rochelle',
    description: 'Contactez la patinoire roller Au Taquet à Aytré (La Rochelle) : téléphone 05 46 31 17 72, formulaire de contact, réservation d’anniversaires et privatisation.',
  },
}

export const MENTIONS = {
  titre: 'Mentions légales',
  contenu: rich(
    'Vous êtes sur le site www.musicdanceroller.com, site de la patinoire roller « Au Taquet ».',
    '## Éditeur',
    'Sarl 3LC, siège social à Aytré, SIRET 792 475 378 00016. Responsable de la publication : « Au Taquet ». Adresse : 8 rue Léonard de Vinci, zone de Belle Aire, 17440 Aytré. Téléphone : 05 46 31 17 72.',
    '## Hébergement',
    'Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.',
    '## Données personnelles',
    'La consultation du site est possible sans révéler votre identité. Les informations envoyées par le formulaire de contact (nom, e-mail, téléphone, message) sont destinées uniquement à « Au Taquet » pour répondre à votre demande ; elles ne sont jamais transmises à des tiers. Conformément au règlement général sur la protection des données et à la loi Informatique et Libertés, vous disposez d’un droit d’accès, de rectification et de suppression de vos données, que vous pouvez exercer par téléphone ou par courrier à l’adresse ci-dessus.',
    'Ce site ne dépose aucun cookie de suivi.',
    '## Propriété intellectuelle',
    'Les textes, photographies et éléments graphiques de ce site sont la propriété de « Au Taquet » ou de tiers l’ayant autorisé à les utiliser, et sont protégés par le droit d’auteur.',
    '## Liens',
    '« Au Taquet » ne peut être tenu responsable du contenu des sites vers lesquels ce site renvoie.',
    'Les informations présentes sur ce site n’ont pas de caractère contractuel ; « Au Taquet » reste libre d’en modifier le contenu à tout moment.',
  ),
}
