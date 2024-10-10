import { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cardsClicked, setCardsClicked] = useState([]);
  const [roundCompleted, setRoundCompleted] = useState(false);

  const handleClick = (card) => {
    if (cardsClicked.includes(card)) {
      setScore(0);
      setCardsClicked([]);
      setRoundCompleted(false);
    } else {
      setScore((score) => {
        const newScore = score + 1; //score doesnt get updated immediately
        console.log(score);
        console.log(newScore);

        setHighScore((highScore) => Math.max(highScore, newScore));
        return newScore;
      });
      setPokemon(shuffle(pokemon));
      // Use functional update to ensure correct score update
      setCardsClicked([...cardsClicked, card]);
      if (cardsClicked.length == 4) {
        setRoundCompleted(true);
      }
    }
    // Use functional update to ensure highScore reflects the latest score
  };

  const [isLoading, setIsLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching data...");
        // Fetch initial list of Pokémon with a limit of 8
        const randomOffset = Math.floor(Math.random() * (1302 - 8)); // Generate a random offset

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${randomOffset}&limit=8`
        );
        const data = await response.json();

        // Map over results to fetch detailed data for each Pokémon
        const promises = data.results.map(async (poke) => {
          const pokeData = await fetch(poke.url).then((res) => res.json());
          return {
            name: poke.name,
            sprites: pokeData.sprites.other["official-artwork"].front_default,
            // Extract high-resolution sprites
          };
        });

        // Wait for all promises to resolve
        const pokemonDetails = await Promise.all(promises);

        // Update state with fetched Pokémon details
        setPokemon(pokemonDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false); // Set loading state to false in case of error
    }

    fetchData();
  }, [roundCompleted]);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle
    while (currentIndex !== 0) {
      // Pick a remaining element
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // Swap it with the current element
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };
  return (
    <>
      <div className="header">
        <h1>Memory Game</h1>
        <p>Don't Click a card more than once !!</p>
        <div className="score">
          <p>Score: {score}</p>
          <p>High Score: {highScore}</p>
        </div>
      </div>
      <div className="container">
        {isLoading ? ( // Conditional rendering based on isLoading state
          <div className="spinner"></div> // Render spinner while loading
        ) : (
          pokemon.map((poke, index) => (
            <Card
              key={index}
              image={poke.sprites}
              name={poke.name}
              onClick={handleClick}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
