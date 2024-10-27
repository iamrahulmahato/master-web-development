document.addEventListener('DOMContentLoaded', () => {
    const factElement = document.getElementById('fact');
    const generateFactBtn = document.getElementById('generateFactBtn');

    // Movie titles from each language category
    const movies = [
        "Vikram Vedha", "Kaala", "Petta", "Master", "Asuran",
        "Inception", "Interstellar", "The Dark Knight", "Titanic", "Gladiator",
        "Baahubali", "Pushpa", "Ala Vaikunthapurramuloo", "Arjun Reddy", "RRR",
        "Drishyam", "Premam", "Kumbalangi Nights", "Ustad Hotel", "Bangalore Days"
    ];

    // Function to generate a random movie name
    const generateRandomMovieName = () => {
        // Select a random movie from the combined list
        return movies[Math.floor(Math.random() * movies.length)];
    };

    // Event listener for generating and displaying a random movie name
    generateFactBtn.addEventListener('click', () => {
        factElement.classList.remove('show'); // Remove any styling before loading a new name
        const randomMovieName = generateRandomMovieName(); // Generate the random name

        // Display the movie name with a fade-in effect
        setTimeout(() => {
            factElement.textContent = randomMovieName;
            factElement.classList.add('show'); // Add styling class to fade in the new name
        }, 500); // 500 ms delay for transition effect
    });
});
 