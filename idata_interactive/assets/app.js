"use strict";

//ici ce sont mes boutons mais il y a que le "genre" qui marche et c'est normal //
const btnActeur = document.querySelector(".btn-actor");
const btnGenre = document.querySelector(".btn-genre");
const btnYear = document.querySelector(".btn-year");
const filterDisplay = document.querySelector("#filter-display");

let dataFilms = [];

// 2. Fetch du JSON
fetch("assets/data.json")
    .then(response => response.json())
    .then(data => {
        dataFilms = data;
        console.log("Données chargées :", dataFilms);
    })
    .catch(error => console.error('Erreur au chargement du JSON:', error));

// 3. Logique du bouton "Genre"
btnGenre.addEventListener("click", function() {
    filterDisplay.innerHTML = "";

    const tousLesGenres = dataFilms.flatMap(film => film.genre);
    const genresUniques = [...new Set(tousLesGenres)].sort();

    const select = document.createElement("select");
    select.id = "genre-select";

    const defaultOpt = document.createElement("option");
    defaultOpt.textContent = "Choisissez un genre de film";
    select.appendChild(defaultOpt);

    genresUniques.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        select.appendChild(option);
    });

    filterDisplay.appendChild(select);
});


function afficherDiagramme(filmsFiltres) {
    const container = document.querySelector("#diagram-container");
    const template = document.querySelector("#bar-template");

    container.innerHTML = ""; 

    const anneeDebut = 2000;
    const anneeFin = 2025;

    const comptageParAnnee = {};
    filmsFiltres.forEach(film => {
        comptageParAnnee[film.date] = (comptageParAnnee[film.date] || 0) + 1;
    });
    
    const maxFilms = Math.max(...Object.values(comptageParAnnee), 1);

    for (let annee = anneeDebut; annee <= anneeFin; annee++) {
        const nbFilms = comptageParAnnee[annee] || 0;
        const pourcentage = (nbFilms / maxFilms) * 100;

        const clone = template.content.cloneNode(true);

        clone.querySelector(".bar-year").textContent = annee;
        
        const barFill = clone.querySelector(".bar-fill");
        barFill.style.width = pourcentage + "%"; 

        const countSpan = clone.querySelector(".bar-count");
        if (nbFilms > 0) {
            countSpan.textContent = nbFilms;
        } else {
            countSpan.remove(); 
        }

        container.appendChild(clone);
    }
}

document.addEventListener("change", function(event) {
    if (event.target && event.target.id === "genre-select") {
        const genreChoisi = event.target.value;
        
        const filmsFiltres = dataFilms.filter(f => f.genre.includes(genreChoisi));
        
        afficherDiagramme(filmsFiltres);
    }
});