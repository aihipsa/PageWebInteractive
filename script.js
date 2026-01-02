// Effet machine à écrire
//jwdkbcjkw

const texteTitre = "Site dynamique"
let indexLettre = 0;

function ecrireMachine() {
    if(indexLettre < texteTitre.length){
        document.getElementById("nomSite").textContent += texteTitre.charAt(indexLettre);
        indexLettre ++;
        setInterval(ecrireMachine, 300);
    }
}

ecrireMachine()

// darkmode/lightmode


function basculerMode(){
    document.body.classList.toggle("mode-sombre")
}

    // =========================
    // 1) CONSTANTES DU JEU
    // =========================

    // Nombre maximum d'essais par partie
    const MAX_ESSAIS = 5;

    // Objectif de victoires pour gagner la session
    const OBJECTIF_VICTOIRES = 5;

    // =========================
    // 2) VARIABLES (ETAT)
    // =========================

    // Le nombre mystère (change à chaque nouvelle partie)
    let nombreMystere = 0;

    // Nombre d'essais utilisés dans la partie en cours
    let essais = 0;

    // Nombre de victoires dans la session
    let victoires = 0;

    // Permet de savoir si la session est en cours (true) ou pas (false)
    let sessionActive = false;

    // =========================
    // 3) ELEMENTS HTML
    // =========================

    // On récupère les éléments du HTML une fois pour éviter de refaire document.getElementById partout
    const input = document.getElementById("proposition");
    const btnProposer = document.getElementById("btnProposer");
    const btnSession = document.getElementById("btnSession");
    const btnfSession = document.getElementById("btnfSession");
    const message = document.getElementById("message");
    const score = document.getElementById("score");

    // =========================
    // 4) PETITES FONCTIONS UTILES
    // =========================

    // Met à jour l'affichage du score (victoires)
    function afficherScore() {
      score.textContent = `Victoires : ${victoires} / ${OBJECTIF_VICTOIRES}`;
    }

    // Démarre une nouvelle PARTIE (dans la session)
    // => nouveau nombre mystère + essais remis à 0 + input vidé
    function nouvellePartie() {
      nombreMystere = Math.floor(Math.random() * 20) + 1; // nombre entre 1 et 20
      essais = 0;                                         // reset essais
      input.value = "";                                   // vide l'input
    }

    // Active ou désactive les contrôles de jeu (input + bouton proposer)
    function activerJeu(active) {
      input.disabled = !active;
      btnProposer.disabled = !active;
    }

    // =========================
    // 5) SESSION : START / STOP
    // =========================

    // Démarrer une session :
    // - remet les victoires à 0
    // - active le jeu
    // - lance une nouvelle partie
    function demarrerSession() {
      sessionActive = true;          // session ON
      victoires = 0;                 // reset victoires
      afficherScore();               // affiche 0 / 5
      activerJeu(true);              // active input + proposer
      btnSession.disabled = true;    // empêche de relancer pendant la session
      message.textContent = "Session démarrée !";
      nouvellePartie();              // lance la 1ère partie
    }

    // Finir une session :
    // - désactive le jeu
    // - réactive le bouton session
    function finirSession(texte) {
      sessionActive = false;         // session OFF
      activerJeu(false);             // bloque le jeu
      btnSession.disabled = false;   // autorise à relancer une nouvelle session
      message.textContent = "Session finie!";   // message final
    }

    // =========================
    // 6) LOGIQUE PRINCIPALE : VERIFIER
    // =========================

    function verifier() {
      // Si la session n'a pas commencé, on ne fait rien
      if (!sessionActive) {
        message.textContent = "Clique sur 'Démarrer session' !";
        return;
      }

      // On transforme la valeur en nombre (Number(...))
      const proposition = Number(input.value);

      // Si ce n'est pas un nombre, on affiche une erreur
      if (isNaN(proposition)) {
        message.textContent = "Proposition non valide !";
        return;
      }

      // On compte cet essai (1 clic = 1 essai)
      essais ++;

      // Cas 1 : trop petit
      if (proposition < nombreMystere) {
        message.textContent = `Trop petit ! (${essais}/${MAX_ESSAIS})`;
      }
      // Cas 2 : trop grand
      else if (proposition > nombreMystere) {
        message.textContent = `Trop grand ! (${essais}/${MAX_ESSAIS})`;
      }
      // Cas 3 : gagné
      else {
        // On ajoute une victoire à la session
        victoires++;
        afficherScore();

        // Si on atteint 5 victoires => session gagnée, on stop tout
        if (victoires === OBJECTIF_VICTOIRES) {
          finirSession(`Bravo ! ${OBJECTIF_VICTOIRES} victoires atteintes ! Session terminée.`);
          return;

        }

        // Sinon : on lance directement une nouvelle partie (session continue)
        message.textContent = `Gagné en ${essais} essais ! (Victoire ${victoires}/${OBJECTIF_VICTOIRES}) ➜ Nouvelle partie...`;
        nouvellePartie();
        return;
      }

      // Si on arrive ici, c'est qu'on n'a pas trouvé le nombre.
      // On regarde si on a atteint la limite d'essais.
      if (essais === MAX_ESSAIS) {
        // Défaite de la partie, mais la session continue :
        // on montre le nombre, puis on relance une nouvelle partie.
        message.textContent = `Perdu ! Le nombre était ${nombreMystere}. ➜ Nouvelle partie...`;
        nouvellePartie();
        this.images.opacity = 1

      }
    }

    // =========================
    // 7) EVENEMENTS (CLICS)
    // =========================

    // Quand on clique sur "Démarrer session"
    btnSession.addEventListener("click", demarrerSession);

class Diaporama{
    constructor(classCSS){
        this.images = document.querySelectorAll(`.${classCSS} img`) //select all img
        this.indexActuel = 0; //index de l'image active/visible (start à 0)
        this.demarrer();
    }

    changerImage(){
        this.images[this.indexActuel].classList.remove('active');

        this.indexActuel = (this.indexActuel + 1) % this.images.length;

        this.images[this.indexActuel].classList.add('active');
    }

    demarrer(){
        this.timer = setInterval( () => this.changerImage(), 5000);
        document.querySelector('.diaporama').addEventListener('mouseenter', () => clearInterval(this.timer));
        document.querySelector('.diaporama').addEventListener('mouseleave',() => {
            clearInterval(this.timer);
        this.timer = setInterval(() => this.changerImage(), 1000); });


    }

}

const monDiapo = new Diaporama("diaporama")
document.querySelector('.diaporama').addEventListener('click', e => {
    e.currentTarget.requestFullscreen();
})