function afficherProposition(proposition) {
    const zoneProposition = document.querySelector(".zoneProposition");
    if (!zoneProposition) {
        console.error("Zone de proposition introuvable.");
        return;
    }
    zoneProposition.innerText = proposition;
}

function afficherResultat(score, nbMotsProposes) {
    const spanScore = document.querySelector(".zoneScore span");
    if (!spanScore) {
        console.error("Zone de score introuvable.");
        return;
    }
    spanScore.innerText = `${score} / ${nbMotsProposes}`;
}

function lancerJeu() {
    let score = 0;
    let i = 0;
    let tempsEcoule = 0; 
    let intervalId;

    const btnValiderMot = document.getElementById("btnValiderMot");
    const inputEcriture = document.getElementById("inputEcriture");
    const chronoSpan = document.getElementById("chrono");

    if (!btnValiderMot || !inputEcriture || !chronoSpan) {
        console.error("Certains éléments nécessaires n'ont pas été trouvés dans le DOM.");
        return;
    }

    if (!listeMots || listeMots.length === 0) {
        console.error("La liste des mots est vide ou non définie.");
        return;
    }

    intervalId = setInterval(() => {
        tempsEcoule++;
        chronoSpan.innerText = tempsEcoule;
    }, 1000);

    afficherProposition(listeMots[i]);

    btnValiderMot.addEventListener("click", () => {
        const userInput = inputEcriture.value.trim();
        if (userInput === listeMots[i]) {
            score++;
        }
        i++;

        afficherResultat(score, i);
        inputEcriture.value = '';

        if (i >= listeMots.length) {
            afficherProposition("Le jeu est fini");
            btnValiderMot.disabled = true;
            clearInterval(intervalId);
        } else {
            afficherProposition(listeMots[i]);
        }
    });

    afficherResultat(score, i);
}
