/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; // Removed useLocation
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
import ArchitecturalLandingPage from "./pages/Architect"; 
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import CreatePassword from './components/CreatePassword';
import Dashboard from './pages/Agent-dashboard'; // Assuming you have a Dashboard component
import Properties3 from './pages/Agent-properties'
import AccountPage from './pages/Agent-account'; // Assuming you have an AccountPage component
import Register from './components/Register'; // Assuming you have a Register component

const App = () => {
  return (
    <Router>
      <AppContent /> {/* Move the logic into a child component */}
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation(); // Now useLocation is inside the Router context

  // Define routes where Header and Footer should not be displayed
  const noHeaderFooterRoutes = ["/dashboard", "/properties3", "/become-agent","/forgot-password","/account", "/register"];

  const shouldShowHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeaderFooter && <Header />} {/* Render Header conditionally */}
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
        <Route path="/become-agent" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<CreatePassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/properties3" element={<Properties3 />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/register" element={<Register />} /> {/* Added Register route */}
      </Routes>
      {shouldShowHeaderFooter && <Footer />} {/* Render Footer conditionally */}
    </>
  );
};

export default App;
