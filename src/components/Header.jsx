/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaAngleDown, FaSignOutAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
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

  // Check if the user is logged in by looking for the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear the token and update the state
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    setProfileOpen(false);
    setMenuOpen(false);

    // Show a success notification
    toast.success("You have been logged out successfully!");
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setServicesOpen(false);
    setAboutUsOpen(false);
    setProfileOpen(false);
  };

  const handleNavItemClick = () => {
    closeAllMenus();
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

  // Navigation items shared between desktop and mobile
  const navigationItems = [
    { to: "/buy", label: "Buy" },
    { to: "/rent", label: "Rent" }
  ];

  const serviceItems = [
    { to: "/Architectural", label: "Architectural Designs" },
    { to: "/services/Construction", label: "Construction Projects" }
  ];

  const aboutUsItems = [
    { to: "/about", label: "Who we Are!" },
    { to: "/Event", label: "Events And Gallery" },
    { to: "/about/foundation", label: "Barods Empowerment Foundation" }
  ];

  const profileItems = isLoggedIn ? [
    { to: "/profile", label: "My Profile" },
    { to: "/favorites", label: "Saved Properties" },
    { to: "/appointments", label: "My Appointments" },
    { to: "/settings", label: "Account Settings" }
  ] : [];

  return (
    <header className="header">
      <ToastContainer /> {/* Add ToastContainer for notifications */}
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <Link to="/" onClick={handleNavItemClick}>
              <img src="/images/barods-logo.png" alt="Barods Global Limited" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="main-nav">
            {navigationItems.map((item, index) => (
              <NavItem 
                key={`nav-${index}`} 
                to={item.to} 
                label={item.label} 
                onClick={handleNavItemClick}
              />
            ))}

            {/* Services Dropdown */}
            <div className="dropdown" ref={servicesRef}>
              <button
                className="dropdown-toggle"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>Services</span>
                <FaAngleDown className={servicesOpen ? "rotate" : ""} />
              </button>

              {servicesOpen && (
                <div className="dropdown-menu">
                  {serviceItems.map((item, index) => (
                    <NavItem
                      key={`service-${index}`}
                      to={item.to}
                      label={item.label}
                      dropdown
                      onClick={handleNavItemClick}
                    />
                  ))}
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
                <FaAngleDown className={aboutUsOpen ? "rotate" : ""} />
              </button>

              {aboutUsOpen && (
                <div className="dropdown-menu">
                  {aboutUsItems.map((item, index) => (
                    <NavItem
                      key={`about-${index}`}
                      to={item.to}
                      label={item.label}
                      dropdown
                      onClick={handleNavItemClick}
                    />
                  ))}
                </div>
              )}
            </div>

            <NavItem to="/agents" label="Agents" onClick={handleNavItemClick} />
            <NavItem to="/blog" label="Blog" onClick={handleNavItemClick} />
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
                    {profileItems.map((item, index) => (
                      <NavItem
                        key={`profile-${index}`}
                        to={item.to}
                        label={item.label}
                        dropdown
                        onClick={handleNavItemClick}
                      />
                    ))}
                    <button className="logout-btn" onClick={handleLogout}>
                      <FaSignOutAlt />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-icon" onClick={handleNavItemClick}>
                Login
              </Link>
            )}

            <Link to="/contactus" className="contact-btn" onClick={handleNavItemClick}>
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
            {navigationItems.map((item, index) => (
              <MobileNavItem 
                key={`mobile-nav-${index}`} 
                to={item.to} 
                label={item.label} 
                onClick={handleNavItemClick}
              />
            ))}

            {/* Mobile Services Dropdown */}
            <div className="mobile-dropdown">
              <button
                className="mobile-dropdown-toggle"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                <span>Services</span>
                <FaAngleDown className={servicesOpen ? "rotate" : ""} />
              </button>

              {servicesOpen && (
                <div className="mobile-dropdown-menu">
                  {serviceItems.map((item, index) => (
                    <MobileNavItem
                      key={`mobile-service-${index}`}
                      to={item.to}
                      label={item.label}
                      onClick={handleNavItemClick}
                    />
                  ))}
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
                <FaAngleDown className={aboutUsOpen ? "rotate" : ""} />
              </button>

              {aboutUsOpen && (
                <div className="mobile-dropdown-menu">
                  {aboutUsItems.map((item, index) => (
                    <MobileNavItem
                      key={`mobile-about-${index}`}
                      to={item.to}
                      label={item.label}
                      onClick={handleNavItemClick}
                    />
                  ))}
                </div>
              )}
            </div>

            <MobileNavItem to="/agents" label="Agents" onClick={handleNavItemClick} />
            <MobileNavItem to="/blog" label="Blog" onClick={handleNavItemClick} />

            <div className="mobile-auth">
              {isLoggedIn ? (
                <>
                  {profileItems.map((item, index) => (
                    <MobileNavItem
                      key={`mobile-profile-${index}`}
                      to={item.to}
                      label={item.label}
                      onClick={handleNavItemClick}
                    />
                  ))}
                  <button
                    className="mobile-logout-btn"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <MobileNavItem to="/login" label="Login" onClick={handleNavItemClick} />
              )}

              <Link to="/contactus" className="mobile-contact-btn" onClick={handleNavItemClick}>
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
const NavItem = ({ to, label, dropdown = false, onClick }) => (
  <Link 
    to={to} 
    className={dropdown ? "dropdown-item" : "nav-item"}
    onClick={onClick}
  >
    {label}
  </Link>
);

// Mobile navigation item component
const MobileNavItem = ({ to, label, onClick }) => (
  <Link 
    to={to} 
    className="mobile-nav-item"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Header;