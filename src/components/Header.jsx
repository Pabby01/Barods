/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaAngleDown, FaSignOutAlt } from "react-icons/fa";
import "../styles/header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [aboutUsOpen, setAboutUsOpen] = useState(false);
  
  const menuRef = useRef(null);
  const profileRef = useRef(null);
  const servicesRef = useRef(null);
  const aboutUsRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userToken');
    setProfileOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
      if (aboutUsRef.current && !aboutUsRef.current.contains(event.target)) {
        setAboutUsOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Link to="/">
              <img src="/images/barods-logo.png" alt="Barods Global Limited" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="main-nav">
            <NavItem to="/buy" label="Buy" />
            <NavItem to="/rent" label="Rent" />
            
            {/* Services Dropdown */}
            <div className="dropdown" ref={servicesRef}>
              <button 
                className="dropdown-toggle"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>Services</span>
                <FaAngleDown className={servicesOpen ? 'rotate' : ''} />
              </button>
              
              {servicesOpen && (
                <div className="dropdown-menu">
                  <NavItem to="/services/Architectural" label="Architechtural Designs" dropdown />
                  <NavItem to="/services/Construction" label="Construction Projects" dropdown />
                  
                </div>
              )}
            </div>
            
            {/* About Us Dropdown */}
            <div className="dropdown" ref={aboutUsRef}>
              <button 
                className="dropdown-toggle"
                onClick={() => setAboutUsOpen(!aboutUsOpen)}
              >
                <span>About Us</span>
                <FaAngleDown className={aboutUsOpen ? 'rotate' : ''} />
              </button>
              
              {aboutUsOpen && (
                <div className="dropdown-menu">
                  <NavItem to="/about" label="Who we Are!" dropdown />
                  <NavItem to="/Event" label="Events And Gallery" dropdown />
                  <NavItem to="/about/foundation" label="Barods Empowerment foundation" dropdown />
                </div>
              )}
            </div>
            
            <NavItem to="/agents" label="Agents" />
            <NavItem to="/blog" label="Blog" />
          </nav>

          {/* User Profile/Authentication */}
          <div className="auth-section">
            {isLoggedIn ? (
              <div className="profile-dropdown" ref={profileRef}>
                <button 
                  className="profile-toggle"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <FaUserCircle size={22} />
                </button>
                
                {profileOpen && (
                  <div className="dropdown-menu profile-menu">
                    <NavItem to="/profile" label="My Profile" dropdown />
                    <NavItem to="/favorites" label="Saved Properties" dropdown />
                    <NavItem to="/appointments" label="My Appointments" dropdown />
                    <NavItem to="/settings" label="Account Settings" dropdown />
                    <button 
                      className="logout-btn"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-icon">
                Login
              </Link>
            )}
            
            <Link to="/contactus" className="contact-btn">
              Contact Us
            </Link>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <button 
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu" ref={menuRef}>
          <div className="mobile-menu-content">
            <MobileNavItem to="/buy" label="Buy" />
            <MobileNavItem to="/rent" label="Rent" />
            
            {/* Mobile Services Dropdown */}
            <div className="mobile-dropdown">
              <button 
                className="mobile-dropdown-toggle"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>Services</span>
                <FaAngleDown className={servicesOpen ? 'rotate' : ''} />
              </button>
              
              {servicesOpen && (
                <div className="mobile-dropdown-menu">
                  <MobileNavItem to="/services/property-management" label="Property Management" />
                  <MobileNavItem to="/services/valuation" label="Valuation" />
                  <MobileNavItem to="/services/consulting" label="Consulting" />
                </div>
              )}
            </div>
            
            {/* Mobile About Us Dropdown */}
            <div className="mobile-dropdown">
              <button 
                className="mobile-dropdown-toggle"
                onClick={() => setAboutUsOpen(!aboutUsOpen)}
              >
                <span>About Us</span>
                <FaAngleDown className={aboutUsOpen ? 'rotate' : ''} />
              </button>
              
              {aboutUsOpen && (
                <div className="mobile-dropdown-menu">
                  <NavItem to="/about" label="Who we Are!" />
                  <MobileNavItem to="/Event" label="Events and Gallery" />
                  <MobileNavItem to="/about/testimonials" label="Testimonials" />
                </div>
              )}
            </div>
            
            <MobileNavItem to="/agents" label="Agents" />
            <MobileNavItem to="/blog" label="Blog" />
            
            <div className="mobile-auth">
              {isLoggedIn ? (
                <>
                  <MobileNavItem to="/profile" label="My Profile" />
                  <MobileNavItem to="/favorites" label="Saved Properties" />
                  <MobileNavItem to="/appointments" label="My Appointments" />
                  <MobileNavItem to="/settings" label="Account Settings" />
                  <button 
                    className="mobile-logout-btn"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <MobileNavItem to="/login" label="Login" />
              )}
              
              <Link to="/contactus" className="mobile-contact-btn">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

// Desktop navigation item component
const NavItem = ({ to, label, dropdown = false }) => (
  <Link 
    to={to} 
    className={dropdown ? 'dropdown-item' : 'nav-item'}
  >
    {label}
  </Link>
);

// Mobile navigation item component
const MobileNavItem = ({ to, label }) => (
  <Link 
    to={to} 
    className="mobile-nav-item"
  >
    {label}
  </Link>
);

export default Header;