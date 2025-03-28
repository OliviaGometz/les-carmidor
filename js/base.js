const activeCss = 'js-active';

// Open and close menu mobile

const body = document.querySelectorAll('body')[0];
const hamburger = document.querySelectorAll('nav button.hamburger')[0];
const menuOverlay = document.querySelectorAll('nav .overlay')[0];

const menuToggle = function() {
    body.classList.toggle(activeCss);
};

if (hamburger) {
    hamburger.addEventListener('click', menuToggle);
}

if (menuOverlay) {
    menuOverlay.addEventListener('click', menuToggle);
}
