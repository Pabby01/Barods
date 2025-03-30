/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Header from "../components/Header";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="page-container">
      <Header />
      
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="overlay"></div>
        <img 
          src="/images/Hero.png" 
          alt="Building with balconies" 
          className="banner-image"
        />
        <div className="banner-content">
          <h1>Privacy Policy</h1>
          <p>Home / Privacy Policy</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-container">
          <section className="policy-section">
            <h3>Introduction</h3>
            <p>
              Welcome to Bardos Global Limited. Your privacy is important to us. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you visit our website, use our services, or interact with us.
            </p>
            <p>
              By accessing or using our website and services, you agree to the terms outlined in this Privacy Policy. If you do not 
              agree, please refrain from using our website and services.
            </p>
          </section>

          <section className="policy-section">
            <h3>Information We Collect</h3>
            <p>
              To enhance your experience while using our Service, we may ask you to provide certain personally identifiable 
              information, such as your name, address, location, and pictures. The information we collect will be used and stored in 
              accordance with this privacy policy.
            </p>
            <p>
              We use the collected information to provide, operate, and improve our real estate services. It helps us process 
              transactions, manage customer relationships, and communicate with you regarding inquiries, property listings, and 
              promotional offers. Additionally, we may need to process your data to comply with legal obligations, prevent activities, 
              and enhance the functionality and security of our website.
            </p>
            <p>
              We do not sell or rent your personal information. However, we may share your data with third-party service providers 
              who assist with property listings, payments, marketing, or IT support. Additionally, we may disclose your information to 
              law enforcement or government if your data is subject to legal obligations, legal disputes, security investigations. Finally, 
              your data may also be transferred as part of the business transaction.
            </p>
          </section>

          <section className="policy-section">
            <h3>Data Security</h3>
            <p>
              We implement security measures to protect your information from unauthorized access, alteration, or loss. However, 
              no method of transmission over the internet is 100% secure. We advise users to take precautions when sharing 
              sensitive information online.
            </p>
          </section>

          <section className="policy-section">
            <h3>Cookies and Tracking Technologies</h3>
            <p>
              Our website uses cookies and tracking technologies to improve user experience. You may manage or disable cookies 
              through your browser settings. However, this may affect website functionality.
            </p>
          </section>

          <section className="policy-section">
            <h3>Your Rights and Choices</h3>
            <p>
              Depending on your location, you may have the following rights regarding your data:
            </p>
            <ul className="rights-list">
              <li><strong>Access & Correction:</strong> You can request access to your personal data and correct inaccuracies.</li>
              <li><strong>Opt-Out:</strong> You can opt out of marketing emails and promotional communications.</li>
              <li><strong>Data Deletion:</strong> You can request the deletion of your personal data, subject to legal obligations.</li>
            </ul>
            <p>
              To exercise these rights, please contact us at [your contact email].
            </p>
          </section>

          <section className="policy-section">
            <h3>Third-Party Links</h3>
            <p>
              Our website may contain links to third-party websites. We are not responsible for their privacy practices and encourage 
              you to review their privacy policies.
            </p>
          </section>

          <section className="policy-section">
            <h3>Changes to This Privacy Policy</h3>
            <p>
              We may update this policy from time to time. Any changes will be posted on this page with an updated date. Your 
              continued use of our website after changes indicate acceptance of the revised policy.
            </p>
            <p>
              By using our website and services, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </section>
        </div>
      </div>

      
    </div>
  );
};

export default PrivacyPolicy;