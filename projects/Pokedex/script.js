
document.getElementById('search-button').addEventListener('click', function() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${input}`;
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Pokémon not found");
            }
            return response.json();
        })
        .then((data) => {
            document.getElementById('pokemon-name').textContent = data.name.toUpperCase();
            document.getElementById('pokemon-id').textContent = data.id;
            document.getElementById('weight').textContent = data.weight;
            document.getElementById('height').textContent = data.height;
            document.getElementById('hp').textContent = data.stats[0].base_stat;
            document.getElementById('attack').textContent = data.stats[1].base_stat;
            document.getElementById('defense').textContent = data.stats[2].base_stat;
            document.getElementById('special-attack').textContent = data.stats[3].base_stat;
            document.getElementById('special-defense').textContent = data.stats[4].base_stat;
            document.getElementById('speed').textContent = data.stats[5].base_stat;
            const typesContainer = document.getElementById('types');
            typesContainer.innerHTML = '';  // Clear previous types
            data.types.forEach(type => {
                const typeElement = document.createElement('div');
                typeElement.textContent = type.type.name.toUpperCase();
                typesContainer.appendChild(typeElement);


            let pokemonImage = document.getElementById('pokemon-image');
            pokemonImage.innerHTML = '';  // Clear any previous image
            const sprite = document.createElement('img')
            sprite.id = 'sprite';
            sprite.src = data.sprites.front_default;
            sprite.class='pokemon'
            pokemonImage.appendChild(sprite);
            });


        })
        .catch((error) => {
            console.error(error);
            alert("Pokémon not found");
        });
});