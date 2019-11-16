'use strict'


let navbarToggle = document.getElementsByClassName('icon')[0];
navbarToggle.addEventListener('click', function() {
    let navbar = document.getElementById("navbar");
    console.log(navbar)
    if (navbar.className === "navbar") {
        navbar.className += " responsive";
      } else {
        navbar.className = "navbar";
      }
})

