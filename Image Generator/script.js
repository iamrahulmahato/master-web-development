const images = [
    'https://via.placeholder.com/300x200?text=Image+1',
    'https://via.placeholder.com/300x200?text=Image+2',
    'https://via.placeholder.com/300x200?text=Image+3',
    'https://via.placeholder.com/300x200?text=Image+4',
    'https://via.placeholder.com/300x200?text=Image+5'
];

const randomImage = document.getElementById('randomImage');
const generateButton = document.getElementById('generateButton');

generateButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * images.length);
    randomImage.src = images[randomIndex];
    randomImage.style.display = 'block'; // Show the image
});
