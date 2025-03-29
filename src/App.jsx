/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";  // Import Header
import Footer from "./components/Footer";  // Import Footer
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import LoginRegisterModal from "./pages/ LoginRegisterModal";
import BlogPage from "./pages/Blog";
import "./styles/global.css";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Properties from "./pages/pro-buy";
import Properties2 from "./pages/pro-rent";
import AgentsPage from "./pages/Agentspage"; 
import AgentDetailPage from "./pages/Agent-Details";
import FAQPage from "./pages/FAQ";
import PropertyView from "./pages/properties-Detail";
import BlogDetailPage from "./pages/Blogdetailpage";
import EventsGallery from "./pages/Event";
import ArchitecturalLandingPage from "./pages/Architect"; // Import the new page

const App = () => {
  return (
    <Router>
      <Header /> {/* Persistent Header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/Event" element={<EventsGallery />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<LoginRegisterModal />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog-ID" element={<BlogDetailPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/buy" element={<Properties />} />
        <Route path="/rent" element={<Properties2 />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/agent-ID" element={<AgentDetailPage />} />
        <Route path="/property-ID" element={<PropertyView />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/Architectural" element={<ArchitecturalLandingPage />} />
      </Routes>
      <Footer /> {/* Persistent Footer */}
    </Router>
  );
};

export default App;
