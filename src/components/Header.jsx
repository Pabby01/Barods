/* eslint-disable no-unused-vars */
// components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <img className="logo" src="/images/barods-logo.png" alt="My Image" />

      <nav>
        <ul>
          <li><Link to="/buy">Buy</Link></li>
          <li><Link to="/rent">Rent</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/agents">Agents</Link></li>
          <li><Link to="/blog">Blog</Link></li>
        </ul>
      </nav>
      <div className="auth-buttons">
        <button className="login">Log In</button>
        <button className="contact">Contact Us</button>
      </div>
    </header>
  );
};

export default Header;