'use strict';

const input = document.querySelector(".input");
const button = document.querySelector(".button");
const list = document.querySelector(".list");
//VARIABLE DE INTENTO 1 Y 2:
//let seriesList = [];

let arrayDoble = [];
const arrayGuay = [];

function getList() {
    const inputValue = input.value;
    
    fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then(response => response.json())
    .then((data) => {
         arrayDoble = new Array(data.length);
        for(let i = 0; i < data.length; i++) {
            arrayDoble[i] = new Array(3);
           // arrayDoble[i][0] = new Array(2); posiblemente me sobre
        }
        for(let i = 0; i < data.length; i++) {
            arrayDoble[i][0] = data[i].show.image;
         //   console.log(arrayDoble[i][0].medium); /FUNCIONA
            arrayDoble[i][1] = data[i].show.name;
            arrayDoble[i][2] = data[i].show.id;
        }
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
        const identifyer = arrayDoble[i][2];
        const placeHolderRef = "https://via.placeholder.com/100x150/ffffff/666666/?text=TV";
        if(image === null) {
            seriesList = `<li id=${identifyer}><img src="${placeHolderRef}" alt="sin cartel">${titleSeries}</li>`;
        }
        else {
            seriesList = `<li id=${identifyer}><img src="${image.medium}" alt="cartel">${titleSeries}</li>`;
        }
        list.innerHTML += seriesList;

   }

}

function handleSearch(event) {
    event.preventDefault();
    getList();
}


button.addEventListener("click", handleSearch);