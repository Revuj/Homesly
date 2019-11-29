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

leftImageScroll.click();

