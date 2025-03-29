/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaSearch, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Header from "../components/Header";
import "./Properties.css";

const Properties2 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Sample property data
  const properties = [
    {
      id: 1,
      title: "Diamond Family Home",
      location: "235 Johnson Rd, Kate Lagos",
      price: "₦12,000,000",
      beds: 3,
      baths: 2,
      area: "375 sqft",
      image: "/images/Recent-1.png"
    },
    {
      id: 2,
      title: "Mountainview Villa",
      location: "456 Laroshdale Rd, Kari Lagos",
      price: "₦12,000,000",
      beds: 4,
      baths: 2,
      area: "450 sqft",
      image: "/images/Recent-1.png"
    },
    {
      id: 3,
      title: "Seaside Cottage",
      location: "236 Johnson Rd, Kari Lagos",
      price: "₦12,000,000",
      beds: 3,
      baths: 3,
      area: "425 sqft",
      image: "/images/Recent-1.png"
    },
    {
      id: 4,
      title: "Diamond Family Home",
      location: "235 Johnson Rd, Kate Lagos",
      price: "₦12,000,000",
      beds: 3,
      baths: 2,
      area: "375 sqft",
      image: "/images/Recent-1.png"
    },
    {
      id: 5,
      title: "Mountainview Villa",
      location: "456 Laroshdale Rd, Kari Lagos",
      price: "₦12,000,000",
      beds: 4,
      baths: 2,
      area: "450 sqft",
      image: "/images/Recent-1.png"
    },
    {
      id: 6,
      title: "Seaside Cottage",
      location: "236 Johnson Rd, Kari Lagos",
      price: "₦12,000,000",
      beds: 3,
      baths: 3,
      area: "425 sqft",
      image: "/images/Recent-1.png"
    },
    {
      id: 7,
      title: "Diamond Family Home",
      location: "235 Johnson Rd, Kate Lagos",
      price: "₦12,000,000",
      beds: 3,
      baths: 2,
      area: "375 sqft",
      image: "/images/Recent-1.png"
    },
    {
      id: 8,
      title: "Mountainview Villa",
      location: "456 Laroshdale Rd, Kari Lagos",
      price: "₦12,000,000",
      beds: 4,
      baths: 2,
      area: "450 sqft",
      image: "/images/Recent-1.png"
    },
    {
      id: 9,
      title: "Seaside Cottage",
      location: "236 Johnson Rd, Kari Lagos",
      price: "₦12,000,000",
      beds: 3,
      baths: 3,
      area: "425 sqft",
      image: "/images/Recent-1.png"
    }
  ];

  // Calculate displayed properties based on current page
  const propertiesPerPage = 9;
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
  
  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Calculate total pages
  const totalPages = Math.ceil(properties.length / propertiesPerPage);
  
  return (
    <div className="properties-page">
      <Header />
      
      {/* Hero Banner */}
      <div className="properties-banner">
        <div className="overlay"></div>
        <img 
          src="/images/Hero.png" 
          alt="Property Banner" 
          className="banner-image"
        />
        <div className="banner-content">
          <h1>Properties For Rent</h1>
          <p>Home / Properties</p>
        </div>
      </div>

      {/* Property Listings */}
      <div className="properties-container">
        <div className="properties-header">
          <p className="showing-results">Showing 1-{currentProperties.length} of {properties.length}</p>
          <div className="sort-dropdown">
            <select defaultValue="default">
              <option value="default">Sort by: Default</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>
        
        <div className="properties-grid">
          {currentProperties.map(property => (
            <div className="property-card" key={property.id}>
              <div className="property-image-container">
                <img src={property.image} alt={property.title} className="property-image" />
                <div className="property-badges">
                  <span className="badge">For Rent</span>
                </div>
                <div className="property-actions">
                  <button className="action-btn search"><FaSearch /></button>
                  <button className="action-btn heart"><FaHeart /></button>
                </div>
              </div>
              <div className="property-details9">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-location">{property.location}</p>
                <div className="property-features">
                  <div className="feature">
                    <span className="feature-value">{property.beds} Beds</span>
                  </div>
                  <div className="feature-divider">|</div>
                  <div className="feature">
                    <span className="feature-value">{property.baths} Baths</span>
                  </div>
                  <div className="feature-divider">|</div>
                  <div className="feature">
                    <span className="feature-value">{property.area}</span>
                  </div>
                </div>
                <div className="property-price-container">
                  <Link  to={`/property-ID`} className="for-sale-btn">
                    Rent Now
                  </Link>
                  <span className="property-price">{property.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button 
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      
      
      
      {/* WhatsApp Button */}
     <a href="https://wa.me/+2349020250260" className="whatsapp-button">
        <FaWhatsapp size={24} />
      </a>
    </div>
  );
};

export default Properties2;