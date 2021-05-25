'use strict';
const input = document.querySelector(".input");
const button = document.querySelector(".button");
const list = document.querySelector(".list");
const section = document.querySelector(".js-section");
let arrayTriple = [];
let favourites = [];

function getList() {
  const inputValue = input.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].show.image) {
          arrayTriple.push({
            image: `${data[i].show.image.medium}`,
            name: `${data[i].show.name}`,
            id: `${data[i].show.id}`,
          });
        } else {
          arrayTriple.push({
            image: `https://via.placeholder.com/100x150/ffffff/666666/?text=TV`,
            name: `${data[i].show.name}`,
            id: `${data[i].show.id}`,
          });
        }
        console.log(arrayTriple);
        paintList(); 
      }
    });
}
function paintList() {
  let seriesList = "";
  for (let i = 0; i < arrayTriple.length; i++) {
    const image = arrayTriple[i].image;
    const titleSeries = arrayTriple[i].name;
    const identifying = arrayTriple[i].id;
    const placeHolderRef = "https://via.placeholder.com/100x150/ffffff/666666/?text=TV";
    if (image === null) {
      seriesList += `<li class="js-card" data-id="${identifying}"><div class="card"><img class="image" src="${placeHolderRef}" alt="sin cartel">${titleSeries}</div></li>`;
    } else {
      seriesList += `<li class="js-card" data-id="${identifying}"><div class="card"><img class="image" src="${image}" alt="cartel">${titleSeries}</div></li>`;
    }
    list.innerHTML = seriesList; 
  }
  addListenersToCards();
}
function handleSearch(event) {
  event.preventDefault();
  getList();
}
button.addEventListener("click", handleSearch);
//FAVORITAS:
function addListenersToCards() {
  const allCards = document.querySelectorAll(".js-card");
  for (const card of allCards) {
    card.addEventListener("click", handleClickCard);
  }
}
function handleClickCard(event) {
  // const whereTheUserClicked = event.target; //no hace falta
  //PASO 1: identifica la li pulsada:
  const whereIAddedTheEvent = event.currentTarget;
  //PASO 2: obtener la info de esa card (<li>):
  const cardId = whereIAddedTheEvent.dataset.id;
  //console.log(cardId) 
  const isInside = favourites.find((idFavourite) => idFavourite.id === cardId); 
  whereIAddedTheEvent.classList.toggle("card2");
  if(isInside === undefined) {
    //"si no coincide con ningun elemento que esté en favoritos..."
    const isInsideArrTrip = arrayTriple.find((idFavourite) => idFavourite.id === cardId);
   // console.log(isInsideArrTrip)
   favourites.push(isInsideArrTrip); //lo meto y relleno mi array SÓLO con los id, PERO NO LE ESTOY METIENDO EL OBJETO ENTERO
  }
  else { //"si SÍ que coincide, entonces lo quito creando un nuevo array con todos los elementos que NO SEAN (o que sean distintos de) cardId".
    favourites = favourites.filter((idFavourite) => idFavourite.id !== cardId);
  }
  console.log(favourites);
  paintFavourites();
  localStorage.setItem("favourites", JSON.stringify(favourites));
}
function paintFavourites() {
    let seriesList = "";
    const favouritesList = document.querySelector(".favourites");
    favouritesList.innerHTML = "";
    for (let i = 0; i < favourites.length; i++) {
      const image = favourites[i].image;
      const titleSeries = favourites[i].name;
      const identifying = favourites[i].id;
      const placeHolderRef = "https://via.placeholder.com/100x150/ffffff/666666/?text=TV";
      if (image === null) {
        seriesList += `<li class="js-card" data-id="${identifying}"><div class="card"><img class="image" src="${placeHolderRef}" alt="sin cartel">${titleSeries}</div></li>`;
      } else {
        seriesList += `<li class="js-card" data-id="${identifying}"><div class="card"><img class="image" src="${image}" alt="cartel">${titleSeries}</div></li>`;
      }
    }
    favouritesList.innerHTML = seriesList; // lo hago aqui una vez ya he conseguido todos mis lis.
  

  }
  function getFromLocalStorage() {
     const localFavourites = JSON.parse(localStorage.getItem("favourites"));
     if(localFavourites !== null) {
         paintFavourites();
     }
     // si es distinto de null en el localStorage
     //si es distinto, añadirlo al array de favourites
     //pintarlo llamando a la función pintar las favoritas
  }
  getFromLocalStorage();
