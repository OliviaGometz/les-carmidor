const body = document.getElementsByTagName('body')[0];
const container = document.getElementsByClassName('map')[0];
const map = container.getElementsByTagName('svg')[0];
const scaleElement = {};

['a', 'b', 'c'].forEach(letter => {
    scaleElement[letter] = document.getElementsByClassName('level-' + letter)[0];
});

const grabbingCss = 'js-grabbing';

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

    container.classList.remove(grabbingCss);
};

const mouseDownHandler = function(e) {
    container.classList.add(grabbingCss);

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

// Zoom

const minZoom = 1;
const maxZoom = 4.5;
let zoom = 1;

const scaleWidth = {
    a: 18,
    b: 10.8,
    c: 5.4
};

const mapZoom = function(z) {
    if (z < minZoom) {
        z = minZoom;
    } else if (z > maxZoom) {
        z = maxZoom;
    } else {
        z = Math.round(z * 100) / 100;
    }

    body.setAttribute('data-zoom', Math.round(z * 2) / 2);
    map.style.width = z * 100 + '%';

    for (const [key, value] of Object.entries(scaleWidth)) {
        scaleElement[key].style.width = (z * value) + 'vw';
    }
};

// Zoom with wheel

container.addEventListener('wheel', function(e) {
    if (!(e.ctrlKey || e.metaKey)) {
        return;
    }
    e.preventDefault();

    zoom += (e.deltaY < 0) ? 0.1 : -0.1;
    mapZoom(zoom);
    return;
});

// Zoom with pinch

// let start = {};

// // Calculate distance between two fingers
// const distance = (e) => {
//     return Math.hypot(
//         e.touches[0].pageX - e.touches[1].pageX,
//         e.touches[0].pageY - e.touches[1].pageY
//     );
// };

// container.addEventListener('touchstart', (e) => {
//     if (e.touches.length === 2) {
//         e.preventDefault(); // Prevent page scroll

//         // Calculate where the fingers have started on the X and Y axis
//         start.x = (e.touches[0].pageX + e.touches[1].pageX) / 2;
//         start.y = (e.touches[0].pageY + e.touches[1].pageY) / 2;
//         start.distance = distance(e);
//     }
// });

// container.addEventListener('touchmove', (e) => {
//     if (e.touches.length === 2) {
//         e.preventDefault(); // Prevent page scroll

//         // Safari provides e.scale as two fingers move on the screen
//         // For other browsers just calculate the scale manually

//         if (e.scale) {
//             zoom += e.scale;
//         } else {
//             const deltaDistance = distance(e);
//             zoom += deltaDistance / start.distance;
//         }

//         // Calculate how much the fingers have moved on the X and Y axis
//         const deltaX = (((e.touches[0].pageX + e.touches[1].pageX) / 2) - start.x); // x2 for accelarated movement
//         const deltaY = (((e.touches[0].pageY + e.touches[1].pageY) / 2) - start.y); // x2 for accelarated movement

//         // Transform the image to make it grow and move with fingers
//         // container.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
//         mapZoom(zoom);
//     }
// });
