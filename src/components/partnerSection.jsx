/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./PartnersSection.css";

const PartnersSection = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    // Fetch partners from backend (replace with your actual API endpoint)
    fetch("https://your-backend.com/api/partners")
      .then((response) => response.json())
      .then((data) => setPartners(data))
      .catch((error) => console.error("Error fetching partners:", error));
  }, []);

  return (
    <section className="partners-section">
      <h2>OUR TRUSTED PARTNERS</h2>
      <div className="partners-slider">
        <div className="partners-track">
          {partners.length > 0
            ? partners.map((partner, index) => (
                <img
                  key={index}
                  src={partner.logo}
                  alt={partner.name}
                  className="partner-logo"
                />
              ))
            : Array(15)
                .fill("")
                .map((_, index) => (
                  <img
                    key={index}
                    src={`/images/partner-placeholder-${(index % 5) + 1}.png`}
                    alt="Placeholder"
                    className="partner-logo"
                  />
                ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
