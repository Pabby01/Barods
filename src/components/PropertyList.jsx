/* eslint-disable no-unused-vars */
import React from "react";
import "./PropertyList.css";

const properties = [
  {
    id: 1,
    image: "/images/Recent-1.png",
    title: "Modern Apartment",
    location: "Lekki, Lagos",
    price: "$250,000",
  },
  {
    id: 2,
    image: "/images/Recent-2.png",
    title: "Luxury Villa",
    location: "Ikoyi, Lagos",
    price: "$1,200,000",
  },
  {
    id: 3,
    image: "/images/Recent-3.png",
    title: "Cozy Studio",
    location: "Victoria Island, Lagos",
    price: "$150,000",
  },
  {
    id: 1,
    image: "/images/Recent-1.png",
    title: "Modern Apartment",
    location: "Lekki, Lagos",
    price: "$250,000",
  },
  {
    id: 2,
    image: "/images/Recent-2.png",
    title: "Luxury Villa",
    location: "Ikoyi, Lagos",
    price: "$1,200,000",
  },
  {
    id: 3,
    image: "/images/Recent-3.png",
    title: "Cozy Studio",
    location: "Victoria Island, Lagos",
    price: "$150,000",
  },
];

const PropertyList = () => {
  return (
    <section className="property-list">
      <h2>Recent Properties</h2>
      <div className="property-grid">
        {properties.map((property) => (
          <div key={property.id} className="property-card">
            <img src={property.image} alt={property.title} />
            <div className="property-details">
              <h3>{property.title}</h3>
              <p>{property.location}</p>
              <p className="property-price">{property.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyList;
