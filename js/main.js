'use strict'

let navbarItems = document.querySelectorAll('#navbar > ul li');
let navbarToggle = document.getElementsByClassName('icon')[0];
navbarToggle.addEventListener('click', function() {
    [...navbarItems].forEach(function(elem) {
        if (elem.style.display == 'none' || elem.style.display == '') {
            elem.style.display = 'block';
        }
        else if (elem.style.display == 'block') {
            elem.style.display = 'none';
        }
    })
})

