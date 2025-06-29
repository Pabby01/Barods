/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Heart, Maximize } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import propertiesData from "../data/properties.json";
import "./PropertyList.css";

const PropertyList = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState({});
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    setProperties(propertiesData.properties);
  }, []);

  const viewPropertyDetails = (slug) => {
    navigate(`/property/${slug}`);
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
            onClick={() => viewPropertyDetails(property.slug)}
            style={{ cursor: 'pointer' }}
          >
            <div className="property-image-wrapper">
              <img
                src={property.images[0]}
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
                {property.price.formatted.current}
              </div>
            </div>

            <div className="property-info">
              <div className="property-location">
                {property.location.address}, {property.location.area} {property.location.city}
              </div>
              <h3 className="property-title">{property.title}</h3>

              <div className="property-features">
                <div className="feature">
                  <span className="feature-value">{property.features.beds}</span> Beds
                </div>
                <div className="feature-divider" />
                <div className="feature">
                  <span className="feature-value">{property.features.baths}</span> Baths
                </div>
                <div className="feature-divider" />
                <div className="feature">
                  <span className="feature-value">{property.features.area.size} {property.features.area.unit}</span>
                </div>
              </div>

              <div className="property-footer">
                <div className="sale-tag">{property.status}</div>
                <Link to={`/properties/${property.slug || property.id}`} className="view-details-link">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;