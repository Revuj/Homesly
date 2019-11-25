'use strict'

let navbarToggle = document.getElementsByClassName('icon')[0];

navbarToggle.addEventListener('click', function () {
  let navbar = document.getElementById("navbar");
  if (navbar.className === "navbar") {
    navbar.className += " responsive";
  } else {
    navbar.className = "navbar";
  }
})

try {
  let signupButton = document.getElementById("signup_button");
  signupButton.addEventListener('click', function() {
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
catch(e) {
  //user is logged in
}

try {
let loginButton = document.getElementById("login_button");

loginButton.addEventListener('click', function() {
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
 catch(e) {
    //user is logged in
 }

