/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Heart, Maximize } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import "./PropertyList.css";

const properties = [
  {
    id: 1,
    image: "/images/Recent-1.png",
    title: "Diamond Home",
    location: "2 bedroom flat, Ikeja, Lagos",
    beds: 3,
    baths: 2,
    size: "300 Sqm",
    price: "₦12,000,000",
    saleType: "For Sale",
  },
  {
    id: 2,
    image: "/images/Recent-2.png",
    title: "Mountainview Villa",
    location: "3 bedroom flat, Ikeja, Lagos",
    beds: 4,
    baths: 3,
    size: "350 Sqm",
    price: "₦12,000,000",
    saleType: "For Sale",
  },
  {
    id: 3,
    image: "/images/Recent-3.png",
    title: "Seaside Cottage",
    location: "4 bedroom flat, Ikeja, Lagos",
    beds: 4,
    baths: 3,
    size: "380 Sqm",
    price: "₦12,000,000",
    saleType: "For Sale",
  },
  {
    id: 4,
    image: "/images/Recent-1.png",
    title: "Royal Home",
    location: "2 bedroom flat, Ikeja, Lagos",
    beds: 3,
    baths: 2,
    size: "300 Sqm",
    price: "₦12,000,000",
    saleType: "For Sale",
  },
  {
    id: 5,
    image: "/images/Recent-2.png",
    title: "Mountainview Villa",
    location: "3 bedroom flat, Ikeja, Lagos",
    beds: 4,
    baths: 3,
    size: "350 Sqm",
    price: "₦12,000,000",
    saleType: "For Sale",
  },
  {
    id: 6,
    image: "/images/Recent-3.png",
    title: "Seaside Cottage",
    location: "4 bedroom flat, Ikeja, Lagos",
    beds: 4,
    baths: 3,
    size: "380 Sqm",
    price: "₦12,000,000",
    saleType: "For Sale",
  },
];

const PropertyList = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState({});

  const viewPropertyDetails = (id) => {
    navigate(`/property-ID`);
  };

  const toggleFavorite = (e, id) => {
    e.stopPropagation(); // Prevent card click when clicking favorite button
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="property-list-container">
      <h2 className="section-title2">Recent Properties</h2>

      <div className="property-grid2">
        {properties.map((property) => (
          <div 
            key={property.id} 
            className="property-card2"
            onClick={() => viewPropertyDetails(property.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="property-image-wrapper">
              <img
                src={property.image}
                alt={property.title}
                className="property-image5"
              />
              <div className="image-overlay">
                <button 
                  className="image-button"
                  onClick={(e) => toggleFavorite(e, property.id)}
                >
                  <Heart 
                    size={18} 
                    fill={favorites[property.id] ? "#ff0000" : "none"}
                    stroke={favorites[property.id] ? "#ff0000" : "currentColor"}
                  />
                </button>
                <button 
                  className="image-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle maximize/view image functionality here
                  }}
                >
                  <Maximize size={18} />
                </button>
              </div>
              <div className="price-tag">
                {property.price}
              </div>
            </div>

            <div className="property-info">
              <div className="property-location">
                {property.location}
              </div>
              <h3 className="property-title">{property.title}</h3>

              <div className="property-features">
                <div className="feature">
                  <span className="feature-value">{property.beds}</span> Beds
                </div>
                <div className="feature-divider" />
                <div className="feature">
                  <span className="feature-value">{property.baths}</span> Baths
                </div>
                <div className="feature-divider" />
                <div className="feature">
                  <span className="feature-value">{property.size}</span>
                </div>
              </div>

              <div className="property-footer">
                <div className="sale-tag">{property.saleType}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;