'use strict'

let profileNavItems = document.querySelectorAll('#user_info ul li');
let profileContent = document.querySelectorAll('#user_info section');
profileContent[0].style.display="block" //reservations start visible

profileNavItems.forEach(item => item.addEventListener('click', (event) => {
  Array.prototype.map.call(profileNavItems, function (e) {
    if (e.className == 'active')
      e.className = "";
  })
  event.target.classList.add('active');  

  Array.prototype.map.call(profileContent, function (e) {
    if (e.style.display == "block")
      e.style.display = "none";
  })

  let contentID;
  switch (event.target.innerHTML) {
    case 'Reservations':
      contentID = 'user_reservations'
      break;
    case 'Your Places':
      contentID = 'user_places'
      break;
    case 'Reviews':
      contentID = 'user_reviews'
      break;
  }
  document.getElementById(contentID).style.display = "block"
}))


function updateDescription() {
  console.log(this.responseText)
  let response = JSON.parse(this.responseText);
  let username = response[0];
  let bio = response[1];
  let userBio = document.getElementById('user_bio');
  userBio.innerHTML = bio;
}

function removeReservation() {
  console.log(this.responseText);
}

function removePlace(){
  console.log(this.responseText);
}

let userBio = document.getElementById('user_bio');
let editProfileButton = document.getElementById('edit_profile');
let saveProfileButton = document.getElementById('save_profile');

let editableItems = document.querySelectorAll('#user_details li + li');

editProfileButton.addEventListener('click', (event) => {
  if (userBio.contentEditable == "false") {
    userBio.contentEditable = "true";
    userBio.focus = "true";
    userBio.style.padding = "0.5em";
    userBio.style.border = "2px solid gray";
    userBio.style.borderRadius = "5px";
    userBio.parentElement.style.opacity = "1";
    saveProfileButton.style.display = "block";

    [...editableItems].forEach(elem => elem.contentEditable = "true");
  }
})

saveProfileButton.addEventListener('click', (event) => {
  let bio = document.getElementById('user_bio').innerHTML;
  let username = document.getElementById('profile_image').alt;
  let request = new XMLHttpRequest()
  request.onload = updateDescription;
  request.open("post", "../api/api_update_description.php", true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(encodeForAjax({username: username, bio: bio}));


  saveProfileButton.style.display = "none";
  userBio.contentEditable = "false";
  userBio.focus = "false";
  userBio.style.padding = "0";
  userBio.style.border = "0";
  userBio.style.borderRadius = "0";
  userBio.parentElement.style.opacity = "0.5";
  [...editableItems].forEach(elem => elem.contentEditable = "false");

})


let checkinDates = document.querySelectorAll('time.checkin');

[...checkinDates].forEach(elem => elem.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();
  elem.style.display = "none";
  let checkout = elem.nextElementSibling;
  checkout.style.display = "block";
}))

let checkoutDates = document.querySelectorAll('time.checkout');

[...checkoutDates].forEach(elem => elem.addEventListener('click', (event) => {
  event.stopPropagation();
  event.preventDefault();
  elem.style.display = "none";
  let checkin = elem.previousElementSibling;
  checkin.style.display = "block";
}))


let removeModal = document.getElementById('remove_modal');
let buttons = document.querySelectorAll('#remove_modal button');


let reservationsDeleteButtons = document.querySelectorAll('#user_reservations .fa-trash');

[...reservationsDeleteButtons].forEach(elem => elem.addEventListener('click', (event) => {
    removeModal.style.display = "block";
    buttons[0].addEventListener('click', (event) => {

      let reservation_id = elem.getAttribute('value');
      let request = new XMLHttpRequest()
      request.onload = removeReservation;
      request.open("post", "../api/api_remove_reservation.php", true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.send(encodeForAjax({reservation_id: reservation_id}));

      elem.parentElement.style.display = "none";
      removeModal.style.display = "none";

    })
    
    buttons[1].addEventListener('click', (event) => {
        removeModal.style.display = "none";
    })
}))


let placesDeleteButtons = document.querySelectorAll('#user_places .fa-trash');

[...placesDeleteButtons].forEach(elem => elem.addEventListener('click', (event) => {
    removeModal.style.display = "block";
    buttons[0].addEventListener('click', (event) => {

      let place_id = elem.getAttribute('value');
      let request = new XMLHttpRequest()
      request.onload = removePlace;
      request.open("post", "../api/api_remove_place.php", true);
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      request.send(encodeForAjax({place_id: place_id}));

      elem.parentElement.style.display = "none";
      removeModal.style.display = "none";
      
    })
    
    buttons[1].addEventListener('click', (event) => {
        removeModal.style.display = "none";
    })
}))