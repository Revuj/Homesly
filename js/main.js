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

var observe;
if (window.attachEvent) {
    observe = function (element, event, handler) {
        element.attachEvent('on'+event, handler);
    };
}
else {
    observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}

//Makes automatic resizable text areas
function resizeTextArea (text) {
  function resize () {
      text.style.height = 'auto';
      text.style.height = text.scrollHeight+'px';
  }

  function delayedResize () {
      window.setTimeout(resize, 0);
  }
  observe(text, 'change',  resize);
  observe(text, 'cut',     delayedResize);
  observe(text, 'paste',   delayedResize);
  observe(text, 'drop',    delayedResize);
  observe(text, 'keydown', delayedResize);

  text.focus();
  text.select();
  resize();
}

let textAreaElems = document.querySelectorAll('textarea');
console.log(textAreaElems);
[...textAreaElems].forEach(elem => resizeTextArea(elem));



