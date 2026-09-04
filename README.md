# Au Taquet · Music Dance Roller

Site vitrine de la patinoire roller couverte **Au Taquet** (Aytré, La Rochelle), en remplacement de musicdanceroller.com.

- **Payload CMS 3** dans **Next.js** (App Router) : une seule application, l'admin est sur `/admin`.
- Pages statiques régénérées à chaque enregistrement dans l'admin (hooks `afterChange` → `revalidatePath`).
- **Aperçu en direct** (Live Preview) sur chaque page : le gérant modifie un texte à gauche et voit le site changer à droite.
- Postgres (Neon sur Vercel, Homebrew en local), images sur Vercel Blob en prod.
- Tailwind v4, polices auto-hébergées (Unbounded, Bricolage Grotesque).

Conception et décisions : `docs/superpowers/specs/2026-09-02-au-taquet-site-design.md`, `PRODUCT.md`, `DESIGN.md`.

## Démarrer en local

Prérequis : Node 22, pnpm 11, Postgres.

```bash
createdb taquet_payload
cp .env.example .env        # puis renseigner DATABASE_URL, PAYLOAD_SECRET, PREVIEW_SECRET
pnpm install
pnpm payload migrate        # crée les tables
pnpm seed                   # contenu réel de l'ancien site, photos, cours, galerie, compte admin
pnpm dev                    # http://localhost:3100 (site) et /admin
```

Le seed crée un compte admin `admin@musicdanceroller.com` / `autaquet-2026` (modifiable par `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`). **À changer dès la première connexion.** Le seed est idempotent : il ne recrée ni les médias, ni les cours, ni les photos déjà présents, mais réécrit les textes des pages. `pnpm seed:reset` vide médias, cours, actualités et galerie (et leurs fichiers sur Blob) pour repartir de zéro ; le compte admin et les textes des pages sont conservés.

Le port de dev est 3100 (le 3000 est pris par un autre projet). Avant de seeder, `public/media` doit être vide : Payload y vérifie l'existence des fichiers et suffixe les noms (`logo-2.jpg`) s'il en trouve.

## Ce que le gérant peut modifier dans `/admin`

| Rubrique | Contenu |
|---|---|
| Pages → Accueil, La patinoire, Cours (page), Anniversaires, Accès, Contact, Mentions légales | Tous les textes, photos, PDF et champs SEO de chaque page, avec aperçu en direct. |
| Réglages → Infos pratiques | Horaires d'ouverture (ils pilotent le « Ouvert jusqu'à 20h » du site), tarifs, adresse, téléphones, réseaux, annonce du moment, logo. |
| Contenu → Cours | Un cours par intervenant : créneaux, niveau, téléphone, site. Alimente le planning de la semaine. |
| Contenu → Actualités | Événements et soirées ; apparaissent sur l'accueil quand elles sont publiées. |
| Contenu → Galerie photos | Les photos de la page Galerie ; les premières sont sur l'accueil. |
| Contenu → Images et fichiers | Les photos et PDF. Chaque image a une description (obligatoire, bonne pour Google). |
| Administration → Messages reçus | Les demandes envoyées depuis le formulaire de contact. |

## Déployer sur Vercel

1. Pousser le dépôt sur GitHub et l'importer sur Vercel (framework : Next.js, build par défaut : `pnpm build`, qui joue les migrations puis construit le site).
2. Onglet **Storage** → **Neon** (Postgres, offre gratuite) : Vercel injecte `DATABASE_URL`.
3. Onglet **Storage** → **Blob**, accès **Public** obligatoire (un store Private refuse les envois du plugin) : Vercel injecte `BLOB_READ_WRITE_TOKEN` et les images sont servies directement depuis `*.public.blob.vercel-storage.com`.
4. Variables d'environnement à ajouter : `PAYLOAD_SECRET` (`openssl rand -hex 24`), `PREVIEW_SECRET`, `NEXT_PUBLIC_SERVER_URL` = `https://musicdanceroller.com`. Facultatif : `RESEND_API_KEY` + `CONTACT_TO_EMAIL` pour recevoir les messages du formulaire par e-mail (sinon ils sont seulement dans l'admin).
5. Déployer. Puis, en local, pointer `DATABASE_URL` et `BLOB_READ_WRITE_TOKEN` sur les valeurs de prod et lancer `pnpm seed` une fois pour remplir la base (le seed téléverse les photos sur Blob).
6. Rattacher le domaine `musicdanceroller.com` sur Vercel. Les anciennes URL `.php` sont redirigées en 301 (`redirects.ts`).

Point d'attention : l'offre **Hobby** de Vercel est réservée à un usage non commercial dans ses conditions. Techniquement tout fonctionne en gratuit ; le respect des CGU (Pro à 20 $/mois) est un choix à faire.

## Scripts

| Commande | Rôle |
|---|---|
| `pnpm dev` | Serveur de développement |
| `pnpm build` | `payload migrate` puis `next build` |
| `pnpm seed` | Remplit la base avec le contenu de départ |
| `pnpm seed:reset` | Vide médias, cours, actualités, galerie et leurs fichiers Blob |
| `pnpm migrate:create` | Crée une migration après un changement de champs dans `src/collections` ou `src/globals` (le schéma n'est jamais poussé à chaud : après un changement de champs, lancer `pnpm migrate:create` puis `pnpm payload migrate`, en local comme en prod via le build) |
| `pnpm generate:types` | Régénère `src/payload-types.ts` |
| `pnpm generate:importmap` | Régénère la carte d'import de l'admin (après ajout d'un plugin) |

## SEO

- Titres et descriptions par page (champs SEO dans l'admin, replis dans le code), canonical, Open Graph, `lang="fr"`.
- Données structurées `SportsActivityLocation` + `LocalBusiness` (adresse, géolocalisation, horaires, téléphone, réseaux) dans le layout, `NewsArticle` + `BreadcrumbList` sur les actualités.
- `sitemap.xml` et `robots.txt` générés (`src/app/(frontend)/sitemap.ts`, `robots.ts`).
- Redirections 301 des dix anciennes pages PHP.
- Mots-clés portés par les titres et les H1 : « Music Dance Roller », « patinoire roller », « La Rochelle », « Aytré ».

## Structure

```
src/
  payload.config.ts      # config Payload (admin en français, plugins SEO et Blob)
  collections/           # cours, actualités, galerie, médias, messages, utilisateurs
  globals/               # une entrée par page + infos pratiques
  hooks/revalidate.ts    # régénération des pages statiques
  migrations/            # migrations Postgres
  app/(frontend)/        # les pages du site (page.tsx = données + SEO, *View.tsx = rendu + live preview)
  app/(payload)/         # admin et API Payload (générés)
  components/            # boule à facettes, disques de lumière, tuiles, planning, etc.
  lib/                   # horaires, formats, SEO, géométrie de la boule
seed/                    # contenu et photos de départ
```
