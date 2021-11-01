const menuContainer = document.getElementsByTagName('nav')[0];
const activeCss = 'js-active';

const clickHandler = function() {
    this.classList.toggle(activeCss);
    
    document.querySelectorAll('[data-id="' + this.dataset.click + '"]').forEach((target) => {
        target.classList.toggle(activeCss);
    });
};

document.querySelectorAll('[data-js="click"]').forEach((button) => {
    button.addEventListener('click', clickHandler);
});

// Swipe top to close mobile menu

const touch = {
    start: 0,
    end: 0
};

if (menuContainer) {
    menuContainer.addEventListener('touchstart', function(e) {
        touch.start = e.changedTouches[0].screenY;
    }, false);

    menuContainer.addEventListener('touchend', function(e) {
        touch.end = e.changedTouches[0].screenY;
        handleGesture();
    }, false);

    const handleGesture = function() {
        if (touch.end < touch.start) {
            menuContainer.querySelector('[data-click="menu"]').classList.remove(activeCss);
            menuContainer.querySelector('[data-id="menu"]').classList.remove(activeCss);
        }
    }
}
