/* eslint-disable no-unused-vars */
import React from "react";
import "./Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faTiktok, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Desktop Layout */}
        <div className="desktop-layout">
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
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://x.com/Barodsglobal?t=IgWHc54vNM0uL2lDPFT9_w&s=09" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://www.instagram.com/barodsglobal?igsh=MXY4dmNnaXNmM3hwbg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.tiktok.com/@barodsglobal?_t=ZM-8v0H7x31v4X&_r=1" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </div>
          </div>

          {/* Right Section */}
          <div className="footer-right">
            <div className="footer-links">
              <div className="link-column">
                <h4>Company</h4>
                <ul>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/contactus">Contact</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/partners">Partners</Link></li>
                </ul>
              </div>
              <div className="link-column">
                <h4>Our Information</h4>
                <ul>
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link to="/terms">Terms & Condition</Link></li>
                  <li><Link to="/faq">FAQ</Link></li>
                  <li><Link to="/help">Help Center</Link></li>
                </ul>
              </div>
            </div>
            <div className="footer-cta">
              <h4>Are you a Realtor?</h4>
              <Link to="/become-agent" className="cta-btn">
                Become an agent <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="mobile-layout">
          {/* Mobile Top Section (Logo & Social) */}
          <div className="mobile-top">
            <img src="/images/logo.png" alt="Barods Global" className="footer-logo" />
            <div className="address-section">
              <p className="footer-address">
                Abeokuta Address: B104, Providence Mall, after OOPL entrance, Leme, Abeokuta, Ogun State.
              </p>
              <p className="footer-address">
                Ibadan Address: 140, Fajuyi road, Adamasingba, Mokola, Ibadan, Oyo State.
              </p>
            </div>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://x.com/Barodsglobal?t=IgWHc54vNM0uL2lDPFT9_w&s=09" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://www.instagram.com/barodsglobal?igsh=MXY4dmNnaXNmM3hwbg==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.tiktok.com/@barodsglobal?_t=ZM-8v0H7x31v4X&_r=1" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </div>
          </div>

          {/* Mobile Bottom Section (Links) */}
          <div className="mobile-bottom">
            <div className="mobile-links">
              <div className="link-column">
                <h4>Company</h4>
                <ul>
                  <li><Link to="/about-us">About Us</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                  <li><Link to="/blog">Blog</Link></li>
                  <li><Link to="/partners">Partners</Link></li>
                </ul>
              </div>
              <div className="link-column">
                <h4>Our Information</h4>
                <ul>
                  <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                  <li><Link to="/terms">Terms & Condition</Link></li>
                  <li><Link to="/faq">FAQ</Link></li>
                  <li><Link to="/help">Help Center</Link></li>
                </ul>
              </div>
            </div>
            <div className="mobile-cta">
              <h4>Are you a Realtor?</h4>
              <Link to="/become-agent" className="cta-btn">
                Become an agent <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
            <p className="copyright">&copy; Barods Global - All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;