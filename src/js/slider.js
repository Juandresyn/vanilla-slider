"use strict";

const activeClass = "active";
const btnNext = document.querySelector('.js-next');
const btnPrev = document.querySelector('.js-prev');
const slide = document.querySelectorAll('.js-slider .js-slider-item');
const i = 0;

// For Touch Support
const touchstartX = 0;
const touchstartY = 0;
const touchendX = 0;
const touchendY = 0;

const touchZone = document.querySelector('.js-slider');

touchZone.addEventListener('touchstart', function(event) {
  touchstartX = event.changedTouches[0].screenY;
  touchstartY = event.changedTouches[0].screenX;
}, false);

touchZone.addEventListener('touchend', function(event) {
  touchendX = event.changedTouches[0].screenY;
  touchendY = event.changedTouches[0].screenX;
  handleGesure();
}, false);

// Prevent fast Clicking
function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

function slideActions(ac) {
  slide[i].classList.remove(activeClass);

  if (ac === "next"){
    i--;
    if( i < 0) {
      i = slide.length - 1;
    }
  }else if (ac === "prev") {
    i++;
    if(i >= slide.length) {
      i = 0;
    }
  }

  slide[i].classList.add(activeClass);

  return false;
}

btnPrev.onclick = throttle(function() {
  slideActions("prev");
}, 500);

btnNext.onclick = throttle(function() {
  slideActions("next");
}, 500);

function handleGesure() {
  if (touchendX < touchstartX) {
    slideActions("prev");
  }
  if (touchendX > touchstartX) {
    slideActions("next");
  }

  return false;
}
