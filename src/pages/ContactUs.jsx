/* eslint-disable no-unused-vars */
import React from "react";
import "../styles/contact.css";


const ContactUs = () => {
  return (
    <div className="contact-container">
      {/* Hero Section */}
      <div className="contact-hero">
        <h1>Contact</h1>
        <p>Home &gt; <span className="highlight">Contact</span></p>
      </div>

      <div className="contact-content">
        {/* Contact Info Box */}
        <div className="contact-info">
          <h2>Our Contact Information</h2>
          <p>Need to talk to someone? Kindly reach out via our communication channels.</p>

          <h3>Address</h3>
          <p>Suite B104, Providence Mall, Opposite Globus Bank, Leme Abeokuta Way, Abeokuta.</p>

          <h3>Contact</h3>
          <p>Phone: +2348022888806</p>
          <p>Email: support@barodsglobal.com</p>

          {/* Social Links */}
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>

          <button className="message-btn">Send a Message</button>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h2>Get in Touch</h2>
          <p>Your email address will not be published. Required fields are marked *</p>

          <form>
            <div className="form-group">
              <input type="text" placeholder="Name *" required />
              <input type="email" placeholder="Email *" required />
            </div>
            <input type="tel" placeholder="Phone No *" required />
            <input type="text" placeholder="Subject *" required />
            <textarea placeholder="Your Message *" rows="5" required></textarea>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default ContactUs;
