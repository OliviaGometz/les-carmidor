const activeCss = 'js-active';

// Open and close menu mobile

const body = document.querySelectorAll('body')[0];
const hamburger = document.querySelectorAll('nav button.hamburger')[0];
const menuOverlay = document.querySelectorAll('nav .overlay')[0];

const menuToggle = function() {
    body.classList.toggle(activeCss);
};

hamburger.addEventListener('click', menuToggle);
menuOverlay.addEventListener('click', menuToggle);

// Some other stuff for future map popins

// const clickHandler = function() {
//     this.classList.toggle(activeCss);
    
//     document.querySelectorAll('[data-id="' + this.dataset.click + '"]').forEach((target) => {
//         target.classList.toggle(activeCss);
//     });
// };

// const closeHandler = function() {
//     this.classList.toggle(activeCss);
    
//     document.querySelectorAll('.' + activeCss).forEach((element) => {
//         element.classList.remove(activeCss);
//     });
// };

// document.querySelectorAll('[data-js="click"]').forEach((button) => {
//     button.addEventListener('click', clickHandler);
// });

// document.querySelectorAll('[data-js="close"]').forEach((button) => {
//     button.addEventListener('click', closeHandler);
// });