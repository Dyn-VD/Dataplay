"use strict";
 

    // les const pour récupérer les classe btn de l'html tu connais //
    const btnActeur = document.querySelector (".btn-actor");
    const btnGenre = document.querySelector (".btn-genre");
    const btnYear = document.querySelector (".btn-year");
    const filterDisplay = document.querySelector("#filter-display");

    let dataFilms = []; //variable pour stocker films

    // on va fetch, aller chercher le JSON //
    fetch("assets/data.json")
    .then(response => response.json())
    .then(data => {
        dataFilms = data; // les films sont stocké dans cette variable //
        console.log("Données chargées :", dataFilms);
    })
    .catch(error => console.error('ptn gros il y a une erreur:', error));


    btnGenre.addEventListener("click", function() {
        filterDisplay.innerHTML = "";

        // bug de doublons reglé //
        const tousLesGenres = dataFilms.flatMap(film => film.genre);
        const genresUniques = [...new Set(tousLesGenres)].sort();

        // menu déroulant //
        const select = document.createElement("select");
        select.id = "genre-select";

        //message pour l'utilisateur//
        const defaultOpt = document.createElement("option");
        defaultOpt.textContent = "Choisissez un genre de film";
        select.appendChild(defaultOpt);


        
        genresUniques.forEach(genre => {
        const option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        select.appendChild(option);
    });

    // pour afficher le bordel //
    filterDisplay.appendChild(select);
});


// partie test d'affichage //

function afficherFilms(liste) {
    const container = document.querySelector("#movies-container");
    const template = document.querySelector("#movie-template"); // nouveau truc pour genre et année //

    container.innerHTML = "";

    liste.forEach(film => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".movie-title").textContent = film.film;
        clone.querySelector(".movie-date").textContent = film.date;
        clone.querySelector(".movie-genre").textContent = film.genre.join(", ");

        container.appendChild(clone);
    });
}

document.addEventListener("change", function(event) {
    if (event.target && event.target.id === "genre-select") {
        const genreChoisi = event.target.value;
        const filmsFiltres = dataFilms.filter(f => f.genre.includes(genreChoisi));
        afficherFilms(filmsFiltres);
    }
});
    
