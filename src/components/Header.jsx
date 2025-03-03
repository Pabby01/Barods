/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // User profile icon
import "../styles/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated authentication state
  const [profileOpen, setProfileOpen] = useState(false); // Profile dropdown state

  return (
    <header className="header">
      {/* Logo */}
      <Link to="/">
        <img className="logo" src="/images/barods-logo.png" alt="Barods Global Logo" />
      </Link>

      {/* Hamburger Menu (Mobile) */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul className={menuOpen ? "active" : ""}>
          <li><Link to="/buy">Buy</Link></li>
          <li><Link to="/rent">Rent</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/aboutus">About Us</Link></li> {/* Fixed to match AboutUs.jsx */}
          <li><Link to="/contactus">Contact Us</Link></li> {/* Fixed to match ContactUs.jsx */}
          <li><Link to="/agents">Agents</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </nav>

      {/* Authentication Buttons / User Profile */}
      <div className="auth-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/loginregistermodal"> {/* Fixed to match LoginRegisterModal.jsx */}
              <button className="login">Log In</button>
            </Link>
            <Link to="/ContactUs"> {/* Fixed to match ContactUs.jsx */}
              <button className="contact">Contact Us</button>
            </Link>
          </>
        ) : (
          <div className="profile-icon" onClick={() => setProfileOpen(!profileOpen)}>
            <FaUserCircle size={30} />
            {profileOpen && (
              <div className="profile-dropdown">
                <Link to="/profile">Profile</Link>
                <button onClick={() => setIsLoggedIn(false)}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
