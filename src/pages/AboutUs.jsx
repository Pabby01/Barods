/* eslint-disable no-unused-vars */
import React from "react";
import "../styles/about.css";

const teamMembers = [
  { name: "Name Surname", role: "Designation", img: "/images/team1.jpg" },
  { name: "Name Surname", role: "Designation", img: "/images/team2.jpg" },
  { name: "Name Surname", role: "Designation", img: "/images/team3.jpg" },
  { name: "Name Surname", role: "Designation", img: "/images/team4.jpg" },
  { name: "Name Surname", role: "Designation", img: "/images/team5.jpg" },
  { name: "Name Surname", role: "Designation", img: "/images/team6.jpg" },
  { name: "Name Surname", role: "Designation", img: "/images/team7.jpg" },
  { name: "Name Surname", role: "Designation", img: "/images/team8.jpg" },
];

const AboutUs = () => {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <div className="about-hero">
        <h1>Our Vision</h1>
        <p>
          &quot;To revolutionize the real estate industry by delivering high-quality
          and innovative solutions.&quot;
        </p>
      </div>

      {/* Our Story */}
      <section className="our-story">
        <div className="story-text">
          <h2>Our Story</h2>
          <p>
            Barods Global Limited is a leading real estate company specializing
            in property sales, rentals, and management. Founded on strong values
            and integrity, we provide seamless property solutions.
          </p>
          <p>
            Over the years, we have successfully completed several projects,
            providing clients with exceptional properties across various
            categories.
          </p>
        </div>
        <div className="story-images">
          <img src="/images/founder.jpg" alt="Founder" />
          <img src="/images/team-work.jpg" alt="Teamwork" />
          <img src="/images/office.jpg" alt="Office" />
        </div>
      </section>

      {/* Our Values */}
      <section className="our-values">
        <h2>Our Values</h2>
        <p>
          We are committed to excellence, innovation, and customer satisfaction.
        </p>
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
