/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import "./CityList.css";

const localCities = [
  {
    id: 1,
    name: "Abeokuta",
    image: "/images/Abeokuta.jpeg",
    properties: 64,
  },
  {
    id: 2,
    name: "Lagos",
    image: "/images/lagos.jpeg",
    properties: 264,
  },
  {
    id: 3,
    name: "Ibadan",
    image: "/images/ibadan.png",
    properties: 47,
  },
  {
    id: 4,
    name: "Akure",
    image: "/images/akure.jpeg",
    properties: 32,
  },
  {
    id: 5,
    name: "Akure",
    image: "/images/akure.jpeg",
    properties: 32,
  },
];

const internationalCities = [
  {
    id: 1,
    name: "South Africa",
    image: "/images/south-africa.png",
    properties: 64,
  },
  {
    id: 2,
    name: "Abu Dhabi",
    image: "/images/abu-dahbi.png",
    properties: 264,
  },
];

const CityList = () => {
  const localCitiesRef = useRef(null);
  const internationalCitiesRef = useRef(null);

  const scroll = (direction, ref) => {
    const scrollAmount = 300;
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCityClick = (cityName) => {
    // Navigate to city properties page
    console.log(`Viewing properties in ${cityName}`);
    // Example navigation: history.push(`/properties/${cityName}`);
  };

  return (
    <div className="city-list-container">
      <section className="city-section">
        <h3 className="section-title">Explore Our Cities</h3>
        <div className="carousel-container">
          <button 
            className="nav-button prev-button" 
            onClick={() => scroll('left', localCitiesRef)}
            aria-label="Previous cities"
          >
            &lt;
          </button>
          
          <div className="carousel" ref={localCitiesRef}>
            {localCities.map((city) => (
              <div
                key={city.id}
                className="city-card"
                onClick={() => handleCityClick(city.name)}
                style={{
                  backgroundImage: `url(${city.image})`,
                }}
              >
                <div className="city-overlay">
                  <div className="city-info">
                    <h3 className="city-name">{city.name}</h3>
                    <p className="property-count">{city.properties} Properties</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="nav-button next-button" 
            onClick={() => scroll('right', localCitiesRef)}
            aria-label="Next cities"
          >
            &gt;
          </button>
        </div>
      </section>

      <section className="city-section">
        <h3 className="section-title">International Cities</h3>
        <div className="carousel-container">
          <button 
            className="nav-button prev-button" 
            onClick={() => scroll('left', internationalCitiesRef)}
            aria-label="Previous international cities"
          >
            &lt;
          </button>
          
          <div className="carousel" ref={internationalCitiesRef}>
            {internationalCities.map((city) => (
              <div
                key={city.id}
                className="city-card"
                onClick={() => handleCityClick(city.name)}
                style={{
                  backgroundImage: `url(${city.image})`,
                }}
              >
                <div className="city-overlay">
                  <div className="city-info">
                    <h3 className="city-name">{city.name}</h3>
                    <p className="property-count">{city.properties} Properties</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="nav-button next-button" 
            onClick={() => scroll('right', internationalCitiesRef)}
            aria-label="Next international cities"
          >
            &gt;
          </button>
        </div>
      </section>
    </div>
  );
};

export default CityList;