// Game logic
let pokemonHealth = 100;
const pokemonImage = document.getElementById('pokemon-image');
const pokemonName = document.getElementById('pokemon-name');
const pokemonHealthDisplay = document.getElementById('pokemon-health');
const battleLog = document.getElementById('battle-log');
const attackButton = document.getElementById('attack-button');

// Define the attack function
function attack() {
  // Random damage between 5 and 20
  const damage = Math.floor(Math.random() * 16) + 5;
  pokemonHealth -= damage;

  // Update health display
  pokemonHealthDisplay.querySelector('span').textContent = pokemonHealth;

  // Log the battle event
  battleLog.textContent = `You attacked! ${pokemonName.textContent} took ${damage} damage!`;

  // Check if Pokémon is defeated
  if (pokemonHealth <= 0) {
    pokemonHealth = 0;
    pokemonHealthDisplay.querySelector('span').textContent = pokemonHealth;
    battleLog.textContent = `${pokemonName.textContent} has fainted! Game over.`;
    attackButton.disabled = true;  // Disable attack button after faint
  }
}

// Add event listener for attack button
attackButton.addEventListener('click', attack);
