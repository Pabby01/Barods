/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import propertiesData from "../data/properties.json";
import "./HotDeals.css";

const HotDeals = () => {
  const [favorites, setFavorites] = useState({});
  const [hotDeals, setHotDeals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter properties to get only hot deals
    const deals = propertiesData.properties.filter(property => property.isHotDeal);
    setHotDeals(deals);
  }, []);

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const viewPropertyDetails = (slug) => {
    navigate(`/property/${slug}`);
  };

  return (
    <section className="hot-deals-section">
      <div className="hot-deals-container">
        <h3 className="hot-deals-title">Hot Deals</h3>
        
        <div className="hot-deals-grid">
          {hotDeals.map((deal) => (
            <div className="property-card" key={deal.id}>
              <Link to={`/properties/${deal.slug}`} className="property-link">
                <div 
                  className="property-cards"
                  onClick={() => viewPropertyDetails(deal.slug)}
                >
                  <div className="property-image-containers">
                    <img src={deal.images[0]} alt={deal.title} className="property-image17" />
                    <div className="discount-badge">{deal.price.discount}% off</div>
                    <button 
                      className={`favorite-button ${favorites[deal.id] ? 'active' : ''}`}
                      onClick={(e) => toggleFavorite(deal.id, e)}
                      aria-label={favorites[deal.id] ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart fill={favorites[deal.id] ? "#ff0000" : "none"} stroke={favorites[deal.id] ? "#ff0000" : "#ffffff"} />
                    </button>
                  </div>
                  
                  <div className="property-details17">
                    <h3 className="property-title">{deal.title}</h3>
                    <div className="property-location">
                      <span className="location-icon">📍</span>
                      <span>{deal.location.address}, {deal.location.area} {deal.location.city}</span>
                    </div>
                    
                    <div className="property-price1">
                      <span className="current-price">{deal.price.formatted.current}</span>
                      <span className="original-price">{deal.price.formatted.original}</span>
                    </div>
                    
                    <div className="property-features">
                      <div className="feature">
                        <span className="feature-icon">🛏️</span>
                        <span>{deal.features.beds} Beds</span>
                      </div>
                      <div className="feature">
                        <span className="feature-icon">🚿</span>
                        <span>{deal.features.baths} Baths</span>
                      </div>
                      <div className="feature">
                        <span className="feature-icon">📏</span>
                        <span>{deal.features.area.size} {deal.features.area.unit}</span>
                      </div>
                    </div>
                    <Link to={`/property/${deal.slug || deal.id}`}>View Details</Link>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotDeals;