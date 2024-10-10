import React from "react";
import "../styles/Card.css";

function Card({ image, name, onClick }) {
  // sent handleClick as parameter here as onClick and now we are giving parameter to
  const handleClick = () => {
    onClick(name); // When the card is clicked, call the onClick function passed from the parent component (App) and pass the name of the Pokémon
  };
  return (
    <div className="card" onClick={handleClick}>
      <img src={image} alt={name} />
      <br />
      <span>
        <p>{name}</p>
      </span>
    </div>
  );
}

export default Card;
