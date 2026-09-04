---
name: Au Taquet · Music Dance Roller
description: La boule à facettes faite site : tuiles miroir à angles vifs sur chrome sombre, disques de lumière fuchsia, mandarine et aqua projetés par une boule qui tourne.
colors:
  chrome-950: "#0a0a0e"
  chrome-900: "#121219"
  chrome-800: "#1b1b25"
  chrome-700: "#292935"
  chrome-500: "#5c5d6e"
  chrome-300: "#b6b7c4"
  chrome-100: "#ebebf1"
  mirror: "#ffffff"
  ink: "#0a0a0e"
  fuchsia: "#ff3fa4"
  fuchsia-deep: "#c9127a"
  mandarine: "#ff8c1a"
  mandarine-deep: "#d66a00"
  aqua: "#35e3ff"
  aqua-deep: "#00a9c4"
typography:
  display:
    fontFamily: "Unbounded, 'Arial Black', sans-serif"
    fontSize: "clamp(2.75rem, 9vw, 7rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Unbounded, 'Arial Black', sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 4.5rem)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Unbounded, 'Arial Black', sans-serif"
    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  figure:
    fontFamily: "Unbounded, 'Arial Black', sans-serif"
    fontSize: "2.75rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontFeature: "'tnum'"
  tile-title:
    fontFamily: "Unbounded, 'Arial Black', sans-serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  tile-label:
    fontFamily: "Unbounded, 'Arial Black', sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 700
    lineHeight: 1.375
    letterSpacing: "-0.02em"
  nav:
    fontFamily: "Unbounded, 'Arial Black', sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "0.02em"
  body:
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "'ss01', 'tnum'"
  body-sm:
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.375
    fontFeature: "'ss01', 'tnum'"
  caption:
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.375
    fontFeature: "'ss01', 'tnum'"
rounded:
  none: "0px"
spacing:
  joint: "1px"
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  2xl: "64px"
  3xl: "96px"
components:
  tile-facet:
    backgroundColor: "{colors.fuchsia}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px"
  tile-mirror:
    backgroundColor: "{colors.mirror}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px"
  tile-chrome:
    backgroundColor: "{colors.chrome-800}"
    textColor: "{colors.mirror}"
    rounded: "{rounded.none}"
    padding: "20px"
  tile-aqua:
    backgroundColor: "{colors.aqua}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px"
  tile-mandarine:
    backgroundColor: "{colors.mandarine}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px"
  button-primary:
    backgroundColor: "{colors.fuchsia}"
    textColor: "{colors.ink}"
    typography: "{typography.tile-label}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  button-secondary:
    backgroundColor: "{colors.mirror}"
    textColor: "{colors.ink}"
    typography: "{typography.tile-label}"
    rounded: "{rounded.none}"
    padding: "16px 24px"
  nav-tile:
    backgroundColor: "{colors.chrome-800}"
    textColor: "{colors.chrome-100}"
    typography: "{typography.nav}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "64px"
  nav-tile-active:
    backgroundColor: "{colors.fuchsia}"
    textColor: "{colors.ink}"
    typography: "{typography.nav}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "64px"
  input:
    backgroundColor: "{colors.chrome-800}"
    textColor: "{colors.mirror}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  planning-cell:
    backgroundColor: "{colors.mandarine}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px"
  planning-day:
    backgroundColor: "{colors.chrome-950}"
    textColor: "{colors.mirror}"
    typography: "{typography.nav}"
    rounded: "{rounded.none}"
    padding: "12px"
---

# Design System: Au Taquet · Music Dance Roller

## Overview

**Creative North Star: "La boule à facettes"**

Le site est une boule à miroirs déployée à plat. Tout ce qui porte une information est une tuile : un rectangle à angles vifs, sans rayon, sans dégradé, sans halo, sans bordure ni biseau : un aplat pur dont le bord est dessiné par la couleur voisine, ou par un joint d'1 px de chrome sombre quand deux tuiles chrome se touchent. Les tuiles sont de quatre matières, blanc miroir, chrome et trois aplats de facette (fuchsia, mandarine, aqua), et c'est la matière, pas une ombre, qui dit la hiérarchie : ce qui répond à la question du visiteur (ouvert, prix, adresse, téléphone) est sur aplat, ce qui explique est sur chrome.

Au-dessus du fond chrome quasi noir, une boule à facettes en projection sphérique tourne avec le défilement et publie son angle dans une variable CSS ; une nappe de reflets, petits losanges rangés en anneaux concentriques autour de la boule, tourne avec elle en fusion « screen », des bandes plus vives balayant les anneaux. C'est le seul ornement du monde et il est vivant. Le survol d'une tuile l'allume : elle passe au blanc miroir (une tuile miroir prend la couleur de la page), sans mouvement. Le monde refuse le hero photo au bokeh flou et la grille de cartes blanches arrondies des centres sportifs.

La densité est celle d'un panneau d'affichage : de très grands titres Unbounded noirs et serrés, des corps Bricolage Grotesque courts, des chiffres tabulaires pour horaires et prix, et rien entre le panneau et la note de bas de page. Chaque page reprend le même emblème (la boule) recoloré à la couleur de facette de la page, et cette couleur teinte aussi la sélection, le caret, le pouce de la barre de défilement et le soulignement des liens.

**Key Characteristics:**
- Tuiles à angles vifs (rayon 0), aplats purs sans bordure ni biseau ; joint d'1 px chrome-700 seulement entre deux tuiles chrome ou deux photos ; jamais de rayon, de dégradé ni de halo.
- Fond chrome-950 ; trois aplats de facette + blanc miroir ; texte encre sur aplat, texte chrome-100 / miroir sur chrome.
- Une couleur de facette par page (`--facet`), portée par la boule, la tuile de navigation active, le bouton d'appel, la sélection et les liens.
- Nappe de reflets (`LightField`) : losanges en anneaux concentriques autour de la boule, canvas en `mix-blend-mode: screen`, tournant au même angle que la boule.
- Unbounded noir (900) serré pour le display, Bricolage Grotesque pour le texte, chiffres tabulaires partout.
- Module de 8 px pour tailles, gouttières et rythme ; largeur maximale 1440 px.

## Colors

Une palette de chrome sombre en sept degrés, un blanc miroir, et trois aplats de facette saturés dont chacun a un « deep » pour les disques de lumière qui passent derrière le texte.

### Primary
- **Fuchsia** (`{colors.fuchsia}`) : facette par défaut (`--facet` au chargement) ; couleur de page de l'accueil, des anniversaires et du contact ; aplat du bouton d'appel et de la tuile de navigation active sur ces pages ; disque de lumière « a » partout.
- **Fuchsia profond** (`{colors.fuchsia-deep}`) : un reflet sur cinq de la nappe des pages fuchsia et `--facet-deep`.

### Secondary
- **Aqua** (`{colors.aqua}`) : couleur de page de la patinoire, de l'accès, de la galerie et des mentions légales ; tuile « état d'ouverture » du premier écran ; premier univers de l'accueil ; soulignement du lien Itinéraire.
- **Aqua profond** (`{colors.aqua-deep}`) : un reflet sur cinq de la nappe des pages aqua.

### Tertiary
- **Mandarine** (`{colors.mandarine}`) : couleur de page des cours et des actualités ; couleur par défaut d'un cours dans le planning ; tuile d'erreur du formulaire ; deuxième univers de l'accueil.
- **Mandarine profond** (`{colors.mandarine-deep}`) : un reflet sur cinq de la nappe des pages mandarine.

### Neutral
- **Chrome 950** (`{colors.chrome-950}`) : fond de page, fond des en-têtes de jour du planning, cellules « fermé », cases du pied de page, voile des légendes photo (à 85 %) et de l'en-tête collant (à 95 %).
- **Chrome 900** (`{colors.chrome-900}`) : fond d'attente des images et une tuile sur trois du menu mobile.
- **Chrome 800** (`{colors.chrome-800}`) : la tuile chrome : navigation au repos, tuiles d'explication, tarifs secondaires, champs de formulaire, actualités.
- **Chrome 700** (`{colors.chrome-700}`) : le joint : bordures et fond des grilles à `gap: 1px`, pouce de la barre de défilement.
- **Chrome 500** (`{colors.chrome-500}`) : placeholders de champ et jours sans séance ; jamais pour un texte porteur d'information.
- **Chrome 300** (`{colors.chrome-300}`) : texte secondaire sur fond sombre (précisions, dates, sous-titre du logo, mentions).
- **Chrome 100** (`{colors.chrome-100}`) : corps de texte sur fond sombre.
- **Miroir** (`{colors.mirror}`) : titres sur fond sombre, tuile blanche, anneau de focus.
- **Encre** (`{colors.ink}`) : tout texte posé sur un aplat de facette ou sur la tuile miroir.

### Named Rules
**The Encre-sur-aplat Rule.** Sur un aplat de facette ou une tuile miroir, le texte est toujours encre (`{colors.ink}`), jamais blanc. Le blanc sur fuchsia ou sur aqua n'existe pas dans ce monde.

**The Une-facette-par-page Rule.** Chaque page a une seule couleur de facette (déclarée dans `PAGE_FACET`). Elle est publiée dans `--facet` sur `<html>` et pilote la boule, la tuile de navigation active, le bouton d'appel, la sélection, le caret, le survol de la barre de défilement et le soulignement des liens riches. Une page ne change pas de facette en cours de route.

**The Reflets-derrière-le-texte Rule.** La nappe de reflets s'éteint en s'éloignant de la boule et tombe à 55 % de sa luminosité dans la colonne de texte du héros (60 % partout sous `lg`) ; un reflet ne fait jamais plus de 16 px et ne concurrence jamais un titre.

## Typography

**Display Font:** Unbounded (avec Arial Black, sans-serif), graisses 500 / 700 / 900
**Body Font:** Bricolage Grotesque (avec system-ui, sans-serif), axes `opsz` et `wdth`
**Label/Mono Font:** aucune ; les chiffres tabulaires (`tnum`) de Bricolage tiennent ce rôle.

**Character:** Unbounded, très noir et resserré, fait le panneau lumineux : les titres sont énormes, l'interligne inférieur à 1, l'approche négative. Bricolage Grotesque fait la note claire et chaleureuse qui répond juste dessous. Le corps active `ss01` et `tnum` sur tout le site : horaires, prix et numéros s'alignent en colonnes sans effort.

### Hierarchy
- **Display** (900, `clamp(2.75rem, 9vw, 7rem)`, 0.9, -0.035em) : le titre de l'accueil seulement ; sous-titre en Unbounded 500 `clamp(1.25rem, 2.6vw, 2rem)`. Le nom en pied de page utilise le même dessin en capitales, `clamp(2.5rem, 7vw, 5.5rem)`.
- **Headline** (900, `clamp(2.25rem, 6vw, 4.5rem)`, 0.9, -0.035em) : titre H1 des pages internes et titre de la section « privatisation » (`clamp(2rem, 5vw, 4rem)`).
- **Title** (900, `clamp(1.75rem, 3.5vw, 2.5rem)`, 0.95, -0.02em) : H2 de section ; la présentation de l'accueil monte à `clamp(1.875rem, 4vw, 3rem)` ; titre d'univers 1.5rem, titre d'actualité 700 1.125rem.
- **Figure** (900, 2.75rem à 3rem, 1, -0.035em, tabulaire) : le grand chiffre d'une tuile : prix, nombre d'élèves, numéro de téléphone du bouton d'appel (`clamp(1.125rem, 4.7vw, 2rem)`).
- **Tile title** (500, 1.375rem, 1.25) : première ligne d'une tuile-réponse (« Ouvre samedi à 14h », « Entrée 9 € » avec le prix en 900).
- **Tile label** (700, 0.9375rem) : libellé de tarif, libellé de bouton, titre de case du pied de page, libellé de champ (0.8125rem), nom de cours dans le planning.
- **Nav** (500, 0.8125rem, +0.02em) : tuiles de navigation ; en-têtes de jour du planning en capitales à +0.04em et 700.
- **Body** (400, 1.0625rem, 1.5 ; `lg` sur `sm+` dans les intros) : corps, largeur max 52–68ch (`.prose-taquet` 68ch, intros 60ch, univers 40ch).
- **Body small** (400, 0.9375rem, 1.375) : précisions de tuile, notes de tarifs, résumés d'actualité, liens de pied de page.
- **Caption** (400, 0.8125rem) : légendes photo, mentions, sous-niveau de cours.

### Named Rules
**The Panneau-ou-note Rule.** L'échelle saute du panneau (display, headline, figure) à la note (body, small, caption) ; il n'y a pas de taille intermédiaire molle. Si un texte hésite entre les deux, c'est un titre de tuile (1.375rem, 500) ou un libellé (0.9375rem, 700), rien d'autre.

**The Chiffres-tabulaires Rule.** Tout horaire, prix ou numéro de téléphone est en chiffres tabulaires ; les prix s'écrivent avec l'espace fine et le signe € (« 9 € », « 14 € »), jamais « 9.00 ».

**The Display-serré Rule.** Unbounded ne s'emploie qu'à 500, 700 ou 900, avec interligne ≤ 0.95 et approche négative (-0.02em, -0.035em pour les titres géants). Une seule exception d'approche positive : la navigation et les jours du planning à petite taille (+0.02 / +0.04em).

## Layout

Le site est une seule colonne de largeur maximale 1440 px, centrée, avec des marges de 16 px (`px-4`) sur mobile et 24 px (`px-6`) à partir de `sm` (640 px). L'en-tête est collant, haut de 64 px, sur chrome-950 à 95 % avec un flou de 2 px ; il porte les tuiles de navigation en rangée séparées de joints d'1 px, remplacées sous `md` (768 px) par un bouton « Menu » qui ouvre une grille de tuiles 2 colonnes plein écran.

Le module est de 8 px : les rembourrages internes de tuile sont 20 px (`p-5`) pour les tuiles-réponses et de tarif, 24 px (`p-6`) pour les univers et les cases de pied de page, 12 px (`px-3 py-3`) pour les cellules de planning, 16/24 px pour les boutons. Les sections respirent à 80 px vertical (`py-20`) sur mobile et 128 px (`py-32`) à partir de `lg`, sans filet séparateur : l'espace seul sépare ; entre titre et contenu : 24 px (`mt-6`) ; entre paragraphe et bouton : 32 px (`mt-8`).

Les grilles de tuiles sont des grilles CSS sans bordure extérieure : `gap: 1px` sur fond chrome-700 quand des tuiles chrome ou des photos se touchent (tarifs, actualités, cours, planning, mosaïque, pied de page), `gap: 0` quand les tuiles sont toutes en couleur (bande de réponses, univers, formules). Bande de réponses : 2 colonnes puis 4 à `lg` ; tarifs : 1 → 2 (`sm`) → 4 (`lg`) ; planning : empilé puis 7 colonnes à `md` ; univers : 12 colonnes à `lg` en 5 / 4 / 3 ; mosaïque photo : 2 colonnes puis 12 à `lg` avec la première image sur 6 colonnes et 2 rangées de 220 px ; pied de page : 1 → 2 → 4. Les héros de page interne sont une grille 12 colonnes à `lg` : 8 pour le titre, 4 pour l'aside.

La boule est ancrée en haut à droite et coupée par le bord (760 px sur l'accueil à `lg`, 220 px sur mobile ; 420 / 240 px sur les pages internes) ; elle n'occupe jamais la colonne de texte. Les sections entrent avec une seule animation (`.reveal`, 16 px de translation, 900 ms, expo-out, pilotée par `animation-timeline: view()`), désactivée sous `prefers-reduced-motion`.

## Elevation & Depth

Aucune ombre portée, aucun biseau, aucune bordure : chaque tuile est un aplat pur et son bord n'existe que par le contraste avec sa voisine ou le fond ; deux tuiles chrome sont séparées par un joint d'1 px chrome-700. Ce qui est « devant » est plus clair ou plus saturé (aplat, miroir), ce qui est « derrière » est plus sombre (chrome-800, chrome-950). La lumière, pas l'ombre, fait le relief : nappe de reflets en `screen` derrière le héros, tuile qui passe au blanc au survol.

### Named Rules
**The Lumière-pas-ombre Rule.** On ne pose jamais de `box-shadow` externe sur une tuile ni de dégradé sur un fond. Pour signaler l'importance, on change la matière de la tuile (chrome → miroir → facette) ou on la fait attraper la lumière.

**The Aplat-pur Rule.** Une tuile n'a ni bordure, ni biseau, ni filet ; on ne dessine jamais une ligne pour marquer un bord. Si un bord ne se lit pas, on change la matière de la tuile ou du fond, on n'ajoute pas de trait.

## Shapes

Angles vifs partout : `--radius: 0px`, aucune classe d'arrondi sur les tuiles, boutons, champs, images. Le seul cercle du monde est la pastille de 12 px qui pulse devant « Ouvert jusqu'à… » ; les reflets de la boule sont de petits losanges (4 à 16 px, orientés tangentiellement à leur anneau). Les images sont coupées net dans leur tuile (`overflow: hidden`), au ratio 4/3 ou 16/9, et la boule elle-même est coupée par le bord de la fenêtre. Les seules bordures sont le joint d'1 px chrome-700 (`.joint`) sous l'en-tête et au-dessus du pied de page ; il n'y a pas de bordure claire, pas de contour de couleur, pas de bordure pointillée, pas de bordure autour d'une grille. Les icônes sont des tracés SVG de Lucide, 16 à 24 px, trait 2.5 dans les boutons, alignés sur le texte.

## Components

### Buttons
Le bouton est une tuile qui s'allume : le libellé en Unbounded 700, une icône Lucide devant ou derrière.
- **Shape :** angles vifs (0 px), aplat sans bordure, `inline-flex`, écart icône–texte 12 px.
- **Primary (`tile-facet tile-ink tile-lit`) :** fond `--facet` de la page, texte encre, 16 px / 24 px (`px-6 py-4`), Unbounded 700 0.9375rem. C'est le bouton « Envoyer le message » et la variante compacte du téléphone.
- **Phone tile (`PhoneTile`) :** le bouton principal du site. Tuile facette de hauteur ≥ 10rem sur l'accueil, `p-5`, libellé « Appeler pour réserver » avec icône téléphone 20 px trait 2.5, puis le numéro en Unbounded 900 serré `clamp(1.125rem, 4.7vw, 2rem)` tabulaire, poussé en bas (`justify-between`) ; en mode compact, `self-start` et le numéro à 12 px sous le libellé.
- **Secondary (`tile-mirror tile-lit`) :** fond miroir, texte encre, mêmes dimensions ; bouton « Réserver un anniversaire » avec flèche 16 px.
- **Chrome (`tile-chrome tile-lit`) :** fond chrome-800, texte miroir ; le « Ou le mobile » et la tuile logo de l'en-tête.
- **Hover / Focus :** la tuile s'allume : fond miroir et texte encre en 160 ms expo-out ; une tuile miroir prend la couleur `--facet` de la page. Aucun mouvement, aucun halo. L'anneau de focus est le contour global de 2 px miroir décalé de 3 px. Désactivé : opacité 0.6.
- **Link buttons :** liens de fin de section (« Voir le planning », « Toute la galerie ») en Unbounded 700 0.9375rem soulignés 2 px couleur `--facet` (encre sur aplat), décalage 4 px, survol : texte `--facet` (ou soulignement retiré sur aplat).

### Cards / Containers (tuiles)
- **Corner Style :** 0 px.
- **Background :** `tile-chrome` (chrome-800, texte miroir, secondaire chrome-300), `tile-mirror` (blanc, encre), `tile-fuchsia` / `tile-mandarine` / `tile-aqua` (aplat, encre), `tile-facet` (couleur de page, encre).
- **Shadow Strategy :** aucune ombre, aucun biseau (voir Elevation & Depth).
- **Border :** aucune ; entre deux tuiles chrome, le joint est dessiné par la grille parente (`gap-px` sur chrome-700), sans bordure extérieure.
- **Internal Padding :** 20 px (tuiles-réponses, tarifs, actualités), 24 px (univers, pied de page), 12 px (planning).
- **Anatomie d'une tuile-réponse :** première ligne Unbounded 500 1.375rem (le chiffre clé en 900), précision Bricolage 0.9375rem à 8 px dessous ; contenu réparti haut/bas (`justify-between`) sur hauteur minimale 10rem.
- **Tuile de tarif :** libellé Unbounded 700 0.9375rem, prix Unbounded 900 2.75rem serré, précision 0.9375rem ; la première tuile de la grille est en facette, les autres en chrome ; hauteur minimale 9.5rem.
- **Tuile photo :** image `fill` coupée, légende posée en bas sur voile chrome-950 à 85 %, Bricolage 0.8125rem miroir, 12 px / 8 px.
- **Tuile d'état :** succès en `tile-fuchsia` (Unbounded 900 1.25rem, `p-6`), erreur en `tile-mandarine` (Bricolage 600 0.9375rem, 16 px / 12 px, `role=alert`).

### Inputs / Fields
- **Style :** tuile chrome-800 sans bordure, texte miroir, placeholder chrome-500, 16 px / 12 px, caret `--facet`, pleine largeur ; libellé au-dessus en Unbounded 700 0.8125rem miroir, mention « (facultatif) » en Bricolage 400 chrome-300 ; 8 px entre libellé et champ, 16 px entre champs ; textarea 6 rangées redimensionnable verticalement.
- **Focus :** contour 2 px miroir sans décalage (le champ est déjà une tuile).
- **Error :** tuile mandarine au-dessus du bouton (voir Cards) ; pas de rouge dans ce monde.
- **Disabled :** opacité 0.6 sur le bouton d'envoi, libellé « Envoi… ».

### Navigation
- **Style :** rangée de tuiles chrome-800 hautes de 64 px séparées par des joints d'1 px, dans un en-tête collant chrome-950/95 ; à gauche la tuile-logo (« AU TAQUET » Unbounded 900 1.0625rem capitales -0.02em miroir, « Music Dance Roller » Bricolage 600 0.6875rem chrome-300) ; à droite les pages puis la tuile téléphone en facette (Unbounded 700, icône téléphone 16 px trait 2.5).
- **Typography :** Unbounded 500 0.8125rem +0.02em, texte chrome-100.
- **Hover :** la tuile passe au blanc miroir, texte encre, sans transition. La facette de la page est posée sur `<html>` par un script inline avant le premier rendu (`FACET_INIT_SCRIPT`) puis en `useLayoutEffect` à chaque navigation : aucun changement de couleur visible.
- **Active :** la page courante est la tuile allumée : fond `--facet` de la page, texte encre, `aria-current="page"`.
- **Mobile (`< md`) :** tuile « Menu » chrome avec icône Menu / X 20 px ; ouvert, un panneau fixe sous l'en-tête (`top: 64px`) en grille 2 colonnes de tuiles, texte Unbounded 700 1.25rem aligné en bas, `p-4`, alternance chrome-900 / chrome-800 (une sur trois), page active en facette ; le téléphone en tuile facette sur 2 colonnes avec icône 24 px. Fermeture à Échap ou à la navigation ; le défilement du corps est bloqué.
- **Bandeau d'annonce :** au-dessus de l'en-tête, aplat facette, encre, Bricolage 600 0.9375rem centré, 16 px / 8 px.

### Planning (signature)
La semaine en sept colonnes de tuiles. En-tête de jour sur chrome-950, Unbounded 700 0.8125rem capitales +0.04em miroir (chrome-500 si le jour est vide) ; chaque créneau est une tuile : horaire Bricolage 600 0.875rem tabulaire, nom Unbounded 700 0.9375rem, niveau Bricolage 0.8125rem à 4 px (masqué en mode compact). Patinage libre en tuile miroir ; chaque cours dans la couleur de facette déclarée par l'admin (mandarine par défaut). Jour vide : cellule chrome-950 « Fermé au public » en chrome-500. Sous `md`, les jours s'empilent.

### Boule à facettes et nappe de reflets (signature)
La boule (`DiscoBall`) est un canevas en projection sphérique (rangées de latitude, tuiles rétrécissant vers le bord), teintée à la couleur de facette de la page (`tint`) ou multicolore sur l'accueil (`all`), ancrée hors cadre en haut à droite. Elle tourne avec le temps et le défilement (vitesse 0.12 sur l'accueil, 0.08 sur les pages internes) et publie son angle dans `--a` sur `<html>` (`drive`). La nappe de reflets (`LightField`) est un second canvas qui couvre le héros, en `mix-blend-mode: screen` : il lit la position de la boule (`[data-ball]`) et range de petits losanges en anneaux concentriques autour d'elle (pas de 32 px puis croissant, 34 px entre deux reflets), une couleur de la palette par anneau, cinq bandes de luminosité qui balaient les anneaux au rythme de la rotation. La luminosité décroît avec la distance à la boule, tombe à 55 % dans la colonne de texte, et le tout est figé sous `prefers-reduced-motion`. Aucune dépendance : deux canvas 2D et une variable CSS.

### Texte riche (`.prose-taquet`)
Largeur max 68ch ; H2 Unbounded 1.5rem -0.02em, H3 Unbounded 1.125rem ; paragraphes espacés de 1em ; listes indentées de 1.25em ; liens soulignés 2 px `--facet` (encre dans une tuile claire), texte `--facet` au survol.

## Do's and Don'ts

### Do:
- **Do** construire chaque bloc d'information comme une tuile : angles vifs, aplat pur, joint chrome-700 d'1 px via `gap: 1px` seulement entre tuiles chrome.
- **Do** mettre le texte en encre (`#0a0a0e`) sur toute tuile de facette ou miroir, et en chrome-100 / miroir sur chrome.
- **Do** déclarer la facette d'une nouvelle page dans `PAGE_FACET` et laisser `--facet` piloter la boule, la navigation active, le bouton d'appel, la sélection et les liens.
- **Do** laisser la nappe de reflets s'éteindre en s'éloignant de la boule et rester discrète derrière le texte.
- **Do** répondre d'abord : la première rangée d'une page porte les tuiles ouvert / prix / adresse / téléphone, le téléphone en facette.
- **Do** écrire horaires, prix et numéros en chiffres tabulaires ; le prix avec l'espace fine et « € ».
- **Do** respecter le module de 8 px : rembourrages 12 / 16 / 20 / 24 px, sections 80 / 128 px, largeur max 1440 px.
- **Do** faire s'allumer (`.tile-lit`) toute tuile cliquable, et garder le focus visible sur le contour 2 px miroir.

### Don't:
- **Don't** arrondir un angle : aucun `border-radius` sur tuiles, boutons, champs, images ; seule la pastille « ouvert » est un cercle.
- **Don't** poser d'ombre portée, de dégradé ni de halo flou ; la profondeur vient de la matière des tuiles et de la lumière en `screen`.
- **Don't** écrire du blanc sur fuchsia, mandarine ou aqua.
- **Don't** introduire une cinquième couleur (rouge d'erreur, vert de succès, gris bleuté) : l'erreur est mandarine, le succès est fuchsia, le neutre est chrome.
- **Don't** utiliser une taille de texte intermédiaire entre le titre de tuile (1.375rem) et le corps (1.0625rem), ni une graisse Unbounded autre que 500 / 700 / 900.
- **Don't** mettre de photo en plein écran ni de bokeh flou en fond : les photos vivent dans des tuiles coupées net.
- **Don't** doubler la boule : un seul emblème par page, ancré en haut à droite et coupé par le bord.
- **Don't** utiliser de bordure claire ou colorée comme séparateur ; le joint est toujours 1 px chrome-700.
