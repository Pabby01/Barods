/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaSearch, FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import "./Properties.css";

const sampleProperties = [
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

const Properties = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [properties, setProperties] = useState(sampleProperties);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("https://barods-global.onrender.com/api/v1/user/getAvailableforsale");
        if (response.data && Array.isArray(response.data.properties) && response.data.properties.length > 0) {
          // Map API data to match the sample property structure
          const mapped = response.data.properties.map((item, idx) => ({
            id: item._id || idx + 1,
            title: item.Title || "Untitled Property",
            location: item.Location || item.location || "No location",
            price:
              item.Price && typeof item.Price === "object" && item.Price.$numberDecimal
                ? `₦${Number(item.Price.$numberDecimal).toLocaleString()}`
                : item.Price && typeof item.Price === "number"
                ? `₦${item.Price.toLocaleString()}`
                : item.Price && typeof item.Price === "string"
                ? `₦${item.Price}`
                : "₦0",
            beds: item.Bedroom || item.beds || 0,
            baths: item.Bathroom || item.baths || 0,
            area: item.Area || item.area || "",
            image: (item.Image && item.Image[0]) || item.image || "/images/Recent-1.png"
          }));
          setProperties(mapped);
        } else {
          setProperties(sampleProperties);
        }
      } catch (error) {
        setProperties(sampleProperties);
      }
    };
    fetchProperties();
  }, []);

  // Pagination logic
  const propertiesPerPage = 9;
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="properties-page">
      {/* Hero Banner */}
      <div className="properties-banner">
        <div className="overlay"></div>
        <img 
          src="/images/Hero.png" 
          alt="Property Banner" 
          className="banner-image"
        />
        <div className="banner-content">
          <h1 className="sick">Properties For Sale</h1>
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
                  <span className="badge">For Sale</span>
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
                  <Link to={`/property2/${property.id}`} className="for-sale-btn">
                    Buy Now
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

export default Properties;