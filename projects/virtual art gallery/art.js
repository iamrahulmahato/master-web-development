let scale = 1;
let posX = 0;
let posY = 0;
let isDragging = false;
let startX, startY;

const artwork = document.getElementById('artwork');

function zoom(event) {
    event.preventDefault();
    const zoomFactor = 0.1;
    const direction = event.deltaY < 0 ? 1 : -1;
    scale += direction * zoomFactor;
    scale = Math.min(Math.max(1, scale), 4);
    updateTransform();
}

function updateTransform() {
    artwork.style.transform = `scale(${scale}) translate(${posX}px, ${posY}px)`;
}

function startDrag(event) {
    isDragging = true;
    startX = event.clientX - posX;
    startY = event.clientY - posY;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    artwork.style.cursor = 'grabbing';
}

function drag(event) {
    if (!isDragging) return;
    posX = event.clientX - startX;
    posY = event.clientY - startY;
    updateTransform();
}

function endDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', endDrag);
    artwork.style.cursor = 'grab';
}

artwork.addEventListener('wheel', zoom);
artwork.addEventListener('mousedown', startDrag);
