// script.js

const destinations = [
    {
        name: "Paris, France",
        image: "https://example.com/paris.jpg",
        description: "The City of Light, known for the Eiffel Tower, art museums, and café culture."
    },
    {
        name: "Kyoto, Japan",
        image: "https://example.com/kyoto.jpg",
        description: "A historic city with ancient temples, gardens, and traditional tea houses."
    },
    {
        name: "Maui, Hawaii",
        image: "https://example.com/maui.jpg",
        description: "An island paradise with beautiful beaches, volcanoes, and lush landscapes."
    },
    {
        name: "Cape Town, South Africa",
        image: "https://example.com/cape-town.jpg",
        description: "A stunning city between the ocean and mountains, known for its vibrant culture and natural beauty."
    },
    {
        name: "Santorini, Greece",
        image: "https://example.com/santorini.jpg",
        description: "A picturesque island with white-washed buildings, blue-domed churches, and stunning sunsets."
    }
    // Add more destinations as desired
];

function generateDestination() {
    // Pick a random destination
    const randomIndex = Math.floor(Math.random() * destinations.length);
    const destination = destinations[randomIndex];

    // Display destination information with fade-in effect
    const displayDiv = document.getElementById("destination-display");
    displayDiv.innerHTML = `
        <img src="${destination.image}" alt="${destination.name}" class="destination-image">
        <h3 class="destination-title">${destination.name}</h3>
        <p class="destination-description">${destination.description}</p>
    `;

    // Add fade-in animation
    displayDiv.classList.remove("visible");
    setTimeout(() => {
        displayDiv.classList.add("visible");
    }, 10);
}
