'use strict'

let leftImageScroll = document.getElementsByClassName('left_arrow_image')[0];
let rightImageScroll = document.getElementsByClassName('right_arrow_image')[0];
let imgIndex = 0;

function incrementImageIndex(index, length) {
  let newIndex;

  if (index > 0) {
    newIndex = index - 1
  }
  else if (imgIndex == 0) {
    newIndex = length - 1;
  }

  return newIndex;
}

function decrementImageIndex(index, length) {
  let newIndex;

  if (index < (length - 1)) {
    newIndex = index + 1;
  }
  if (index == (length - 1)) {
    newIndex = 0;
  }

  return newIndex;
}

leftImageScroll.addEventListener('click', function () {
  imgIndex = incrementImageIndex(imgIndex, imgs.length)

  let imageDisplayed = document.getElementsByClassName('full_width_image')[0];
  imageDisplayed.outerHTML = "<div class='full_width_image' style='background-image: url(" + imgs[imgIndex] + ");'></div>";

  let upSideImage = document.getElementsByClassName('side_image')[0];
  let downSideImage = document.getElementsByClassName('side_image')[1];

  let upSideImageIndex = incrementImageIndex(imgIndex, imgs.length);
  let downSideImageIndex = incrementImageIndex(upSideImageIndex, imgs.length);

  upSideImage.setAttribute("src", imgs[upSideImageIndex])
  downSideImage.setAttribute("src", imgs[downSideImageIndex])

})

rightImageScroll.addEventListener('click', function () {
  imgIndex = decrementImageIndex(imgIndex, imgs.length)

  let imageDisplayed = document.getElementsByClassName('full_width_image')[0];
  imageDisplayed.outerHTML = "<div class='full_width_image' style='background-image: url(" + imgs[imgIndex] + ");'></div>";

  let upSideImage = document.getElementsByClassName('side_image')[0];
  let downSideImage = document.getElementsByClassName('side_image')[1];

  let upSideImageIndex = decrementImageIndex(imgIndex, imgs.length);
  let downSideImageIndex = decrementImageIndex(upSideImageIndex, imgs.length);

  upSideImage.setAttribute("src", imgs[upSideImageIndex])
  downSideImage.setAttribute("src", imgs[downSideImageIndex])
})

let oldestButton = document.getElementsByClassName('oldest_button')[0];
let latestButton = document.getElementsByClassName('latest_button')[0];
let topKarmaButton = document.getElementsByClassName('top_karma_button')[0];
let bestRatingsButton = document.getElementsByClassName('best_ratings_button')[0];
let worstRatingsButton = document.getElementsByClassName('worst_ratings_button')[0];
let reviews = document.getElementsByClassName('place_review');
let moreReviewsButton = document.querySelector('.more_reviews');

oldestButton.addEventListener('click', function () {
  if (oldestButton.style.background == "rgb(255, 102, 36)")
    return;

  let request = new XMLHttpRequest();

  let detailValuePlace = document.getElementById('value_detail_place');
  let place_id = detailValuePlace.getAttribute('value');

  request.onload = orderReviewIDs;
  request.open("post", "../api/api_order_review_asc_date.php", true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({ place_id: place_id }));
  oldestButton.style.background = "#ff6624";
  latestButton.style.background = "#ffffff";
  topKarmaButton.style.background = "#ffffff";
  bestRatingsButton.style.background ="#ffffff";
  worstRatingsButton.style.background ="#ffffff";

  document.getElementById('selected_view').innerHTML = "<i class='fas fa-scroll'></i> Oldest"

})

latestButton.addEventListener('click', function () {
  if (latestButton.style.background == "rgb(255, 102, 36)")
    return;

  let request = new XMLHttpRequest();

  let detailValuePlace = document.getElementById('value_detail_place');
  let place_id = detailValuePlace.getAttribute('value');

  request.onload = orderReviewIDs;
  request.open("post", "../api/api_order_review_desc_date.php", true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({ place_id: place_id }));
  latestButton.style.background = "#ff6624";
  oldestButton.style.background = "#ffffff";
  topKarmaButton.style.background = "#ffffff";
  bestRatingsButton.style.background ="#ffffff";
  worstRatingsButton.style.background ="#ffffff";

  document.getElementById('selected_view').innerHTML = "<i class='fas fa-sun'></i> Latest"

})

topKarmaButton.addEventListener('click', function () {
  if (topKarmaButton.style.background == "rgb(255, 102, 36)")
    return;
  let request = new XMLHttpRequest();

  let detailValuePlace = document.getElementById('value_detail_place');
  let place_id = detailValuePlace.getAttribute('value');

  request.onload = getKarma;
  if (oldestButton.style.background == "rgb(255, 102, 36)")
    request.open("post", "../api/api_order_review_asc_date.php", true);
  else
    request.open("post", "../api/api_order_review_desc_date.php", true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({ place_id: place_id }));

  topKarmaButton.style.background = "#ff6624";
  latestButton.style.background = "#ffffff";
  oldestButton.style.background = "#ffffff";
  bestRatingsButton.style.background ="#ffffff";
  worstRatingsButton.style.background ="#ffffff";

  document.getElementById('selected_view').innerHTML = "<i class='fas fa-burn'></i> Top"

})

bestRatingsButton.addEventListener('click', function () {
  if (bestRatingsButton.style.background == "rgb(255, 102, 36)")
    return;
  let request = new XMLHttpRequest();

  let detailValuePlace = document.getElementById('value_detail_place');
  let place_id = detailValuePlace.getAttribute('value');

  request.onload = orderReviewIDs;
  request.open("post", "../api/api_order_review_best_rating.php", true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({ place_id: place_id }));
  bestRatingsButton.style.background = "#ff6624";
  latestButton.style.background = "#ffffff";
  oldestButton.style.background = "#ffffff";
  topKarmaButton.style.background ="#ffffff";
  worstRatingsButton.style.background ="#ffffff";

  document.getElementById('selected_view').innerHTML = "<i class='far fa-smile-beam'></i> Best Ratings"

})

worstRatingsButton.addEventListener('click', function () {
  if (worstRatingsButton.style.background == "rgb(255, 102, 36)")
    return;
  let request = new XMLHttpRequest();

  let detailValuePlace = document.getElementById('value_detail_place');
  let place_id = detailValuePlace.getAttribute('value');

  request.onload = orderReviewIDs;
  request.open("post", "../api/api_order_review_worst_rating.php", true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({ place_id: place_id }));
  worstRatingsButton.style.background = "#ff6624";
  latestButton.style.background = "#ffffff";
  oldestButton.style.background = "#ffffff";
  topKarmaButton.style.background ="#ffffff";
  bestRatingsButton.style.background ="#ffffff";

  document.getElementById('selected_view').innerHTML = "<i class='far fa-sad-tear'></i> Worst Ratings"

})

let firstResponse;

function getKarma() {
  firstResponse = JSON.parse(this.responseText);
  if (firstResponse.length == 0 || firstResponse.length == 1)
    return;
  let review_ids = [];
  for (let j = 0; j < firstResponse.length; j++) {
    review_ids[j] = firstResponse[j].id;
  }
  review_ids = JSON.stringify(review_ids);
  let request = new XMLHttpRequest();

  request.onload = orderReviewIDsByKarma;
  request.open("post", "../api/api_get_reviews_karma.php", true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({ review_ids: review_ids }));
}

function orderReviewIDs() {
  let response = JSON.parse(this.responseText);
  if (response.length == 0 || response.length == 1)
    return;
  let orderedIDs = [];
  for (let j = 0; j < response.length; j++) {
    orderedIDs[j] = response[j].id;
  }
  orderReviews(orderedIDs);
}

function orderReviewIDsByKarma() {
  let response = JSON.parse(this.responseText);
  let orderedIDs = [];
  let count = 0;
  while (response.length) {
    let i = response.indexOf(Math.max(...response));
    orderedIDs[count] = firstResponse[i].id;
    count++;
    response.splice(i, 1);
    firstResponse.splice(i, 1);
  }
  orderReviews(orderedIDs);
}

function orderReviews(orderedIDs) {
  let reviews = document.getElementsByClassName('place_reviews')[0];
  let str = reviews.innerHTML;
  let strs = [];
  let i = 0;
  let startIndex;
  let midIndex;
  let endIndex;
  let tempstr;
  while (true) {
    startIndex = str.indexOf("<div class=\"place_review\"");
    midIndex = str.indexOf(">");
    if (startIndex == -1)
      break;
    tempstr = str.substring(midIndex);
    endIndex = tempstr.indexOf("<div class=\"place_review\"");
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
  let orderedStrings = [];
  let count = 0;
  for (let k = 0; k < orderedIDs.length; k++) {
    for (let j = 0; j < strs.length; j++) {
      startIndex = strs[j].indexOf("\"id\">");
      tempstr = strs[j].substring(startIndex);
      endIndex = tempstr.indexOf("<");
      tempstr = strs[j].substring(startIndex + 5, startIndex + endIndex);
      if (tempstr == orderedIDs[k]) {
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
  reviews.innerHTML = finalstr;
  showLessReviews();
}

let guestsNumber = document.querySelector('input[name="guests"]');
let placePrice = Number(document.getElementsByClassName('place_price')[0].innerHTML);
let calculatedPrice = document.getElementById('calculated_price');

guestsNumber.addEventListener('change', (event) => {
  calculatedPrice.innerHTML = 'Total: ' + placePrice * Number(guestsNumber.value) + '€';
})


let reviewForm = document.getElementsByClassName('input_review')[0];
reviewForm.addEventListener('submit', submitReview);

function receiveReviews() {
  console.log(this.responseText)

  let response = JSON.parse(this.responseText);
  let review_id = response[0];
  console.log(review_id);
  let username = response[1];
  let date = response[2];
  let text = response[3];
  let newRating = response[4];
  let review = document.createElement('div');
  review.className = 'place_review';
  review.innerHTML =
    '<span class="id">' + review_id + '</span> <h3>' + username + '</h3>' + '<img src="../images/profile_icon.png" />' + '<h4>' + date + '</h4>' + '<button class="edit_review"><i class="fas fa-edit"></i></button>' + '<button class="save_review"><i class="far fa-save"></i></button>' + '<div><div class="rating edit_rating"><input type="radio" id="5" name="rating" value="5" /><label class = "full" for="5" title="Awesome - 5 stars"></label><input type="radio" id="45" name="rating" value="4.5" /><label class="half" for="45" title="Pretty good - 4.5 stars"></label><input type="radio" id="4" name="rating" value="4" /><label class = "full" for="4" title="Pretty good - 4 stars"></label><input type="radio" id="35" name="rating" value="3.5" /><label class="half" for="35" title="Meh - 3.5 stars"></label><input type="radio" id="3" name="rating" value="3" /><label class = "full" for="3" title="Meh - 3 stars"></label><input type="radio" id="25" name="rating" value="2.5" /><label class="half" for="25" title="Kinda bad - 2.5 stars"></label><input type="radio" id="2" name="rating" value="2" /><label class = "full" for="2" title="Kinda bad - 2 stars"></label><input type="radio" id="15" name="rating" value="1.5" /><label class="half" for="15" title="Meh - 1.5 stars"></label><input type="radio" id="1" name="rating" value="1" /><label class = "full" for="1" title="Sucks big time - 1 star"></label><input type="radio" id="05" name="rating" value="0.5" /><label class="half" for="05" title="Sucks big time - 0.5 stars"></label></div></div>';

  let wholeStars = Math.floor(newRating);
  let halfStars = newRating - wholeStars;
  let counter = 0;
  let ratingHTML = '<div class="rating review_rating">';
  while (counter < wholeStars) {
    ratingHTML = ratingHTML.concat('<i class="fas fa-star"></i> ')
    counter++;
  }
  if (halfStars != 0) {
    ratingHTML = ratingHTML.concat('<i class="fas fa-star-half-alt"></i> ')
    counter++;
  }
  while (counter < 5) {
    ratingHTML = ratingHTML.concat('<i class="far fa-star"></i> ')
    counter++;
  }
  ratingHTML = ratingHTML.concat('</div> <p class="review_content" contentEditable=false>' + escapeHtml(text) + '</p>      <div class="votes"> </p>  <input type="hidden" value=' + username + ' /> <i class="fas fa-chevron-up upvote" value=' + review_id + ' style="color:#ff6624;"></i><div>1</div><i value=' + review_id + ' class="fas fa-chevron-down downvote"></i></div>')

  review.innerHTML = review.innerHTML.concat(ratingHTML);

  let latestReview = document.getElementsByClassName('place_review')[0];
  let reviews = document.querySelector('.place_reviews');
  reviews.insertBefore(review, latestReview);
  let textarea = document.querySelector('.input_review > textarea');
  textarea.value = "";

  console.log(newRating);
  review.scrollIntoView();

  let editReviewButton = document.querySelector('.edit_review');
  let saveReviewButton = document.querySelector('.save_review');

  editReviewButton.addEventListener('click', editReview)
  saveReviewButton.addEventListener('click', saveReview)

  let upvoteArrow = document.querySelector('.upvote');
  let downvoteArrow = document.querySelector('.downvote');

  upvoteArrow.addEventListener('click', event => { upvote(upvoteArrow) })
  downvoteArrow.addEventListener('click', event => { downvote(downvoteArrow) })

}

function submitReview(event) {
  event.preventDefault();
  let place_id = document.querySelector('.input_review > input[name=place_id]').value;
  let username = document.querySelector('.input_review > input[name=username]').value;
  let text = document.querySelector('.input_review > textarea').value;
  let rating = document.querySelector('.input_review .rating input:checked').value;
  let request = new XMLHttpRequest()
  request.onload = receiveReviews;
  request.open("post", "../api/api_add_review.php", true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({ place_id: place_id, username: username, text: text, rating: rating }));
}

function showLessReviews() {
  let reviews = document.getElementsByClassName('place_review');
  for (let i = 0; i < reviews.length; i++) {
    reviews[i].style.display = "block";
    if (i == 5)
      break;
  }
  for (let i = 5; i < reviews.length; i++)
    reviews[i].style.display = "none";
  moreReviewsButton.removeEventListener('click', showLessReviews);
  moreReviewsButton.addEventListener('click', showMoreReviews);
  moreReviewsButton.innerHTML = "Show More...";

}

function showMoreReviews() {
  let reviews = document.getElementsByClassName('place_review');
  let invisibleReviews = [...reviews].filter(r => r.offsetParent === null);
  for (let i = 0; i < 5 && i < invisibleReviews.length; i++)
    invisibleReviews[i].style.display = "block";

  if (invisibleReviews.length <= 4) {
    moreReviewsButton.innerHTML = "Show Less...";
    moreReviewsButton.removeEventListener('click', showMoreReviews);
    moreReviewsButton.addEventListener('click', showLessReviews);
  }

}

moreReviewsButton.addEventListener('click', showMoreReviews);

let editReviewButton = document.querySelector('.edit_review');
let saveReviewButton = document.querySelector('.save_review');
let editRating = document.querySelector('.edit_rating');
let oldRating = document.querySelector('.review_rating');

function updateReview() {
  let response = JSON.parse(this.responseText);
  let newContent = response[1];
  let newRating = response[2];
  let reviewContent = document.querySelector('.save_review ~ p');
  let oldRating = document.querySelector('.review_rating');

  reviewContent.innerHTML = newContent;

  let wholeStars = Math.floor(newRating);
  let halfStars = newRating - wholeStars;
  let counter = 0;
  let ratingHTML = "";
  while (counter < wholeStars) {
    ratingHTML = ratingHTML.concat('<i class="fas fa-star"></i> ')
    counter++;
  }
  if (halfStars != 0) {
    ratingHTML = ratingHTML.concat('<i class="fas fa-star-half-alt"></i> ')
    counter++;
  }
  while (counter < 5) {
    ratingHTML = ratingHTML.concat('<i class="far fa-star"></i> ')
    counter++;
  }

  oldRating.innerHTML = ratingHTML;
}


function editReview() {
  let editReviewButton = document.querySelector('.edit_review');
  let saveReviewButton = document.querySelector('.save_review');
  let editRating = document.querySelector('.edit_rating');
  let oldRating = document.querySelector('.review_rating');

  console.log(oldRating)

  editReviewButton.style.display = "none";
  oldRating.style.display = "none";
  saveReviewButton.style.display = "inline-block";
  editRating.style.display = "block";
  saveReviewButton.style.bottom = "20px";
  let reviewContent = document.querySelector('.save_review ~ p');
  reviewContent.style.marginTop = "3rem";

  if (reviewContent.contentEditable == "false") {
    reviewContent.contentEditable = "true";
    reviewContent.focus = "true";
    reviewContent.style.padding = "0.5em";
    reviewContent.style.border = "1.5px solid gray";
    reviewContent.parentElement.style.opacity = "1";
    saveReviewButton.style.display = "block";
  }
}

function saveReview() {
  let editReviewButton = document.querySelector('.edit_review');
  let saveReviewButton = document.querySelector('.save_review');
  let editRating = document.querySelector('.edit_rating');
  let oldRating = document.querySelector('.review_rating');

  let review = document.querySelector('.save_review ~ p');
  let reviewContent = review.innerHTML;
  let review_id = document.querySelector('.place_review .id').innerHTML;
  let rating = document.querySelector('.edit_rating:first-of-type input:checked').value;
  let request = new XMLHttpRequest()
  request.onload = updateReview;
  request.open("post", "../api/api_update_review.php", true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({ review_id: review_id, review_content: reviewContent, rating: rating }));

  review.style.marginTop = "16px";
  saveReviewButton.style.display = "none";
  editRating.style.display = "none";
  oldRating.style.display = "inline-block";
  editReviewButton.style.display = "inline-block";
  review.contentEditable = "false";
  review.focus = "false";
  review.style.padding = "0";
  review.style.border = "0";
}

if (editReviewButton != null)
  editReviewButton.addEventListener('click', editReview)

if (saveReviewButton != null)
  saveReviewButton.addEventListener('click', saveReview)


let editPlaceButton = document.getElementById('edit_place');
let detailTitlePlace = document.getElementById('title_detail_place');
let detailLocationPlace = document.getElementById('location_detail_place');
let detailDescriptionPlace = document.getElementById('description_detail_place');
let detailValuePlace = document.getElementById('value_detail_place');

if (editPlaceButton != null) {
  editPlaceButton.addEventListener('click', (event) => {
    if (detailTitlePlace.contentEditable == "false") {

      editPlaceButton.innerHTML = ' <i class="far fa-edit"></i> Save Changes';

      detailTitlePlace.contentEditable = "true";
      detailLocationPlace.contentEditable = "true";
      detailDescriptionPlace.contentEditable = "true";

      // userBio.focus = "true";
      detailTitlePlace.style.padding = "0.5em";
      detailTitlePlace.style.border = "2px solid gray";
      detailTitlePlace.style.borderRadius = "5px";
      detailTitlePlace.style.display = "block";
      // userBio.parentElement.style.opacity = "1";
      detailLocationPlace.style.padding = "0.5em";
      detailLocationPlace.style.border = "2px solid gray";
      detailLocationPlace.style.borderRadius = "5px";
      detailLocationPlace.style.display = "block";

      detailDescriptionPlace.style.padding = "0.5em";
      detailDescriptionPlace.style.border = "2px solid gray";
      detailDescriptionPlace.style.borderRadius = "5px";
      detailDescriptionPlace.style.display = "block";

    } else {

      editPlaceButton.innerHTML = '<i class="far fa-edit"></i> Edit Place';

      let place_id = detailValuePlace.getAttribute('value');

      let request = new XMLHttpRequest()
      request.onload = updatePlace;
      request.open("post", "../api/api_update_place.php", true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

      console.log("place: " + place_id);

      request.send(encodeForAjax({
        place_id: place_id,
        title: detailTitlePlace.innerHTML,
        location: detailLocationPlace.innerHTML,
        description: detailDescriptionPlace.innerHTML
      }));


      detailTitlePlace.contentEditable = "false";

      detailLocationPlace.contentEditable = "false";
      detailDescriptionPlace.contentEditable = "false";

      detailTitlePlace.style.padding = "0em";
      detailTitlePlace.style.border = "0px solid gray";
      detailTitlePlace.style.borderRadius = "0px";

      detailLocationPlace.style.padding = "0em";
      detailLocationPlace.style.border = "0px solid gray";
      detailLocationPlace.style.borderRadius = "0px";

      detailDescriptionPlace.style.padding = "0em";
      detailDescriptionPlace.style.border = "0px solid gray";
      detailDescriptionPlace.style.borderRadius = "0px";
    }
  })
}


function updatePlace() {
  console.log(this.responseText)
  let response = JSON.parse(this.responseText);
  let place_id = response[0];
  let title = response[1];
  let location = response[2];
  let description = response[3];

  detailTitlePlace.innerHTML = title;
  detailLocationPlace.innerHTML = location;
  detailDescriptionPlace.innerHTML = description;

  initializeMapDetail();
}

var geocoder;
var map;
var marker;

function initializeMapHost() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
}

function initializeMapDetail() {

  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(-34.397, 150.644);
  var mapOptions = {
    zoom: 8,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var address = document.getElementById('location_detail_place').innerHTML;


  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      if (marker != null)
        marker.setMap(null);
      marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else if (status == 'ZERO_RESULTS') {
      alert('Couldn\'t find place refering to specified location');
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function codeAddress() {
  var address = document.getElementById('address').value;
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      if (marker != null)
        marker.setMap(null);
      marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else if (status == 'ZERO_RESULTS') {
      alert('Couldn\'t find place refering to specified location');
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}


function teste() {
  console.log(this.responseText)
}

let upvoteButtons = document.getElementsByClassName('upvote');
let downvoteButtons = document.getElementsByClassName('downvote');

function upvote(elem) {
  if (elem.style.color == "rgb(255, 102, 36)") {
    let username = elem.previousElementSibling.value;
    let review_id = elem.getAttribute("value")
    let request = new XMLHttpRequest()

    let karma = elem.nextElementSibling;
    karma.innerHTML = parseInt(karma.innerHTML) - 1;

    request.onload = teste;
    request.open("post", "../api/api_remove_upvote.php", true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({ username: username, review_id: review_id }));
    elem.style.color = "black"

    return;
  }
  elem.style.color = "#ff6624";
  let karma = elem.nextElementSibling;
  let downvote = karma.nextElementSibling
  if (downvote.style.color == "rgb(255, 102, 36)")
    karma.innerHTML = parseInt(karma.innerHTML) + 2;
  else
    karma.innerHTML = parseInt(karma.innerHTML) + 1;

  downvote.style.color = "black";

  let username = elem.previousElementSibling.value
  let review_id = elem.getAttribute("value")
  let request = new XMLHttpRequest()
  console.log(username)
  console.log(review_id)
  request.onload = teste;
  request.open("post", "../api/api_upvote_review.php", true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({ username: username, review_id: review_id }));
}

function downvote(elem) {
  if (elem.style.color == "rgb(255, 102, 36)") {
    let username = elem.previousElementSibling.previousElementSibling.previousElementSibling.value;
    let review_id = elem.getAttribute("value")
    let request = new XMLHttpRequest()

    let karma = elem.previousElementSibling;
    karma.innerHTML = parseInt(karma.innerHTML) + 1;

    request.onload = teste;
    request.open("post", "../api/api_remove_downvote.php", true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(encodeForAjax({ username: username, review_id: review_id }));
    elem.style.color = "black"

    return;
  }
  elem.style.color = "#ff6624";
  let karma = elem.previousElementSibling;
  let upvote = karma.previousElementSibling;
  if (upvote.style.color == "rgb(255, 102, 36)")
    karma.innerHTML = parseInt(karma.innerHTML) - 2;
  else
    karma.innerHTML = parseInt(karma.innerHTML) - 1;

  upvote.style.color = "black";

  let username = elem.previousElementSibling.previousElementSibling.previousElementSibling.value;
  let review_id = elem.getAttribute("value")
  let request = new XMLHttpRequest()
  request.onload = teste;
  request.open("post", "../api/api_downvote_review.php", true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({ username: username, review_id: review_id }));
}

[...upvoteButtons].forEach(elem => elem.addEventListener('click', (event) => {
  upvote(elem);
}));

[...downvoteButtons].forEach(elem => elem.addEventListener('click', (event) => {
  downvote(elem);
}));

function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}
