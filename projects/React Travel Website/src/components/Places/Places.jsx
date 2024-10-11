import React from "react";
import PlaceCard from "./PlaceCard";
import Img1 from "../../assets/places/boat.jpg";
import Img2 from "../../assets/places/tajmahal.jpg";
import Img3 from "../../assets/places/water.jpg";
import Img4 from "../../assets/places/place4.jpg";
import Img5 from "../../assets/places/place5.jpg";
import Img6 from "../../assets/places/place6.jpg";

const PlacesData = [
  {
    img: Img1,
    title: "Boat",
    location: "USA",
    description: "Experience serene boat rides amidst breathtaking landscapes.",
    price: 1500,
    type: "Adventure",
  },
  {
    img: Img2,
    title: "Taj Mahal",
    location: "India",
    description:
      "Visit the iconic Taj Mahal, an ivory-white marble mausoleum in Agra.",
    price: 3000,
    type: "Cultural",
  },
  {
    img: Img3,
    title: "Underwater",
    location: "US",
    description:
      "Explore the fascinating underwater world and its vibrant marine life.",
    price: 2500,
    type: "Nature",
  },
  {
    img: Img4,
    title: "Sydney",
    location: "Australia",
    description: "Discover the vibrant city of Sydney with its stunning landmarks.",
    price: 2000,
    type: "City",
  },
  {
    img: Img5,
    title: "Los Angeles",
    location: "United States",
    description:
      "Experience the glamour of Los Angeles and its diverse cultural scene.",
    price: 1800,
    type: "City",
  },
  {
    img: Img6,
    title: "Las Vegas",
    location: "Nevada, USA",
    description:
      "Visit Las Vegas and explore its vibrant nightlife and entertainment.",
    price: 2200,
    type: "Adventure",
  },
];

const Places = ({ handleOrderPopup }) => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
        <section data-aos="fade-up" className="container">
          <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            Best Places to Visit
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PlacesData.map((item, index) => (
              <PlaceCard
                handleOrderPopup={handleOrderPopup}
                key={index}
                {...item}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Places;
