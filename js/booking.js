'use strict'

let listButton = document.getElementsByClassName('list')[0];
let gridButton = document.getElementsByClassName('grid')[0];
let placesList = document.getElementsByClassName('places_list')[0];

listButton.addEventListener('click', function () {
  listButton.style.background = "#ff6624";
  gridButton.style.background = "#ffffff";
  placesList.style.display = "block";
})

gridButton.addEventListener('click', function () {
  gridButton.style.background = "#ff6624";
  listButton.style.background = "#ffffff";
  placesList.style.cssText = "display: flex; flex-wrap: wrap; align-content: flex-start;"
})