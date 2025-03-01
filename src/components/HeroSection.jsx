/* eslint-disable no-unused-vars */
import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter address, city, location"
            className="search-input"
          />
          <div className="filter-options">
            <div className="filter">
              <label>Property Type</label>
              <select>
                <option>All types</option>
              </select>
            </div>
            <div className="filter">
              <label>Bedrooms</label>
              <select>
                <option>Any</option>
              </select>
            </div>
            <div className="filter">
              <label>Price Range</label>
              <select>
                <option>Any</option>
              </select>
            </div>
          </div>
          <button className="search-btn">Search <i className="fas fa-search"></i></button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
