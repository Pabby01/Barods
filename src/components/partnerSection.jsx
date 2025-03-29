/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./PartnersSection.css";

const PartnersSection = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    const fallbackPartners = [
      { name: "Partner 1", logo: "/images/aean.jpg" },
      { name: "Partner 2", logo: "/images/g5.jpg" },
      { name: "Partner 3", logo: "/images/gateway.jpg" },
      { name: "Partner 4", logo: "/images/lag-logo.jpg" },
      { name: "Partner 5", logo: "/images/landwey.jpg" },
      { name: "Partner 6", logo: "/images/msr.jpg" },
      { name: "Partner 7", logo: "/images/ogun-logo.jpg" },
      { name: "Partner 8", logo: "/images/opic.jpg" },
      { name: "Partner 9", logo: "/images/pmb.jpg" },
      { name: "Partner 10", logo: "/images/pelican.jpg" },
    ];

    // Fetch partners from backend (replace with your actual API endpoint)
    fetch("https://your-backend.com/api/partners")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          setPartners(data);
        } else {
          setPartners(fallbackPartners);
        }
      })
      .catch((error) => {
        console.error("Error fetching partners:", error);
        setPartners(fallbackPartners);
      });
  }, []);

  return (
    <section className="partners-section">
      <h2>OUR TRUSTED PARTNERS</h2>
      <div className="partners-slider">
        <div className="partners-track">
          {partners.map((partner, index) => (
            <img
              key={index}
              src={partner.logo}
              alt={partner.name}
              className="partner-logo"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
