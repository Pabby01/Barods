/* eslint-disable no-unused-vars */
import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section */}
        <div className="footer-left">
          <img src="/images/logo.png" alt="Barods Global" className="footer-logo" />
          <p className="footer-address">
            Abeokuta Address: B104, Providence Mall, after OOPL entrance, Leme, Abeokuta, Ogun State.
          </p>
          <p className="footer-address">
            Ibadan Address: 140, Fajuyi road, Adamasingba, Mokola, Ibadan, Oyo State.
          </p>
          <div className="social-icons">
            <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
        </div>

        {/* Right Section */}
        <div className="footer-right">
          <div className="footer-links">
            <div>
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Partners</a></li>
              </ul>
              <p className="foot">&copy; Barods Global - All rights reserved</p>
            </div>
            <div>
              <h4>Our Information</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms & Condition</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Help Center</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-cta">
            <h4>Are you a Realtor?</h4>
            <button className="cta-btn">
              Become an Agent <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
