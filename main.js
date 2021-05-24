'use strict';

const input = document.querySelector(".input");
const button = document.querySelector(".button");
const list = document.querySelector(".list");
let arrayDoble = [];
let favourites = [];
// if(localStorage.getItem("arrayDoble") === null) {
// getList(); pero tengo el problema de que el inputValue depende de un evento q se produce más adelante!!
// }

function getList() {
    const inputValue = input.value;
    fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then(response => response.json())
    .then((data) => {
         arrayDoble = new Array(data.length);
        for(let i = 0; i < data.length; i++) {
            arrayDoble[i] = new Array(3);
        }
        for(let i = 0; i < data.length; i++) {
            arrayDoble[i][0] = data[i].show.image;
         //   console.log(arrayDoble[i][0].medium); /FUNCIONA
            arrayDoble[i][1] = data[i].show.name;
            arrayDoble[i][2] = data[i].show.id;
        }
        localStorage.setItem("arrayDoble", JSON.stringify(arrayDoble));
        paintList(arrayDoble); //FUNCIONA!!!!!
      }
    );
}
function paintList(arrayDoble){
    let seriesList = "";
  //  console.log(arrayDoble[5][0].medium); ¡¡funciona!!
    for (let i = 0;  i < arrayDoble.length; i++) {
        const image = arrayDoble[i][0];        
        const titleSeries= arrayDoble[i][1];
        const identifying = arrayDoble[i][2];
        const placeHolderRef = "https://via.placeholder.com/100x150/ffffff/666666/?text=TV";
        if(image === null) {
            seriesList = `<li class="js-card" data-id="${identifying}"><div class="card"><img class="image" src="${placeHolderRef}" alt="sin cartel">${titleSeries}</div></li>`;
        }
        else {
            seriesList = `<li class="js-card" data-id="${identifying}"><div class="card"><img class="image" src="${image.medium}" alt="cartel">${titleSeries}</div></li>`;
        }
        list.innerHTML += seriesList;
   }
   addListenersToCards();
   //Pintar las favoritas: buscar si el elmento que se está pintando está en el array de favoritas. Sustituyo el cardID por la referencia a ese elemento q tengo dentro de esta función, q es identifying:
   const isInside = favourites.find(idFavourite => idFavourite === identifying);
}
function handleSearch(event) {
    event.preventDefault();
    getList();
}
button.addEventListener("click", handleSearch);

//FAVORITAS:

function addListenersToCards() {
    const allCards = document.querySelectorAll(".js-card");
    for(const card of allCards) {
        card.addEventListener("click", handleClickCard);
    }
}
function handleClickCard(event) {
   // const whereTheUserClicked = event.target; //no hace falta
    //PASO 1: identifica la li pulsada:
    const whereIAddedTheEvent = event.currentTarget; 
    //PASO 2: obtener la info de esa card:
    const cardId = whereIAddedTheEvent.dataset.id;
    //console.log(cardId) funciona!!
    //PASO 3: buscar si el elmento por el que identifico la card está en el array de favoritas:
    const isInside = favourites.find(idFavourite => idFavourite === cardId);
    //PASO 4: guardarla en o quitarla del array de favoritas, guardando o quitando el elemento identificador:
    if(isInside === undefined) {
        favourites.push(cardId);
    }
    else {
        favourites = favourites.filter(idFavourite !== cardId);
    }
    // console.log(favourites); funciona!! 
    //PASO 5: pintar las favoritas:
    //paintList();
}