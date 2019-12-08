'use strict'

function encodeForAjax(data) {
  return Object.keys(data).map(function(k){
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&')
}


let navbarToggle = document.getElementsByClassName('hamburguerMenu')[0];

navbarToggle.addEventListener('click', function () {
  let navbar = document.getElementById("navbar");
  if (navbar.className === "navbar") {
    navbar.className += " responsive";
  } else {
    navbar.className = "navbar";
  }
})

let searchbarToggle = document.getElementsByClassName('searchMenu')[0];
console.log(searchbarToggle)
searchbarToggle.addEventListener('click', function () {
  console.log('oi')
  let searchForm = document.querySelector('.form-2');
  if (searchForm.className === "form-2") {
    searchForm.className += " responsive";
  } else {
    searchForm.className = "form-2";
  }
})

try {
  let signupButton = document.getElementById("signup_button");
  signupButton.addEventListener('click', function () {
    let signupForm = document.getElementById("signup");
    let loginForm = document.getElementById("login");

    if (signupForm.style.display === "block")
      signupForm.style.display = "none";
    else {
      signupForm.style.display = "block";
      loginForm.style.display = "none";
    }
  })
}
catch (e) {
  //user is logged in
}

try {
  let loginButton = document.getElementById("login_button");

  loginButton.addEventListener('click', function () {
    let loginForm = document.getElementById("login");
    let signupForm = document.getElementById("signup");

    if (loginForm.style.display === "block")
      loginForm.style.display = "none";
    else {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
    }
  })
}
catch (e) {
  //user is logged in
}

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
    console.log(e)
    console.log(e.style.display)
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

let userBio = document.getElementById('user_bio');
console.log(userBio);
console.log('gande cena')


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

