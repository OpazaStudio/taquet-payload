# Au Taquet / Music Dance Roller — refonte du site (spec de conception)

Date : 2026-09-02. Auteur : Claude, en autonomie (Ethan a demandé une autonomie totale ; toutes les décisions ci-dessous sont prises sans validation et sont donc révisables).

## 1. Contexte

- Site actuel : http://musicdanceroller.com/ (PHP statique de 2013, agence Atoutmédia, hébergé OVH). 10 pages : accueil, présentation (patinoire + tarifs), cours collectifs, anniversaires, accès, contact, actualités (vide), galerie photos, liens utiles, mentions légales.
- Entreprise : « Au Taquet », patinoire roller couverte de 1000 m² (piste 500 m²) à Aytré, zone de Belle Aire, agglomération de La Rochelle. Sarl 3LC, Siret 792 475 378 00016. 8 rue Léonard de Vinci, 17440 Aytré. Tél 05 46 31 17 72 / 06 62 06 58 23. Facebook « Au Taquet », Instagram « musicdanceroller ».
- Problème SEO : le domaine est `musicdanceroller.com` mais l'enseigne s'appelle « Au Taquet ». Les gens cherchent « music dance roller » et « patinoire la rochelle ». Le site actuel n'a ni titres propres (encodage cassé), ni données structurées, ni mobile.
- Besoin admin : le gérant veut modifier textes et images lui-même, avec un aperçu visuel, sans passer par Ethan. « Pas la folie non plus ».
- Contraintes d'Ethan : déploiement Vercel, gratuit, performant, statique, SEO, redesign complet.

## 2. Décision de stack

**Retenu : Payload CMS 3 (Next.js App Router, même app) + Postgres Neon + Vercel Blob + Live Preview Payload + Tailwind v4.**

| Option | Éditeur visuel | Coût | Statique/SEO | Verdict |
|---|---|---|---|---|
| Payload 3 sur Vercel (Neon + Blob) | Live Preview natif : formulaire à gauche, site en direct à droite | 0 € (Neon free 0,5 Go, Blob free, Vercel Hobby) | Pages statiques + revalidation à la sauvegarde | **Retenu** : c'est le repo déjà initié, le skill est là, l'admin est en français, un seul déploiement. |
| Astro + Keystatic (CMS git) | Formulaires, pas d'aperçu en direct | 0 € | 100 % statique | Écarté : l'admin doit avoir un compte GitHub et chaque sauvegarde = commit + build de 1 à 2 min avant de voir le résultat. |
| Next + Sanity (Presentation) | Le meilleur éditeur visuel (clic sur l'élément) | 0 € en free | Bon | Écarté : vendor de plus, studio à héberger, sur-dimensionné pour 8 pages. |
| Laravel / Livewire | À construire soi-même | Pas d'hébergement gratuit sérieux (Laravel Cloud free s'endort, cold start mauvais pour le SEO) | Pas statique | Écarté. |

Point d'attention à remonter à Ethan : le plan Vercel Hobby interdit contractuellement l'usage commercial. Un site de SARL est commercial. Ça marche techniquement, mais le respect des CGU est son choix (Pro à 20 $/mois, ou Cloudflare Pages / Netlify qui tolèrent le commercial en free).

### Pourquoi pas le template « website » de Payload

Trop lourd (blocs de mise en page libres, posts, recherche, redirections, formulaires). Un admin non technique se perd dans un page builder. Ici chaque page a des **champs typés et nommés en français** (« Titre principal », « Photo du bandeau », « Tarif entrée »…) : il change le texte, voit le résultat à droite, enregistre. Rien à composer.

## 3. Modèle de contenu (Payload)

Tout en français dans l'admin (`i18n` fr, labels fr).

### Globals (une entrée par page, avec Live Preview)

- `accueil` : bandeau (titre, accroche, photo, bouton), présentation (paragraphes), points forts (array titre + texte + image), sélection d'actus, SEO.
- `patinoire` : titre, présentation, photo, règles pratiques (array), tarifs (array libellé + prix + note), règlement PDF, SEO.
- `cours` : titre, intro, photo, SEO (les cours eux-mêmes sont une collection).
- `anniversaires` : titre, intro, photo, formules (array : nom, prix, inclus[], acompte, créneau), conditions, carte d'invitation PDF, SEO.
- `acces` : titre, itinéraires (array : depuis, instructions), iframe carte, SEO.
- `contact` : titre, intro, SEO.
- `mentions-legales` : richtext.
- `infos-pratiques` (site settings) : nom, téléphones, email, adresse, coordonnées GPS, réseaux, horaires publics (array jour + plages), séances privées, mention légale de pied de page, logo.

### Collections

- `media` (uploads, Vercel Blob en prod, `public/media` en local), avec `alt` obligatoire (SEO + a11y).
- `cours` : nom, discipline (roller, roller dance, zumba, k-pop, salsa, rock, jump dance), intervenant, contact (tél, site), créneaux (array jour + heure début/fin + niveau), description, image, ordre.
- `actualites` : titre, slug, date, image, résumé, corps richtext, publié.
- `galerie-photos` : image + légende + ordre (ou global `galerie` avec array ; choisi : collection, plus simple à réordonner et à supprimer).
- `messages-contact` : soumissions du formulaire (nom, email, tél, message, créé le) ; lecture seule dans l'admin.
- `users` : admins.

### Hooks

- `afterChange` sur chaque global / collection → `revalidatePath` de la ou des routes concernées (+ `/` pour le layout et le sitemap).
- Schéma géré uniquement par migrations (`push: false`) : Payload en mode push écrivait une migration « dev » qui rendait `payload migrate` interactif au build. Après un changement de champs : `pnpm migrate:create` puis `pnpm payload migrate`.

## 4. Front (Next.js App Router)

Routes (slugs FR, avec mots-clés) :

| Route | Ancienne URL (redirection 301) |
|---|---|
| `/` | `index.php` |
| `/patinoire-roller-la-rochelle` | `piste_rollers_larochelle_charente_maritime.php`, `espace_loisir_couvert_rollers.php` |
| `/cours` | `cours_collectifs_rollers_larochelle.php` |
| `/anniversaires` | `organisation_anniversaires_parc_loisirs_larochelle.php` |
| `/acces` | `acces_piste_rollers_larochelle.php` |
| `/contact` | `contact_piste_rollers_larochelle.php` |
| `/actualites`, `/actualites/[slug]` | `actualites_rollers_larochelle.php` |
| `/galerie` | `diaporama_animations_au_taquet.php` |
| `/mentions-legales` | `mentions_piste_rollers_larochelle.php` |
| `/` (redirige) | `liens_piste_rollers_larochelle.php` (page « liens utiles » supprimée : sans valeur SEO, liens morts) |

- Génération statique (`force-static`) + revalidation à la demande via hooks Payload. Actualités : `generateStaticParams`.
- Live Preview : chaque page est un Server Component qui charge les données via Local API et les passe à un Client Component qui appelle `useLivePreview` (mise à jour instantanée dans l'iframe admin).
- Formulaire de contact : Server Action → crée un `messages-contact` + email via Resend si `RESEND_API_KEY` est défini (sinon juste l'enregistrement). Honeypot anti-spam.
- Images : `next/image`, formats AVIF/WebP, `sizes` corrects. Polices auto-hébergées via `next/font`.

## 5. SEO

- Titres : `{page} · Au Taquet, patinoire roller La Rochelle` ; accueil : `Music Dance Roller · Au Taquet, patinoire roller couverte à La Rochelle (Aytré)`.
- H1 d'accueil contenant « Music Dance Roller », « patinoire », « roller », « La Rochelle ».
- Métadonnées via `generateMetadata` depuis les champs SEO (plugin `@payloadcms/plugin-seo` sur les globals), canonical, OG image, `lang="fr"`.
- JSON-LD `SportsActivityLocation` (+ `LocalBusiness`) : nom, `alternateName` « Music Dance Roller », adresse, géo, téléphone, horaires (`openingHoursSpecification` générés depuis « infos pratiques »), `sameAs`, `priceRange`. JSON-LD `Event` non prévu (pas d'agenda fiable). `BreadcrumbList` sur les pages internes.
- `sitemap.xml` et `robots.txt` via `src/app/sitemap.ts` et `src/app/robots.ts` (à la racine de `app`, pas dans le groupe de routes, sinon 404).
- Redirections 301 des anciennes URL `.php` dans `next.config`.
- Zone locale : mention d'Aytré, La Rochelle, Rochefort, Châtelaillon, Fouras, Charente-Maritime dans les textes (comme l'ancien site, mais lisible).
- Performance : pages statiques, pas de JS inutile, LCP = image hero optimisée avec `priority`.

## 6. Design

Conduit par le skill impeccable (mode Persuade, monde visuel tiré au sort par `concept-seed`, contrat de direction dans le surface brief, revue de finition et DESIGN.md en fin de build). Inspiration donnée par Ethan : shot Dribbble « Roller Skating Rink Website Concept » (piste sombre, bokeh de lumières, titre géant mêlant lettres pleines et lettres en pointillé). Non contraignant.

Contraintes fixes : nom « Au Taquet » + « Music Dance Roller » visibles ; logo existant conservé en fallback (le gérant pourra en téléverser un nouveau) ; photos existantes 800 px (à remplacer par le gérant, le design ne doit pas dépendre de leur qualité).

## 7. Déploiement (à faire par Ethan, documenté dans le README)

1. Push GitHub, importer sur Vercel.
2. Marketplace Vercel → Neon (Postgres, free) : fournit `DATABASE_URL`/`POSTGRES_URL`.
3. Storage → Blob : fournit `BLOB_READ_WRITE_TOKEN`.
4. Variables : `PAYLOAD_SECRET`, `NEXT_PUBLIC_SERVER_URL`, `PREVIEW_SECRET`, optionnel `RESEND_API_KEY` + `CONTACT_TO_EMAIL`.
5. Build : `pnpm build` (les migrations Postgres sont jouées au build : `payload migrate && next build`).
6. Après le premier déploiement : `/admin` → créer le premier utilisateur, puis lancer le seed (`pnpm seed` en local pointant sur la base prod, ou via la route protégée `/api/seed?secret=`… choisi : script local uniquement, plus sûr).
7. Domaine `musicdanceroller.com` → Vercel.

## 7 bis. Décisions prises pendant le build

- Classes maison CSS dans `@layer components`, règles d'éléments dans `@layer base`, pour que les utilitaires Tailwind v4 gagnent (sinon `a { color: inherit }` non couché battait `.tile-ink`).
- Boule à facettes : SVG léger au rendu serveur (14 rangées) remplacé par un canvas (32 rangées, 92 facettes à l'équateur) qui tourne avec le temps et le défilement et publie l'angle dans `--a` ; les disques de lumière suivent en CSS (`sin()`/`cos()`).
- Carte d'accès : OpenStreetMap intégré sans clé quand aucune URL Google Maps n'est renseignée ; inerte jusqu'au clic (« Activer la carte ») pour ne pas capturer la molette.
- Disques de lumière : quatre disques pleins (0,9) à droite du texte et au bas du héros, ordinateur seulement, deux qui se chevauchent pour la troisième couleur ; quatre disques profonds (0,7) partout, y compris derrière le texte (contraste blanc ≥ 5:1). Compromis : un disque plein ne passe jamais derrière du texte courant, blanc sur aqua ou mandarine plein ne tenant pas 3:1.
- Revue de finition impeccable (sous-agent) : première passe « recapture » (captures invalides), deuxième « fix » (huit corrections : premier écran mobile, disques trop sombres, gabarit chiffres, numérotation, chevauchement titre/boule, doublon de sous-titre, photo en double, tuiles téléphone creuses), corrections appliquées puis passe de verdict.
- Serveur de dev local sur le port 3100 (le 3000 est occupé par un autre projet sur la machine d'Ethan).
- Aperçu en direct non testé dans un navigateur connecté à l'admin (je n'entre pas de mot de passe) ; vérifié par lecture du code et du contrat du hook `useLivePreview`.

## 8. Hors périmètre

- Réservation / paiement en ligne.
- Multilingue.
- Page « liens utiles ».
- Compte Facebook/Instagram embarqué (juste des liens).

## 9. Tests / vérification

- `pnpm build` passe (types Payload générés, migrations créées).
- Captures desktop 1440 et mobile 390 de chaque page, contrôle du contraste et du débordement.
- Détecteur impeccable + revue de finition (sous-agent) + documenter (DESIGN.md).
- Lighthouse local (perf/SEO/a11y) sur `/`.
- Live Preview vérifié à la main dans `/admin`.
