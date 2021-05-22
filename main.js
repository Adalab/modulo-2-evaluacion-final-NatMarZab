'use strict';

const input = document.querySelector(".input");
const button = document.querySelector(".button");
const list = document.querySelector(".list");


function getList() {
    const inputValue = input.value;
    fetch(`http://api.tvmaze.com/search/shows?${inputValue}`)
    .then(response => response.json())
    .then(data =>
        console.log(data));
}





function handleSearch(event) {
    event.preventDefault();
    getList();
}


button.addEventListener("click", handleSearch);