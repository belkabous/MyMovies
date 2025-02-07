const titre = document.getElementById("titre");
const realisateur = document.getElementById("realisateur");
const annee = document.getElementById("annee");
const genre = document.getElementById("genre");
const imageInput = document.getElementById("image");
const submit = document.getElementById("ajout");
const searchInput = document.getElementById("search");
const filmsContainer = document.getElementById("filmsContainer");

let dataFilm = JSON.parse(localStorage.getItem("film")) || [];

// Fonction pour afficher les films
function afficherFilms() {
    filmsContainer.innerHTML = "";
    dataFilm.forEach((film, index) => {
        filmsContainer.innerHTML += `
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="${film.image}" alt="Film Image" style="width:300px;height:300px;">
                    </div>
                    <div class="flip-card-back">
                        <h1>${film.titre}</h1>
                        <p>Realisateur : ${film.realisateur}</p>
                        <p>Année de sortie : ${film.annee}</p>
                        <p>Genre : ${film.genre}</p>
                        <button onclick="modifierFilm(${index})">MODIFIER</button>
                        <button onclick="supprimerFilm(${index})">SUPPRIMER</button>
                    </div>
                </div>
            </div>
        `;
    });
}

// Fonction pour ajouter un film
submit.onclick = function () {
    const reader = new FileReader();
    reader.onload = function (event) {
        let newFilm = {
            titre: titre.value,
            realisateur: realisateur.value,
            annee: annee.value,
            genre: genre.value,
            image: event.target.result // Stocker l'image 
        };

        dataFilm.push(newFilm);
        localStorage.setItem("film", JSON.stringify(dataFilm));
        afficherFilms();
    };

    if (imageInput.files[0]) {
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        alert("Veuillez sélectionner une image !");
    }
};

// Fonction pour supprimer un film avec confirmation
function supprimerFilm(index) {
    let confirmation = confirm("Voulez-vous vraiment supprimer ce film ?");
    if (confirmation) {
        dataFilm.splice(index, 1);
        localStorage.setItem("film", JSON.stringify(dataFilm));
        afficherFilms();
    }
}

// Fonction pour modifier un film 
function modifierFilm(index) {
    let film = dataFilm[index];
    let nouveauTitre = prompt("Modifier le titre :", film.titre);
    let nouveauRealisateur = prompt("Modifier le réalisateur :", film.realisateur);
    let nouvelleAnnee = prompt("Modifier l'année :", film.annee);
    let nouveauGenre = prompt("Modifier le genre :", film.genre);

    const reader = new FileReader();
    reader.onload = function (event) {
        dataFilm[index] = {
            titre: nouveauTitre || film.titre,
            realisateur: nouveauRealisateur || film.realisateur,
            annee: nouvelleAnnee || film.annee,
            genre: nouveauGenre || film.genre,
            image: event.target.result || film.image
        };

        localStorage.setItem("film", JSON.stringify(dataFilm));
        afficherFilms();
    };

    let newImage = prompt("Voulez-vous changer l'image ? (O/N)");
    if (newImage.toLowerCase() === "o") {
        let fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.onchange = function () {
            if (fileInput.files[0]) {
                reader.readAsDataURL(fileInput.files[0]);
            }
        };
        fileInput.click();
    } else {
        reader.onload(); // Si l'image ne change pas, on sauvegarde le reste
    }
}

// Barre de recherche
searchInput.addEventListener("keyup", function () {
    let filter = searchInput.value.toLowerCase();
    let filteredFilms = dataFilm.filter((film) =>
        film.titre.toLowerCase().includes(filter)
    );

    filmsContainer.innerHTML = "";
    filteredFilms.forEach((film, index) => {
        filmsContainer.innerHTML += `
            <div class="flip-card">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <img src="${film.image}" alt="Film Image" style="width:300px;height:300px;">
                    </div>
                    <div class="flip-card-back">
                        <h1>${film.titre}</h1>
                        <p>Realisateur : ${film.realisateur}</p>
                        <p>Année de sortie : ${film.annee}</p>
                        <p>Genre : ${film.genre}</p>
                        <button onclick="modifierFilm(${index})">MODIFIER</button>
                        <button onclick="supprimerFilm(${index})">SUPPRIMER</button>
                    </div>
                </div>
            </div>
        `;
    });
});

// Charger les films au démarrage
afficherFilms();
