// script.js
function afficherProposition(proposition) {
  const zoneProposition = document.querySelector(".zoneProposition");
  if (!zoneProposition) return console.error("Zone de proposition introuvable.");
  zoneProposition.innerText = proposition;
}

function afficherResultat(score, nbProposes) {
  const spanScore = document.querySelector(".zoneScore span");
  if (!spanScore) return console.error("Zone de score introuvable.");
  spanScore.innerText = `${score} / ${nbProposes}`;
}

// Normalisation tolérante : minuscules, sans accents, sans ponctuation, espaces réduits
function normaliser(texte) {
  return texte
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ") // enlève ponctuation
    .replace(/\s+/g, " ")
    .trim();
}

// Renvoie la liste selon l’option choisie
function getListeSource() {
  const radioPhrases = document.getElementById("phrases");
  return radioPhrases && radioPhrases.checked ? listePhrases : listeMots;
}

function lancerJeu() {
  let score = 0;
  let i = 0;
  let tempsEcoule = 0;
  let intervalId;

  const btnValiderMot = document.getElementById("btnValiderMot");
  const inputEcriture = document.getElementById("inputEcriture");
  const chronoSpan = document.getElementById("chrono");
  const radios = document.querySelectorAll("input[name='optionSource']");

  if (!btnValiderMot || !inputEcriture || !chronoSpan) {
    console.error("Éléments manquants dans le DOM.");
    return;
  }
  if (!Array.isArray(listeMots) || !Array.isArray(listePhrases)) {
    console.error("Listes de données non trouvées.");
    return;
  }

  function startChrono() {
    stopChrono();
    tempsEcoule = 0;
    chronoSpan.innerText = "0";
    intervalId = setInterval(() => {
      tempsEcoule++;
      chronoSpan.innerText = String(tempsEcoule);
    }, 1000);
  }
  function stopChrono() {
    if (intervalId) clearInterval(intervalId);
  }

  function resetJeu() {
    score = 0;
    i = 0;
    btnValiderMot.disabled = false;
    inputEcriture.value = "";
    afficherResultat(score, i);
    afficherProposition(getListeSource()[i]);
    startChrono();
  }

  // Démarrage initial
  resetJeu();

  // Changer de source (mots/phrases) remet tout à zéro
  radios.forEach(r =>
    r.addEventListener("change", () => {
      resetJeu();
    })
  );

  btnValiderMot.addEventListener("click", () => {
    const liste = getListeSource();
    const proposition = liste[i];

    const saisieNorm = normaliser(inputEcriture.value);
    const propositionNorm = normaliser(proposition);

    if (saisieNorm && saisieNorm === propositionNorm) {
      score++;
    }
    i++;

    afficherResultat(score, i);
    inputEcriture.value = "";

    if (i >= liste.length) {
      afficherProposition("Le jeu est fini");
      btnValiderMot.disabled = true;
      stopChrono();
    } else {
      afficherProposition(liste[i]);
    }
  });
}
