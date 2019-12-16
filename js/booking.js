'use strict'

let listButton = document.getElementsByClassName('fas fa-list')[0];
let place_overviews = document.getElementsByClassName("place_overview");
let gridButton = document.getElementsByClassName('fas fa-th')[0];
let placesList = document.getElementsByClassName('places_list')[0];
let noSortingButton = document.getElementsByClassName('no_sorting_button')[0];
let bestRatingButton = document.getElementsByClassName('best_rating_button')[0];
let mostVisitedButton = document.getElementsByClassName('most_visited_button')[0];


if (listButton != null)
listButton.addEventListener('click', function () {
  listButton.style.background = "#ff6624";
  gridButton.style.background = "#ffffff";
  placesList.style.display = "inline-block";
  placesList.style.width = "33%";
  let map = document.getElementById("map");

  map.style.display = "block";
  map.style.position = "sticky";

  [...place_overviews].forEach(elem => {
    console.log(elem);
    elem.style.width = "100%";
  })
})

if (gridButton != null)
gridButton.addEventListener('click', function () {
  gridButton.style.background = "#ff6624";
  listButton.style.background = "#ffffff";
  placesList.style.cssText = "display: flex; flex-wrap: wrap; align-content: flex-start;"
  let map = document.getElementById("map");
  map.style.display = "none";

  [...place_overviews].forEach(elem => {
    console.log(elem);
    elem.style.width = "22.5%";
  })
})

function sortByRating() {
  if (bestRatingButton.style.background == "rgb(255, 102, 36)")
    return;

  mostVisitedButton.removeEventListener('click', sortByVisits);
  getPlaceIDs("rating");

  bestRatingButton.style.background = "#ff6624";
  mostVisitedButton.style.background = "#ffffff";
  noSortingButton.style.display = "none";

  document.getElementById('selected_option').innerHTML = "<i class='fas fa-smile-beam'></i> Best Rating";
  mostVisitedButton.addEventListener('click', sortByVisits);
}

function sortByVisits() {
  if (mostVisitedButton.style.background == "rgb(255, 102, 36)")
    return;

  bestRatingButton.removeEventListener('click', sortByRating);
  getPlaceIDs("visits");

  mostVisitedButton.style.background = "#ff6624";
  bestRatingButton.style.background = "#ffffff";
  noSortingButton.style.display = "none";

  document.getElementById('selected_option').innerHTML = "<i class='fas fa-burn'></i> Most Visited";
  bestRatingButton.addEventListener('click', sortByRating);
}

if (bestRatingButton != null)
  bestRatingButton.addEventListener('click', sortByRating);

if (mostVisitedButton != null)
  mostVisitedButton.addEventListener('click', sortByVisits);

let placesToSort = [];
let placeStrs = [];
let storedIDs = [];

function getPlaceIDs(option) {
  placesToSort = [];
  placeStrs = [];
  storedIDs = [];
  let str = placesList.innerHTML;
  let i = 0;
  let startIndex;
  let midIndex;
  let endIndex;
  let tempstr;
  while (true) {
    startIndex = str.indexOf("<article class=\"place_overview\"");
    midIndex = str.indexOf(">");
    if (startIndex == -1)
      break;
    tempstr = str.substring(midIndex);
    endIndex = tempstr.indexOf("<article class=\"place_overview\"");
    if (endIndex == -1)
      tempstr = str.substring(startIndex);
    else
      tempstr = str.substring(startIndex, midIndex + endIndex);
    str = str.substring(midIndex + endIndex);
    placeStrs[i] = tempstr;
    i++;
    if (endIndex == -1)
      break;
  }
  if (placeStrs.length == 0)
    return;

  for (let j = 0; j < placeStrs.length; j++) {
    startIndex = placeStrs[j].indexOf("value=\"");
    tempstr = placeStrs[j].substring(startIndex + 7);
    endIndex = tempstr.indexOf("\"") + 7;
    tempstr = placeStrs[j].substring(startIndex + 7, startIndex + endIndex);
    storedIDs[j] = parseInt(tempstr);
    let place = new Object();
    place.id = parseInt(tempstr);
    placesToSort[j] = place;
  }

  let request = new XMLHttpRequest();
  if (option == "rating") {
    request.onload = orderPlacesByRating;
    request.open("post", "../api/api_get_places_ratings.php", true);
  }
  else if (option == "visits") {
    request.onload = orderPlacesByVisits;
    request.open("post", "../api/api_get_places_reservations.php", true);
  }
  else {
    return;
  }
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({}));
}

function orderPlacesByRating() {
  let response = JSON.parse(this.responseText);
  let ratingsAdded = 0;
  placesToSort.forEach(element => {
    element.rating = 0;
    for (let j = 0; j < response.length; j++) {
      if (element.id == parseInt(response[j].place_id)) {
        element.rating = element.rating + parseFloat(response[j].rating);
        ratingsAdded++;
      }
    }
    if (ratingsAdded != 0)
      element.rating = element.rating / ratingsAdded;
    ratingsAdded = 0;
  });

  let count = 0;
  let orderedIDs = [];
  let storedRatings = [];
  for (let j = 0; j < placesToSort.length; j++) {
    storedRatings[j] = placesToSort[j].rating;
  }

  while (placesToSort.length) {
    let i = storedRatings.indexOf(Math.max(...storedRatings));
    orderedIDs[count] = placesToSort[i].id;
    count++;
    storedRatings.splice(i, 1);
    placesToSort.splice(i, 1);
  }

  orderPlaces(orderedIDs);
}

function orderPlacesByVisits() {
  let response = JSON.parse(this.responseText);
  placesToSort.forEach(element => {
    element.visits = 0;
    for (let j = 0; j < response.length; j++) {
      if (element.id == parseInt(response[j].place_id)) {
        element.visits++;
      }
    }
  });

  let count = 0;
  let orderedIDs = [];
  let storedVisits = [];
  for (let j = 0; j < placesToSort.length; j++) {
    storedVisits[j] = placesToSort[j].visits;
  }

  while (placesToSort.length) {
    let i = storedVisits.indexOf(Math.max(...storedVisits));
    orderedIDs[count] = placesToSort[i].id;
    count++;
    storedVisits.splice(i, 1);
    placesToSort.splice(i, 1);
  }

  orderPlaces(orderedIDs);
}

function orderPlaces(orderedIDs) {
  let orderedStrings = [];
  let count = 0;
  for (let k = 0; k < orderedIDs.length; k++) {
    for (let j = 0; j < placeStrs.length; j++) {
      if (storedIDs[j] == orderedIDs[k]) {
        orderedStrings[count] = placeStrs[j];
        count++;
        break;
      }
    }
  }

  let finalstr = orderedStrings[0];
  for (let j = 1; j < orderedStrings.length; j++) {
    finalstr = finalstr + orderedStrings[j];
  }
  placesList.innerHTML = finalstr;
}



let placesMapButtons = document.querySelectorAll('.places_list .fa-map');

[...placesMapButtons].forEach(elem => elem.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();
  codeGivenAddress(elem.getAttribute('value'));
  listButton.style.background = "#ff6624";
  gridButton.style.background = "#ffffff";
  placesList.style.display = "block";

  placesList.style.display = "inline-block";
  placesList.style.width = "33%";

  let map = document.getElementById("map");

  map.style.display = "block";
  map.style.position = "sticky";

  [...place_overviews].forEach(elem => {
    elem.style.width = "100%";
  })

}))
