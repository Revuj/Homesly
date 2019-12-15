'use strict'

let listButton = document.getElementsByClassName('fas fa-list')[0];
let gridButton = document.getElementsByClassName('fas fa-th')[0];
let placesList = document.getElementsByClassName('places_list')[0];
let noSortingButton = document.getElementsByClassName('no_sorting_button')[0];
let bestRatingButton = document.getElementsByClassName('best_rating_button')[0];
let mostVisitedButton = document.getElementsByClassName('most_visited_button')[0];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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

let ratingCount = 0;
let storedRatings = [];

bestRatingButton.addEventListener('click', function () {
  if (bestRatingButton.style.background == "rgb(255, 102, 36)")
    return;

  orderPlaces();

  bestRatingButton.style.background = "#ff6624";
  mostVisitedButton.style.background = "#ffffff";
  noSortingButton.style.display = "none";

  document.getElementById('selected_option').innerHTML = "<i class='fas fa-smile-beam'></i> Best Rating"
})

async function orderPlaces() {
  let places = document.getElementsByClassName('places_list')[0];
  let str = places.innerHTML;
  let strs = [];
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
    strs[i] = tempstr;
    i++;
    if (endIndex == -1)
      break;
  }
  if (strs.length == 0)
    return;

  let orderedStrings = [];
  let storedIDs = [];

  for (let j = 0; j < strs.length; j++) {
    startIndex = strs[j].indexOf("value=\"");
    tempstr = strs[j].substring(startIndex + 7);
    endIndex = tempstr.indexOf("\"") + 7;
    tempstr = strs[j].substring(startIndex + 7, startIndex + endIndex);
    storedIDs[j] = tempstr;
    let request = new XMLHttpRequest();
    request.onload = storeRating;
    request.open("post", "../api/api_get_place_rating.php", true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({ place_id: tempstr }));
    let exit = 0;
    while (j != (ratingCount - 1)) {
      await sleep(50);
      exit++;
      if (exit == 10)
        return;
    }
  }

  let count = 0;
  let orderedIDs = [];
  let tempIDs = [];
  for (let j = 0; j < storedIDs.length; j++) {
    tempIDs[j] = storedIDs[j];
  }
  
  while (storedRatings.length) {
    let i = storedRatings.indexOf(Math.max(...storedRatings));
    orderedIDs[count] = tempIDs[i];
    count++;
    storedRatings.splice(i, 1);
    tempIDs.splice(i, 1);
  }

  count = 0;
  for (let k = 0; k < orderedIDs.length; k++) {
    for (let j = 0; j < strs.length; j++) {
      if (storedIDs[j] == orderedIDs[k]) {
        orderedStrings[count] = strs[j];
        count++;
        break;
      }
    }
  }

  let finalstr = orderedStrings[0];
  for (let j = 1; j < orderedStrings.length; j++) {
    finalstr = finalstr + orderedStrings[j];
  }
  places.innerHTML = finalstr;
}

function storeRating() {
  let response = JSON.parse(this.responseText);
  if (response == null)
    storedRatings[ratingCount] = 0.0;
  else
    storedRatings[ratingCount] = parseFloat(response);
  ratingCount++;
}

mostVisitedButton.addEventListener('click', function () {
  if (mostVisitedButton.style.background == "rgb(255, 102, 36)")
    return;

  /*
  let request = new XMLHttpRequest();

  let detailValuePlace = document.getElementById('value_detail_place');
  let place_id = detailValuePlace.getAttribute('value');

  request.onload = orderReviewIDs;
  request.open("post", "../api/api_order_review_desc_date.php", true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({ place_id: place_id }));
  */

  mostVisitedButton.style.background = "#ff6624";
  bestRatingButton.style.background = "#ffffff";
  noSortingButton.style.display = "none";

  document.getElementById('selected_option').innerHTML = "<i class='fas fa-burn'></i> Most Visited"
})