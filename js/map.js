const container = document.getElementsByClassName('map')[0];
const map = container.getElementsByTagName('svg')[0];
const zoomRange = document.getElementById('map-zoom');
const scale = document.getElementById('echelle');

const zoomData = 'data-zoom';

// Moove with grab

let pos = { top: 0, left: 0, x: 0, y: 0 };

const mouseMoveHandler = function(e) {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    container.scrollLeft = pos.left - dx;
    container.scrollTop = pos.top - dy;
};

const mouseUpHandler = function() {
    container.removeEventListener('mousemove', mouseMoveHandler);
    container.removeEventListener('mouseup', mouseUpHandler);

    container.style.removeProperty('cursor');
};

const mouseDownHandler = function(e) {
    container.style.cursor = 'grabbing';

    pos = {
        // The current scroll 
        left: container.scrollLeft,
        top: container.scrollTop,
        // The current mouse position
        x: e.clientX,
        y: e.clientY,
    };

    container.addEventListener('mousemove', mouseMoveHandler);
    container.addEventListener('mouseup', mouseUpHandler);
};

container.addEventListener('mousedown', mouseDownHandler);

// Zoom with range

const rangeChangeHandler = function() {
    map.style.width = this.value + '%';

    if (this.value < 150) {
        container.setAttribute(zoomData, 1);
        scale.setAttribute(zoomData, 1);
        scale.style.width = (18.3 * this.value / 100) + 'vw';
    } else if (this.value < 200) {
        container.setAttribute(zoomData, 2);
        scale.setAttribute(zoomData, 2);
        scale.style.width = (11 * this.value / 100) + 'vw';
    } else {
        container.setAttribute(zoomData, 3);
        scale.setAttribute(zoomData, 3);
        scale.style.width = (5.5 * this.value / 100) + 'vw';
    }
};

zoomRange.addEventListener('input', rangeChangeHandler);
