/* eslint-disable no-unused-vars */
import React from "react";
import "../styles/about.css";

const teamMembers = [
  { name: "Batosandeko Denton", role: "CEO", img: "/images/team-1.png" },
  { name: "Name Surname", role: "Designation", img: "/images/team-1.png" },
  { name: "Name Surname", role: "Designation", img: "/images/team-1.png" },
  { name: "Name Surname", role: "Designation", img: "/images/team-1.png" },
  { name: "Name Surname", role: "Designation", img: "/images/team-1.png" },
  { name: "Name Surname", role: "Designation", img: "/images/team-1.png" },
  { name: "Name Surname", role: "Designation", img: "/images/team-1.png" },
  { name: "Name Surname", role: "Designation", img: "/images/team-1.png" },
];

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>Our Vision</h1>
        <p>&quot;To revolutionize the real estate industry by delivering high-quality and innovative solutions.&quot;</p>
      </div>

      {/* Our Story Section */}
        <section className="our-story">
          <div className="story-text">
            <h2>Our Story</h2>
            <p>
              Barods Global Limited is a leading real estate company specializing in property sales, rentals, and management. 
              Founded on strong values and integrity, we provide seamless property solutions.
            </p>
            <p>
              Over the years, we have successfully completed several projects, providing clients with exceptional properties 
              across various categories.
            </p>
          </div>
          <div className="story-images">
            <img src="/images/team-lead.png" alt="Founder" />
            <img className="fix" src="/images/team-ladies.png" alt="Teamwork" />
            <img className="fix" src="/images/barods-team2.png" alt="Office Meeting" />
          </div>
        </section>

        {/* Our Values */}
        <section className="our-values">
          <div className="story-text">
            <h2>Our Values</h2>
            <p>
              We are committed to excellence, innovation, and customer satisfaction. Our company operates with integrity and a 
              customer-centric approach to ensure that every client receives the best service.
            </p>
          </div>
          <div className="values-image">
            <img className="values-img" src="/images/team-ladies.png" alt="Team Collaboration" />
          </div>
        </section>


      {/* Meet Our Team */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <p>Meet the professionals behind our success.</p>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div className="team-member" key={index}>
              <img src={member.img} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
