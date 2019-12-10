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
  let response = JSON.parse(this.responseText);
  let place_id = response[0];
  let username = response[1];
  let date = response[2];
  let text = response[3];
  let review = document.createElement('div');
  review.className = 'place_review';
  review.innerHTML = 
  '<h3>' + username + '</h3>' + '<img src="../images/profile_icon.png" />' + '<h4>' + date + '</h4>' + '<div class="rating"><i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star"></i> <i class="fas fa-star-half-alt"></i></div><p>' + text + '</p>      <div class="votes"><i class="fas fa-chevron-up"></i><p>20</p><i class="fas fa-chevron-down"></i></div>'
  let latestReview = document.getElementsByClassName('place_review')[0];
  let reviews = document.querySelector('.place_reviews');
  reviews.insertBefore(review, latestReview);
  let textarea = document.querySelector('.input_review > textarea');
  textarea.value = "";
  review.scrollIntoView();
}

function submitReview(event) {
  event.preventDefault();
  let place_id = document.querySelector('.input_review > input[name=place_id]').value;
  let username = document.querySelector('.input_review > input[name=username]').value;
  let text = document.querySelector('.input_review > textarea').value;
  let rating = document.querySelector('.rating input:checked').value;
  console.log(rating);
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




