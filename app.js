/* ==========================================================================
   GUIDE DBD — FICHIER JAVASCRIPT PRINCIPAL
   Technologies : JavaScript Vanilla + GSAP (GreenSock)
   Niveau : Débutant 1ère année (Simple, clair et commenté pour l'oral)
   ========================================================================== */

// On attend que tout le document HTML soit bien chargé avant de lancer GSAP
window.addEventListener("DOMContentLoaded", () => {

  // On enregistre les plugins GSAP dont on a besoin
  gsap.registerPlugin(ScrollTrigger, Draggable);


  /* ==========================================================================
     1. ANIMATION CLASSIQUE : ENTRÉE DU HERO (PAGE D'ACCUEIL)
     Explication : On fait apparaître le titre, le texte et les boutons
     avec un effet de fondu (opacity) et un petit déplacement vertical (y).
     ========================================================================== */

  // On crée une "Timeline" GSAP pour enchaîner les animations dans l'ordre
  const heroTimeline = gsap.timeline({
    defaults: { duration: 0.8, ease: "power2.out" }
  });

  // Le tag apparaît en premier
  heroTimeline.from(".hero-content .tag", {
    opacity: 0,
    y: -20
  })
  // Puis le gros titre monte vers sa place
  .from(".hero-title", {
    opacity: 0,
    y: 30
  }, "-=0.4") // "-=0.4" permet de commencer un peu avant la fin de l'animation précédente
  // Ensuite la description
  .from(".hero-description", {
    opacity: 0,
    y: 20
  }, "-=0.3")
  // Et enfin les deux boutons d'action
  .from(".hero-buttons .btn", {
    opacity: 0,
    y: 15,
    stagger: 0.15 // Fait apparaître les boutons l'un après l'autre avec un décalage de 0.15s
  }, "-=0.2");



  /* ==========================================================================
     2. INTERACTION AU CLIC : CHANGEMENT DE RÔLE (SURVIVANT / TUEUR)
     Explication : Quand l'utilisateur clique sur "Survivant" ou "Tueur",
     on modifie le texte, l'image et on anime la carte avec GSAP.
     ========================================================================== */

  // On récupère les boutons et les éléments à modifier
  const btnSurvivor = document.querySelector("#btn-survivor");
  const btnKiller = document.querySelector("#btn-killer");

  const roleCard = document.querySelector("#role-display-card");
  const roleBadge = document.querySelector("#role-badge");
  const roleTitle = document.querySelector("#role-title");
  const roleDesc = document.querySelector("#role-desc");
  const roleTips = document.querySelector("#role-tips");
  const roleImage = document.querySelector("#role-image");

  // Données pour le rôle Survivant
  const survivorData = {
    badge: "ÉQUIPE DE 4 JOUEURS",
    title: "Le Survivant : Coopérer pour Fuir",
    desc: "Votre but est de réparer 5 générateurs avec vos 3 coéquipiers, d'alimenter les portes de sortie et de vous échapper vivants sans vous faire capturer par le Tueur.",
    tips: [
      "Priorité : Réparez les générateurs en restant vigilant aux bruits de battements de cœur.",
      "Entraide : Soignez vos coéquipiers blessés et décrochez-les rapidement.",
      "Esquive : Utilisez les palettes et les fenêtres pour faire perdre du temps au Tueur."
    ],
    image: "assets/img/survivant.jpg"
  };

  // Données pour le rôle Tueur
  const killerData = {
    badge: "JOUEUR SOLO PUISSANT",
    title: "Le Tueur : Traquer et Sacrifier",
    desc: "Vous incarnez une force implacable en vue première personne. Votre objectif est de trouver les 4 survivants, les blesser, les mettre à terre et les sacrifier sur les crochets pour l'Entité.",
    tips: [
      "Pression : Patrouillez entre les générateurs pour empêcher les survivants d'avancer.",
      "Poursuite : Anticipez les mouvements des proies et coupez-leur la route.",
      "Crochets : Ne campez pas un crochet, continuez à mettre la pression sur toute la carte."
    ],
    image: "assets/img/tueur.jpg"
  };

  // Fonction simple qui met à jour les informations et anime la carte
  function updateRole(data, isSurvivor) {
    // 1. Petite animation GSAP : on fait un léger zoom et fondu pour le changement
    gsap.fromTo(roleCard, 
      { opacity: 0.4, scale: 0.98 }, 
      { opacity: 1, scale: 1, duration: 0.35, ease: "power1.out" }
    );

    // 2. On change le texte dans le HTML
    roleBadge.textContent = data.badge;
    roleTitle.textContent = data.title;
    roleDesc.textContent = data.desc;
    roleImage.src = data.image;

    // 3. On met à jour la liste des conseils
    roleTips.innerHTML = `
      <li><strong>${data.tips[0].split(":")[0]} :</strong> ${data.tips[0].split(":")[1]}</li>
      <li><strong>${data.tips[1].split(":")[0]} :</strong> ${data.tips[1].split(":")[1]}</li>
      <li><strong>${data.tips[2].split(":")[0]} :</strong> ${data.tips[2].split(":")[1]}</li>
    `;

    // 4. On met la classe "active" sur le bon bouton
    if (isSurvivor) {
      btnSurvivor.classList.add("active");
      btnKiller.classList.remove("active");
    } else {
      btnKiller.classList.add("active");
      btnSurvivor.classList.remove("active");
    }
  }

  // Écouteurs de clic simples
  btnSurvivor.addEventListener("click", () => {
    updateRole(survivorData, true);
  });

  btnKiller.addEventListener("click", () => {
    updateRole(killerData, false);
  });



  /* ==========================================================================
     3. DÉPLACEMENT AU SCROLL : LA TRAQUE ET LE GÉNÉRATEUR (SCROLLTRIGGER)
     Explication : En scrollant dans la section, le Survivant et le Tueur avancent
     horizontalement sur la piste, et la barre du générateur se remplit.
     L'option "scrub: 1" synchronise l'animation directement avec la molette.
     ========================================================================== */

  // 1. Déplacement du Survivant vers la porte de sortie
  gsap.to("#runner-survivor", {
    xPercent: 450, // Se déplace vers la droite
    ease: "none",
    scrollTrigger: {
      trigger: "#chase-container",
      start: "top 75%", // Démarre quand le conteneur arrive à 75% du haut de l'écran
      end: "bottom 30%", // Se termine quand le bas du conteneur dépasse
      scrub: 1 // L'animation avance et recule doucement avec le scroll
    }
  });

  // 2. Déplacement du Tueur (qui pourchasse le survivant)
  gsap.to("#runner-killer", {
    xPercent: 360, // Avance aussi vers la droite mais reste un peu derrière
    ease: "none",
    scrollTrigger: {
      trigger: "#chase-container",
      start: "top 75%",
      end: "bottom 30%",
      scrub: 1
    }
  });

  // 3. Remplissage de la barre de réparation du générateur au scroll
  gsap.to("#generator-fill", {
    width: "100%", // La barre passe de 0% à 100%
    ease: "none",
    scrollTrigger: {
      trigger: "#chase-container",
      start: "top 75%",
      end: "bottom 30%",
      scrub: 1,
      // À chaque mouvement de scroll, on met à jour le texte du pourcentage affiché
      onUpdate: (self) => {
        const percent = Math.round(self.progress * 100);
        const percentText = document.querySelector("#gen-percent-text");
        if (percentText) {
          percentText.textContent = percent + "%";
        }
      }
    }
  });



  /* ==========================================================================
     4. GLISSÉ - DÉPOSÉ (DRAG & DROP) AVEC GSAP DRAGGABLE
     Explication : On permet à l'utilisateur de glisser les 3 objets d'inventaire
     avec la souris ou au doigt. Une boîte délimite la zone (bounds).
     ========================================================================== */

  // On initialise Draggable sur tous les objets ayant la classe ".drag-item"
  Draggable.create(".drag-item", {
    type: "x,y", // Déplacement libre sur les axes X et Y
    bounds: "#inventory-area", // Les objets ne peuvent pas sortir de la zone d'inventaire
    edgeResistance: 0.65, // Petite résistance aux bords
    
    // Quand l'utilisateur clique et commence à glisser
    onPress: function () {
      gsap.to(this.target, { scale: 1.1, duration: 0.15 }); // On grossit un peu l'objet
    },
    
    // Quand l'utilisateur relâche l'objet
    onRelease: function () {
      gsap.to(this.target, { scale: 1, duration: 0.15 }); // On remet l'objet à sa taille normale
    }
  });

  // Bouton pour réinitialiser la position de tous les objets à zéro
  const resetBtn = document.querySelector("#btn-reset-drag");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      // On anime le retour de chaque objet à sa position initiale (x: 0, y: 0)
      gsap.to(".drag-item", {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    });
  }



  /* ==========================================================================
     5. APPARITION DES CARTES DE BUILDS AU SCROLL
     Explication : Les 3 cartes de builds montent et apparaissent l'une après l'autre
     (effet stagger) dès que la section devient visible à l'écran.
     ========================================================================== */

  gsap.from(".build-card", {
    opacity: 0,
    y: 50,
    duration: 0.7,
    stagger: 0.2, // Décalage de 0.2s entre chaque carte
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#builds",
      start: "top 80%", // Se déclenche quand la section arrive dans l'écran
      once: true // L'animation ne se joue qu'une seule fois
    }
  });

});
