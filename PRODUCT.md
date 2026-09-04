# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Ethan a laissé le choix en demandant « déployable gratuitement sur Vercel, statique, performant en SEO, l'admin modifie textes et images ». Choix : Payload CMS 3 dans Next.js App Router (une seule app), Postgres Neon, Vercel Blob, Live Preview Payload, Tailwind v4. Détail et alternatives écartées dans `docs/superpowers/specs/2026-09-02-au-taquet-site-design.md`.

## Users

(Déduit du brief et de l'ancien site ; Ethan absent pendant l'init.)

- Parents de l'agglomération de La Rochelle (Aytré, Rochefort, Châtelaillon, Fouras, Charente-Maritime) qui cherchent une sortie couverte pour les enfants un samedi ou un dimanche après-midi, ou un lieu pour un anniversaire d'enfant. Ils cherchent sur Google « patinoire la rochelle » ou « music dance roller » depuis un téléphone. Leur job : savoir si c'est ouvert, combien ça coûte, où c'est, et réserver une table d'anniversaire par téléphone.
- Adultes et ados qui veulent prendre un cours hebdomadaire (roller, roller dance, zumba, k-pop, salsa, rock) : ils veulent le jour, l'heure, le niveau et le numéro de l'intervenant.
- Groupes (EVJF, entreprises, associations) qui cherchent une salle privatisable.
- Utilisateur secondaire : le gérant, non technicien, qui met à jour tarifs, horaires, cours et photos depuis l'admin avec l'aperçu en direct.

## Product Purpose

Faire trouver et venir : le site doit être trouvé sur « music dance roller » et « patinoire la rochelle », répondre en quelques secondes aux questions ouvert / combien / où / comment réserver, et donner envie à une famille ou un groupe de venir patiner. Succès : appels et réservations d'anniversaires, inscriptions aux cours, position Google sur les deux requêtes cibles.

## Positioning

Seule patinoire de roller couverte de la région (1000 m² dont 500 m² de piste), ouverte au public le week-end et les vacances, avec un univers musique et lumières (disco roller, soirées à thème) et une école qui accueille plus de 500 élèves par semaine en roller et en danse. Un voisin (patinoire à glace, skatepark, salle de danse) ne peut pas dire les trois en même temps : roller, musique, danse, sous un même toit.

## Operating Context

- Ouverture au public le samedi (14h–20h, jusqu'à minuit le 1er samedi du mois) et le dimanche (14h30–19h), plus vacances scolaires ; séances privées le mercredi après-midi sur carte d'abonnement.
- Cours collectifs en semaine par des intervenants indépendants (Rool!, Corps et Âmes, K-Pop Academy La Rochelle, Latin 100 % Cuba, Let's Rock and Swing…), chacun avec son propre téléphone d'inscription.
- Anniversaires : réservation d'une table en bord de piste par téléphone, formules 14 à 18 € par personne, acompte 20 €, places limitées.
- Bar sans alcool, vestiaire, location de rollers/quads 4 €, chaussettes obligatoires, protections recommandées, enfants de moins de 10 ans accompagnés.
- Privatisation possible (séminaires, arbres de Noël, galas, défilés, soirées à thème).
- Le gérant met à jour lui-même le contenu via `/admin` (Payload, interface en français, aperçu en direct).

## Capabilities and Constraints

- Pages : accueil, patinoire (présentation, tarifs, horaires, règlement), cours, anniversaires, accès, contact, actualités, galerie, mentions légales.
- Pas de réservation ni de paiement en ligne : l'action est l'appel téléphonique ou le formulaire de contact.
- Contenu entièrement éditable (textes, images, tarifs, horaires, cours, formules) sans intervention développeur.
- Statique, rapide, mobile d'abord ; redirections 301 des anciennes URL `.php`.
- Terminologie : « Au Taquet » est l'enseigne, « Music Dance Roller » le nom du domaine et le nom Instagram ; les deux doivent apparaître. « Patinoire » désigne ici une piste de roller (pas de glace), à dire explicitement pour ne pas tromper les visiteurs venus pour la glace.
- Non décidé : hébergement Vercel Hobby (interdit pour usage commercial dans les CGU) ou Pro ; à trancher par Ethan.

## Brand Commitments

- Nom « Au Taquet » ; nom de domaine et handle Instagram « musicdanceroller ».
- Logo existant : lettrage rouge « AU TAQUET » avec boule à facettes et silhouette de patineuse (fichier 312×192 basse résolution, `seed/media/logo-au-taquet.jpg`). Conservé comme repli tant que le gérant n'en fournit pas un meilleur ; ne pas le redessiner sans lui.
- Inspiration donnée par Ethan, non contraignante : shot Dribbble « Roller Skating Rink Website Concept » (piste sombre, bokeh de guirlandes, titre géant mêlant lettres pleines et lettres en pointillé).
- Voix : directe, chaleureuse, familiale, tutoiement évité ; l'ancien site vouvoie.

## Evidence on Hand

- Textes, tarifs 2025, horaires, cours 2025/2026, formules anniversaires, itinéraires, mentions légales : extraits de l'ancien site, dans `seed/content.ts`.
- Photos réelles de la salle (piste éclairée en rouge, boule à facettes, cours enfants, soirées) : 40 fichiers 800 px de large maximum, filigranés « Music Dance Roller » pour certains, dans `seed/media/`. Qualité faible : le design ne doit pas reposer sur elles ; le gérant les remplacera.
- Deux PDF : règlement intérieur et carte d'invitation anniversaire (`seed/media/*.pdf`).
- Aucun témoignage client, aucun chiffre de fréquentation vérifié à part « plus de 200 élèves de roller » et « plus de 500 élèves en tout » (dits par l'ancien site) et « depuis 12 ans » (site 2014, donc ouverture vers 2013 : « depuis 2013 » est plus sûr qu'un nombre d'années). Ne rien inventer d'autre.

## Product Principles

1. Répondre avant de séduire : ouvert, tarif, adresse, téléphone visibles dès le premier écran sur mobile.
2. Le téléphone est l'action principale ; tout chemin mène au numéro.
3. Dire « roller » partout où l'on dit « patinoire » pour ne pas décevoir les visiteurs venus pour la glace.
4. Chaque texte et chaque image est un champ que le gérant peut modifier seul ; ne jamais coder un contenu en dur.
5. Les deux noms (Au Taquet, Music Dance Roller) vivent ensemble sur chaque page.

## Accessibility & Inclusion

Public familial et enfants : contrastes lisibles sous lumière de jour sur téléphone, cibles tactiles larges, textes en français simple, numéros de téléphone cliquables.
