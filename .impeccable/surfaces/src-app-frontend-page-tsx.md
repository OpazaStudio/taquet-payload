---
version: 1
slug: "src-app-frontend-page-tsx"
primary_target: "src/app/(frontend)/page.tsx"
related_targets: ["src/app/(frontend)/layout.tsx"]
---

# Surface : page d'accueil `/` (et système du site entier)

Scope : accueil du site Au Taquet / Music Dance Roller, et le monde visuel que toutes les pages internes (patinoire, cours, anniversaires, accès, contact, actualités, galerie, mentions) héritent. Mode visiteur : **Persuade**.

Audience et job : parent de l'agglomération de La Rochelle sur téléphone (soir, canapé, ou en voiture le samedi midi) qui veut savoir si c'est ouvert, le prix, l'adresse, et appeler pour une table d'anniversaire ; ado ou adulte qui cherche un cours hebdomadaire. Action principale : appeler le 05 46 31 17 72. Action secondaire : réserver un anniversaire, voir les cours.

Preuve et contenu : contenu réel de l'ancien site (tarifs 2025, horaires, cours 2025/2026, formules), photos réelles 800 px de la salle rouge, boule à facettes et patin strassé (à remplacer par le gérant). Pas de témoignages, pas de chiffres inventés.

Contraintes : les deux noms (Au Taquet, Music Dance Roller) ensemble ; « roller » dit partout où l'on dit « patinoire » ; tout texte et toute image sont des champs Payload ; statique ; contraste 4,5:1 sous lumière de jour sur téléphone.

Scène physique qui a tranché clair/sombre : un parent, le vendredi soir, lampes basses, téléphone à la main. Fond sombre chromé ; les tuiles-réponses (ouvert / prix / adresse / téléphone) sont en blanc sur aplat de couleur pour rester lisibles au soleil.

Décision de direction (tirage non présenté à Ethan, absent ; direction assignée construite, sortie « canon » non prise) : monde de la boule à facettes, 6ᵉ candidat de ma liste de 7 (1 lecture littérale du shot Dribbble, 2 pochette et rondelle de 45 tours, 3 comptoir de location de patins, 4 sol peint de la piste, 5 flyer fluo de soirée, 6 facette de boule à miroirs, 7 planning A4 du gymnase). Challengers pesés : risographie (compétitif : lisibilité papier), affiche Push Pin (compétitif : identification enfants), paysage urbain nocturne, feuille Miura, détecteur de particules, collage Greiman (déclinés).

Raises tirées des challengers, écrites dans la direction :
- Raise « cityscape » : la page dit l'heure. La première tuile calcule l'état d'ouverture (ouvert jusqu'à 20h / prochaine ouverture samedi 14h) depuis les horaires de l'admin.
- Raise « risographie » : les disques de lumière se superposent en `mix-blend-mode: screen` et produisent une troisième couleur, comme les encres qui se multiplient.
- Raise « Miura » : un seul module de facette (8 px) règle tailles de tuiles, gouttières et échelle typographique.
- Raise « détecteur » : la boule est une vraie projection sphérique (rangées de latitude, tuiles qui rétrécissent vers le bord), pas une grille plate.
- Raise « Greiman » : l'échelle saute de la note de bas de page au panneau ; pas de tailles intermédiaires molles.
- Raise « Push Pin » : un seul emblème (la boule) ancre chaque page, recoloré à la couleur de la page.

Moment mémorable : la boule à facettes qui tourne avec le défilement et jette des disques de lumière colorés qui dérivent sur toute la page ; chaque tuile survolée « attrape la lumière ».

## Direction contract

THESIS: Au Taquet est la boule à facettes : la page est faite de tuiles miroir à bords nets et des disques de lumière colorés qu'une boule qui tourne projette ; elle refuse le hero photo au bokeh flou et la grille de cartes blanche des centres sportifs.

OWN-WORLD: fond chrome quasi noir ; trois aplats de facette, fuchsia, mandarine, aqua, plus blanc ; tuiles carrées à angles vifs avec un biseau clair de 1 px en haut, sans rayon, sans dégradé, sans halo ; ellipses de lumière nettes qui se superposent en screen ; Unbounded (display large), Bricolage Grotesque (texte), chiffres tabulaires pour horaires et prix.

STORY: un parent comprend « roller + musique + danse sous un même toit à La Rochelle », lit l'état d'ouverture du jour et le prix dès le premier écran, puis appelle ou réserve une table d'anniversaire.

FIRST VIEWPORT: à gauche, « Music Dance Roller » en display géant puis « la patinoire roller de La Rochelle » à l'échelle du dessous ; sous le titre, une bande de quatre tuiles : état d'ouverture, tarif, adresse, téléphone (bouton principal) ; à droite, la boule à facettes coupée par le bord supérieur droit, disques de lumière qui dérivent sur le fond ; navigation en rangée de tuiles en haut.

FORM: facette de boule à miroirs, candidat 6 sur 7, seed a56b25a4, code-led (pas de génération d'image disponible).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Non résolu

- Le logo actuel (312×192, rouge) jure avec la palette ; il est affiché en pied de page seulement tant que le gérant n'en fournit pas un autre.
- Choix Vercel Hobby vs Pro (CGU commerciales) : à Ethan.

## État de finition (2026-09-02)

- Revue de finition (sous-agent impeccable-finish-reviewer) : passe 1 « recapture » ; passe 2 « fix » (huit correctifs matériels, tous appliqués) ; verdict 1 : six résolus, deux ouverts ; correctifs ; verdict 2 : A (titre/boule), B (disques), C (régression) résolus, D partiel (photo en double sur l'accueil) ; photo remplacée puis vérifiée par capture, sans troisième passe (budget de deux tours d'un run non assisté).
- DESIGN.md écrit par le documenter depuis le site construit.
- Provenance : `public/opengraph.jpg` et `seed/media/*.jpg` portent leur origine (embed-prompt), scan 0 manquant.
- Captures finales : `.impeccable/review/*.png` (build de production, 16 captures).
