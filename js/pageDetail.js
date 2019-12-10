'use strict'

let leftImageScroll = document.getElementsByClassName('left_arrow_image')[0];
let rightImageScroll = document.getElementsByClassName('right_arrow_image')[0];
let imgIndex = 0;

leftImageScroll.addEventListener('click', function () {
  if (imgIndex > 0) {
    imgIndex--;
  }
  if (imgIndex == 0) {
    leftImageScroll.style.display = "none";
  }
  if (imgIndex < (imgs.length - 1)) {
    rightImageScroll.style.display = "block";
  }
  let imageDisplayed = document.getElementsByClassName('full_width_image')[0];
  imageDisplayed.outerHTML = "<div class='full_width_image' style='background-image: url(" + imgs[imgIndex] + ");'></div>";
})

rightImageScroll.addEventListener('click', function () {
  if (imgIndex < (imgs.length - 1)) {
    imgIndex++;
  }
  if (imgIndex == (imgs.length - 1)) {
    rightImageScroll.style.display = "none";
  }
  if (imgIndex > 0) {
    leftImageScroll.style.display = "block";
  }
  let imageDisplayed = document.getElementsByClassName('full_width_image')[0];
  imageDisplayed.outerHTML = "<div class='full_width_image' style='background-image: url(" + imgs[imgIndex] + ");'></div>";
})

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
  while(counter < wholeStars){
    ratingHTML =  ratingHTML.concat('<i class="fas fa-star"></i> ')
    counter++;
  }
  if (halfStars != 0) {
    ratingHTML = ratingHTML.concat('<i class="fas fa-star-half-alt"></i> ')
    counter++;
  }
  while(counter < 5) {
    ratingHTML = ratingHTML.concat('<i class="far fa-star"></i> ')
    counter++;
  }
  ratingHTML = ratingHTML.concat('</div> <p class="review_content" contentEditable=false>' + text + '</p>      <div class="votes"><i class="fas fa-chevron-up"></i><p>20</p><i class="fas fa-chevron-down"></i></div>')

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
  request.send(encodeForAjax({place_id: place_id, username: username, text: text, rating: rating}));
}

let moreReviewsButton = document.querySelector('.more_reviews');
let reviews = document.getElementsByClassName('place_review');

function showLessReviews() {
  for(let i = 5; i < reviews.length - 1; i++)
    reviews[i].style.display = "none";
  moreReviewsButton.removeEventListener('click', showLessReviews);
  moreReviewsButton.addEventListener('click', showMoreReviews);
  moreReviewsButton.innerHTML = "Show More...";
  
}

function showMoreReviews() {
  let invisibleReviews = [...reviews].filter(r => r.offsetParent === null);
  for(let i = 0; i < 5 && i < invisibleReviews.length - 1; i++)
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
  while(counter < wholeStars){
    ratingHTML =  ratingHTML.concat('<i class="fas fa-star"></i> ')
    counter++;
  }
  if (halfStars != 0) {
    ratingHTML = ratingHTML.concat('<i class="fas fa-star-half-alt"></i> ')
    counter++;
  }
  while(counter < 5) {
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
  request.send(encodeForAjax({review_id: review_id, review_content: reviewContent, rating: rating}));

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

    request.send(encodeForAjax({place_id: place_id, 
      title: detailTitlePlace.innerHTML , 
      location: detailLocationPlace.innerHTML, 
      description: detailDescriptionPlace.innerHTML}));


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
}




