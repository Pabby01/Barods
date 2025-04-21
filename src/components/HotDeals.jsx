/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Heart } from "lucide-react";
import "./HotDeals.css";

const HotDeals = () => {
  const [favorites, setFavorites] = useState({});

  const hotDeals = [
    {
      id: 1,
      img: "/images/Recent-1.png",
      title: "Diamond Family Home",
      location: "374, Johnson Ave, Ajah Lagos",
      currentPrice: "₦12,000,000",
      originalPrice: "₦20,000,000",
      discount: "20% off",
      beds: 3,
      baths: 3,
      sqm: 300
    },
    {
      id: 2,
      img: "/images/Recent-1.png",
      title: "Diamond Family Home",
      location: "374, Johnson Ave, Ajah Lagos",
      currentPrice: "₦12,000,000",
      originalPrice: "₦20,000,000",
      discount: "20% off",
      beds: 3,
      baths: 3,
      sqm: 300
    },
    {
      id: 3,
      img: "/images/Recent-1.png",
      title: "Diamond Family Home",
      location: "374, Johnson Ave, Ajah Lagos",
      currentPrice: "₦12,000,000",
      originalPrice: "₦20,000,000",
      discount: "20% off",
      beds: 3,
      baths: 3,
      sqm: 300
    }
  ];

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const viewPropertyDetails = (id) => {
    console.log(`Viewing property details for ID: ${id}`);
    // Navigation logic would go here
    // e.g., history.push(`/property/${id}`);
  };

  return (
    <section className="hot-deals-section">
      <div className="hot-deals-container">
        <h3 className="hot-deals-title">Hot Deals</h3>
        
        <div className="hot-deals-grid">
          {hotDeals.map((deal) => (
            <div 
              key={deal.id} 
              className="property-cards"
              onClick={() => viewPropertyDetails(deal.id)}
            >
              <div className="property-image-containers">
                <img src={deal.img} alt={deal.title} className="property-image2" />
                <div className="discount-badge">{deal.discount}</div>
                <button 
                  className={`favorite-button ${favorites[deal.id] ? 'active' : ''}`}
                  onClick={(e) => toggleFavorite(deal.id, e)}
                  aria-label={favorites[deal.id] ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart fill={favorites[deal.id] ? "#ff0000" : "none"} stroke={favorites[deal.id] ? "#ff0000" : "#ffffff"} />
                </button>
              </div>
              
              <div className="property-details1">
                <h3 className="property-title">{deal.title}</h3>
                <div className="property-location">
                  <span className="location-icon">📍</span>
                  <span>{deal.location}</span>
                </div>
                
                <div className="property-price1">
                  <span className="current-price">{deal.currentPrice}</span>
                  <span className="original-price">{deal.originalPrice}</span>
                </div>
                
                <div className="property-features">
                  <div className="feature">
                    <span className="feature-icon">🛏️</span>
                    <span>{deal.beds} Beds</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">🚿</span>
                    <span>{deal.baths} Baths</span>
                  </div>
                  <div className="feature">
                    <span className="feature-icon">📏</span>
                    <span>{deal.sqm} Sqm</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotDeals;