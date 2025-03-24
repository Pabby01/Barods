/* eslint-disable no-unused-vars */
import React from "react";
import "./PropertyList.css";

const properties = [
  {
    id: 1,
    image: "/images/Recent-1.png",
    title: "Diamond Family Home",
    location: "2 bedroom flat, Ikeja, Lagos",
    beds: 3,
    baths: 2,
    size: "300 Sqm",
    price: "₦12,000,000",
    saleType: "For Sale"
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
    saleType: "For Sale"
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
    saleType: "For Sale"
  },
  {
    id: 4,
    image: "/images/Recent-1.png",
    title: "Diamond Family Home",
    location: "2 bedroom flat, Ikeja, Lagos",
    beds: 3,
    baths: 2,
    size: "300 Sqm",
    price: "₦12,000,000",
    saleType: "For Sale"
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
    saleType: "For Sale"
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
    saleType: "For Sale"
  },
];

const PropertyList = () => {
  return (
    <div className="property-list-container">
      <h2 className="section-title">Recent Properties</h2>
      
      <div className="property-grid2">
        {properties.map((property) => (
          <div key={property.id} className="property-card2">
            <div className="property-image-container">
              <img src={property.image} alt={property.title} className="property-image" />
              <div className="image-overlay">
                <button className="image-button">
                  <i className="fa fa-heart"></i>
                </button>
                <button className="image-button">
                  <i className="fa fa-expand"></i>
                </button>
              </div>
            </div>
            
            <div className="property-details2">
              <h3 className="property-title">{property.title}</h3>
              <p className="property-location">{property.location}</p>
              
              <div className="property-features">
                <div className="feature">
                  <i className="fa fa-bed"></i>
                  <span>{property.beds} Beds</span>
                </div>
                <div className="feature-divider"></div>
                <div className="feature">
                  <i className="fa fa-bath"></i>
                  <span>{property.baths} Baths</span>
                </div>
                <div className="feature-divider"></div>
                <div className="feature">
                  <i className="fa fa-expand"></i>
                  <span>{property.size}</span>
                </div>
              </div>
              
              <div className="property-pricing">
                <button className="sale-button">{property.saleType}</button>
                <span className="property-price4">{property.price}</span>
              </div>
            </div>
            
            {/* Clickable overlay for the entire card */}
            <a href={`/property-ID`} className="card-link" aria-label={`View details for ${property.title}`}></a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;