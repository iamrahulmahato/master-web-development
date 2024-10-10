document.addEventListener('DOMContentLoaded', () => {
    const garden = document.getElementById('garden');
    const toolbox = document.getElementById('toolbox');
    let currentTool = null;
    let isDrawing = false;

    const rockImages = ['rock1', 'rock2', 'rock3'];
    const plantImages = ['plant1', 'plant2', 'plant3'];

    toolbox.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            currentTool = e.target.id;
        }
    });

    garden.addEventListener('click', (e) => {
        if (currentTool === 'rock' || currentTool === 'plant') {
            const element = document.createElement('div');
            element.classList.add('garden-element', currentTool);
            
            const img = document.createElement('img');
            if (currentTool === 'rock') {
                const randomRock = rockImages[Math.floor(Math.random() * rockImages.length)];
                img.src = document.getElementById(randomRock).src;
                element.style.width = '50px';
                element.style.height = '50px';
            } else {
                const randomPlant = plantImages[Math.floor(Math.random() * plantImages.length)];
                img.src = document.getElementById(randomPlant).src;
                element.style.width = '50px';
                element.style.height = '100px';
            }
            
            element.appendChild(img);
            element.style.left = `${e.offsetX - 25}px`;
            element.style.top = `${e.offsetY - (currentTool === 'plant' ? 50 : 25)}px`;
            garden.appendChild(element);

            element.addEventListener('mousedown', startDragging);
        }
    });

    garden.addEventListener('mousedown', (e) => {
        if (currentTool === 'rake') {
            isDrawing = true;
            draw(e);
        }
    });

    garden.addEventListener('mousemove', (e) => {
        if (isDrawing) draw(e);
    });

    garden.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    function draw(e) {
        if (currentTool === 'rake') {
            const line = document.createElement('div');
            line.classList.add('rake-line');
            line.style.width = '100px';
            line.style.left = `${e.offsetX}px`;
            line.style.top = `${e.offsetY}px`;
            line.style.transform = `rotate(${Math.random() * 180}deg)`;
            garden.appendChild(line);
        }
    }

    function startDragging(e) {
        e.preventDefault();
        const element = e.target.closest('.garden-element');
        let startX = e.clientX - element.offsetLeft;
        let startY = e.clientY - element.offsetTop;

        function dragElement(e) {
            e.preventDefault();
            element.style.left = `${e.clientX - startX}px`;
            element.style.top = `${e.clientY - startY}px`;
        }

        function stopDragging() {
            document.removeEventListener('mousemove', dragElement);
            document.removeEventListener('mouseup', stopDragging);
        }

        document.addEventListener('mousemove', dragElement);
        document.addEventListener('mouseup', stopDragging);
    }

    document.getElementById('clear').addEventListener('click', () => {
        while (garden.firstChild) {
            garden.removeChild(garden.firstChild);
        }
    });
});