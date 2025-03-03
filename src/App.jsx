/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";  // Import Header
import Footer from "./components/Footer";  // Import Footer
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import LoginRegisterModal from "./pages/ LoginRegisterModal";
import "./styles/global.css";

const App = () => {
  return (
    <Router>
      <Header /> {/* Persistent Header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/loginregistermodal" element={<LoginRegisterModal />} />
      </Routes>
      <Footer /> {/* Persistent Footer */}
    </Router>
  );
};

export default App;
