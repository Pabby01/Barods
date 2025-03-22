/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaSearch, FaWhatsapp } from "react-icons/fa";
import "./HeroSection.css";

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState("sale"); // Default to "For Sale" tab
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyType, setPropertyType] = useState("All types");
  const [bedrooms, setBedrooms] = useState("Any");
  const [priceRange, setPriceRange] = useState("Any");

  const handleSearch = () => {
    // Collect all search parameters
    const searchParams = {
      type: activeTab, // sale, rent, or shortlet
      query: searchQuery,
      propertyType,
      bedrooms,
      priceRange
    };
    
    console.log("Search params:", searchParams);
    // Here you would typically:
    // 1. Call an API with these parameters
    // 2. Update Redux/Context state
    // 3. Navigate to search results page
  };

  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Dream Home</h1>
          
          {/* Tab Navigation */}
          <div className="search-tabs">
            <button 
              className={`tab ${activeTab === 'sale' ? 'active' : ''}`}
              onClick={() => setActiveTab('sale')}
            >
              For Sale
            </button>
            <button 
              className={`tab ${activeTab === 'rent' ? 'active' : ''}`}
              onClick={() => setActiveTab('rent')}
            >
              For Rent
            </button>
            <button 
              className={`tab ${activeTab === 'shortlet' ? 'active' : ''}`}
              onClick={() => setActiveTab('shortlet')}
            >
              Shortlet
            </button>
          </div>
          
          {/* Search Box */}
          <div className="search-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Enter address, city, location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button 
                className="search-button"
                onClick={handleSearch}
              >
                Search <FaSearch />
              </button>
            </div>
            
            {/* Filters Row */}
            <div className="search-filters">
              <div className="filter-group">
                <label>Property Type</label>
                <select 
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="filter-select"
                >
                  <option value="All types">All types</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Villa">Villa</option>
                  <option value="Land">Land</option>
                  <option value="Commercial">Commercial</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Bedrooms</label>
                <select 
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="filter-select"
                >
                  <option value="Any">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5+">5+</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Price Range</label>
                <select 
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="filter-select"
                >
                  <option value="Any">Any</option>
                  {activeTab === 'sale' ? (
                    <>
                      <option value="0-50000000">₦0 - ₦50,000,000</option>
                      <option value="50000000-100000000">₦50,000,000 - ₦100,000,000</option>
                      <option value="100000000-200000000">₦100,000,000 - ₦200,000,000</option>
                      <option value="200000000+">₦200,000,000+</option>
                    </>
                  ) : (
                    <>
                      <option value="0-500000">₦0 - ₦500,000</option>
                      <option value="500000-1000000">₦500,000 - ₦1,000,000</option>
                      <option value="1000000-5000000">₦1,000,000 - ₦5,000,000</option>
                      <option value="5000000+">₦5,000,000+</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* WhatsApp Button */}
      <a href="https://wa.me/+2349020250260" className="whatsapp-button">
        <FaWhatsapp size={24} />
      </a>
    </section>
  );
};

export default HeroSection;