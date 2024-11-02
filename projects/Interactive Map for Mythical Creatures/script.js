// Sample data for mythical creatures
const creatures = [
    {
        name: "Dragon",
        description: "A large, serpent-like legendary creature that appears in the folklore of many cultures.",
        location: [37.7749, -122.4194] // San Francisco, CA
    },
    {
        name: "Unicorn",
        description: "A legendary horse-like creature with a single horn on its forehead, symbolizing purity.",
        location: [51.5074, -0.1278] // London, UK
    },
    {
        name: "Phoenix",
        description: "A bird that cyclically regenerates or is reborn from its ashes after dying.",
        location: [34.0522, -118.2437] // Los Angeles, CA
    },
    {
        name: "Kraken",
        description: "A legendary sea monster of giant size said to dwell off the coasts of Norway and Greenland.",
        location: [60.4720, 8.4689] // Norway
    },
    {
        name: "Yeti",
        description: "An ape-like entity said to inhabit the Himalayan mountains.",
        location: [27.9878, 86.9250] // Mount Everest, Nepal
    }
];

const map = L.map('map').setView([20, 0], 2); // Center the map

// Set up the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Function to add markers to the map
creatures.forEach(creature => {
    const marker = L.marker(creature.location).addTo(map);
    
    marker.bindPopup(creature.name);
    
    marker.on('click', () => {
        document.getElementById('creatureDescription').textContent = 
            `${creature.name}: ${creature.description}`;
    });
});
