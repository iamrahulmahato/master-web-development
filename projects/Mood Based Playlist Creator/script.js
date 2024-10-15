document.getElementById('generate').addEventListener('click', function() {
    const mood = document.getElementById('mood').value;
    const playlistDiv = document.getElementById('playlist');
    playlistDiv.innerHTML = ''; // Clear previous playlist

    const playlists = {
        happy: [
            'Happy Song 1',
            'Happy Song 2',
            'Happy Song 3'
        ],
        sad: [
            'Sad Song 1',
            'Sad Song 2',
            'Sad Song 3'
        ],
        chill: [
            'Chill Song 1',
            'Chill Song 2',
            'Chill Song 3'
        ],
        energetic: [
            'Energetic Song 1',
            'Energetic Song 2',
            'Energetic Song 3'
        ]
    };

    if (mood && playlists[mood]) {
        const songs = playlists[mood];
        const ul = document.createElement('ul');

        songs.forEach(song => {
            const li = document.createElement('li');
            li.textContent = song;
            ul.appendChild(li);
        });

        playlistDiv.appendChild(ul);
    } else {
        playlistDiv.innerHTML = '<p>Please select a mood!</p>';
    }
});
