/* eslint-disable no-unused-vars */
import React from "react";
import "./CityList.css";

const cities = [
  {
    id: 1,
    name: "Lagos",
    image: "/images/lagos.jpeg",
    properties: 250,
  },
  {
    id: 2,
    name: "Abuja",
    image: "/images/Abeokuta.jpeg",
    properties: 180,
  },
  {
    id: 3,
    name: "Ibadan",
    image: "/images/ibadan.png",
    properties: 120,
  },
  {
    id: 4,
    name: "Port Harcourt",
    image: "/images/akure.jpeg",
    properties: 90,
  },
];

const CityList = () => {
  return (
    <section className="city-list">
      <h2>Explore Properties by City</h2>
      <div className="city-grid">
        {cities.map((city) => (
          <div key={city.id} className="city-card">
            <img src={city.image} alt={city.name} />
            <div className="city-info">
              <h3>{city.name}</h3>
              <p>{city.properties} Properties</p>
            </div>
          </div>
        ))}
      </div>
      <h2>International Cities</h2>
      <div className="city-grid">
        {cities.map((city) => (
          <div key={city.id} className="city-card">
            <img src={city.image} alt={city.name} />
            <div className="city-info">
              <h3>{city.name}</h3>
              <p>{city.properties} Properties</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CityList;
