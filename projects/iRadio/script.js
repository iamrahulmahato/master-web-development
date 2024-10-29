let currentAudio = null;

async function searchStations() {
    const searchQuery = document.getElementById('searchInput').value || "india";
    const apiUrl = `https://de1.api.radio-browser.info/json/stations/search?name=${encodeURIComponent(searchQuery)}`;
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results

    try {
        const response = await fetch(apiUrl);
        const stations = await response.json();

        if (stations.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        stations.forEach(station => {
            const stationDiv = document.createElement('div');
            stationDiv.className = 'station';

            // Create an audio element with event listener
            const audioElement = document.createElement('audio');
            audioElement.controls = true;
            audioElement.src = station.url_resolved;

            audioElement.addEventListener('play', () => {
                // Pause any currently playing audio before playing a new one
                if (currentAudio && currentAudio !== audioElement) {
                    currentAudio.pause();
                }
                currentAudio = audioElement; // Set the current audio element
            });

            stationDiv.innerHTML = `
                <h2>${station.name}</h2>
                <p>${station.country}</p>
            `;
            stationDiv.appendChild(audioElement);
            resultsContainer.appendChild(stationDiv);
        });
    } catch (error) {
        resultsContainer.innerHTML = '<p>Error loading stations. Please try again later.</p>';
        console.error(error);
    }
}
