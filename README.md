# Guide DBD — Site Onepage Narratif (Projet B2)

Guide interactif Dead by Daylight conçu selon les consignes du cours : site onepage vertical narratif au scroll avec GSAP, HTML5 et CSS3.

## Critères respectés

1. **Format Onepage Vertical** : Découpage narratif en 5 sections (Accueil, Les Rôles, La Traque, L'Inventaire, Les Builds).
2. **Animations classiques GSAP** :
   - `gsap.timeline()` et `gsap.from()` pour l'apparition en cascade du titre, de la description et des boutons dans le Hero.
3. **Déplacement au scroll (ScrollTrigger avec scrub)** :
   - Course-poursuite animée entre le Survivant et le Tueur vers la sortie au fur et à mesure du scroll.
   - Jauge de réparation du générateur qui se remplit de 0% à 100% avec mise à jour en temps réel du pourcentage.
4. **Glissé - Déposé (GSAP Draggable)** :
   - Boîte à outils, trousse de secours et lampe torche déplaçables à la souris ou au doigt dans la zone d'inventaire.
   - Bouton de réinitialisation pour replacer les objets à leur position initiale avec une animation fluide.
5. **Interactions au clic** :
   - Sélecteur de rôle (Survivant vs Tueur) avec mise à jour dynamique du texte, des conseils et de l'image via GSAP (`gsap.fromTo()`).
6. **Cartes avec apparition au scroll** :
   - Apparition échelonnée des builds de perks avec `ScrollTrigger` et `stagger`.
7. **Poids des images optimisé** :
   - Tous les visuels font moins de 300 Ko.

## Comment lancer le projet

Il suffit d'ouvrir le fichier `index.html` dans n'importe quel navigateur web (Chrome, Firefox, Edge, Safari). Aucun serveur Node.js ou installation n'est nécessaire.

## Structure des fichiers

- `index.html` : Structure sémantique de la page onepage.
- `styles.css` : Feuille de style lisible, claire et sans complexité superflue.
- `app.js` : Code JavaScript avec GSAP, entièrement commenté en français pour faciliter l'explication à l'oral.
- `assets/` :
  - `img/` : Images du jeu (< 300 Ko), incluant les icônes d'objets officielles.
  - `video/` : Vidéo d'ambiance du hero.
- `JS/GSAP/` : Scripts de la bibliothèque GSAP (`gsap.min.js`, `ScrollTrigger.min.js`, `Draggable.min.js`).
