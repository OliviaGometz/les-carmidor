const activeCss = 'js-active';

const clickHandler = function() {
    this.classList.toggle(activeCss);
    
    document.querySelectorAll('[data-id="' + this.dataset.click + '"').forEach((target) => {
        target.classList.toggle(activeCss);
    });
};

document.querySelectorAll('[data-js="click"').forEach((button) => {
    button.addEventListener('click', clickHandler);
});
