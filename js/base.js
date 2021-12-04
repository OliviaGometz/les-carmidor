const activeCss = 'js-active';

const clickHandler = function() {
    this.classList.toggle(activeCss);
    
    document.querySelectorAll('[data-id="' + this.dataset.click + '"]').forEach((target) => {
        target.classList.toggle(activeCss);
    });
};

const closeHandler = function() {
    this.classList.toggle(activeCss);
    
    document.querySelectorAll('.' + activeCss).forEach((element) => {
        element.classList.remove(activeCss);
    });
};

document.querySelectorAll('[data-js="click"]').forEach((button) => {
    button.addEventListener('click', clickHandler);
});

document.querySelectorAll('[data-js="close"]').forEach((button) => {
    button.addEventListener('click', closeHandler);
});
