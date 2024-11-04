// script.js
document.getElementById('add-item').addEventListener('click', function() {
    const item = document.createElement('div');
    item.classList.add('item');

    // Get selected item type and color
    const itemType = document.getElementById('item-selector').value;
    const itemColor = document.getElementById('color-picker').value;

    // Change item appearance based on type
    switch (itemType) {
        case 'table':
            item.style.width = '70px';
            item.style.height = '20px';
            item.style.borderRadius = '10px';
            break;
        case 'chair':
            item.style.width = '30px';
            item.style.height = '50px';
            item.style.borderRadius = '5px';
            break;
        case 'lamp':
            item.style.width = '20px';
            item.style.height = '60px';
            item.style.borderRadius = '10px';
            break;
        default:
            item.style.width = '50px';
            item.style.height = '50px';
            break;
    }

    // Set the color of the item
    item.style.backgroundColor = itemColor;

    // Random position within the room
    const x = Math.random() * (250 - parseInt(item.style.width)); // Ensure it fits inside the room
    const y = Math.random() * (250 - parseInt(item.style.height));

    item.style.transform = `translate(${x}px, ${y}px)`;
    document.getElementById('items-container').appendChild(item);
});
