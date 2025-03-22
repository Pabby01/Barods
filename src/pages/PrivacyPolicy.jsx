/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import Header from "../components/Header";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <div className="relative w-full h-64 bg-gray-800 mt-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <img 
          src="/images/privacy-banner.jpg" 
          alt="Building with balconies" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-3xl md:text-4xl font-semibold mb-2">Privacy Policy</h1>
          <p className="text-sm">Home / Privacy Policy</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-100 py-8 px-4 md:px-8 flex-grow">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 shadow-sm">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Introduction</h2>
            <p className="mb-4">
              Welcome to Bardos Global Limited. Your privacy is important to us. This Privacy Policy explains how we collect, use, 
              disclose, and safeguard your information when you visit our website, use our services, or interact with us.
            </p>
            <p className="mb-4">
              By accessing or using our website and services, you agree to the terms outlined in this Privacy Policy. If you do not 
              agree, please refrain from using our website and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Information We Collect</h2>
            <p className="mb-4">
              To enhance your experience while using our Service, we may ask you to provide certain personally identifiable 
              information, such as your name, address, location, and pictures. The information we collect will be used and stored in 
              accordance with this privacy policy.
            </p>
            <p className="mb-4">
              We use the collected information to provide, operate, and improve our real estate services. It helps us process 
              transactions, manage customer relationships, and communicate with you regarding inquiries, property listings, and 
              promotional offers. Additionally, we may need to process your data to comply with legal obligations, prevent activities, 
              and enhance the functionality and security of our website.
            </p>
            <p className="mb-4">
              We do not sell or rent your personal information. However, we may share your data with third-party service providers 
              who assist with property listings, payments, marketing, or IT support. Additionally, we may disclose your information to 
              law enforcement or government if your data is subject to legal obligations, legal disputes, security investigations. Finally, 
              your data may also be transferred as part of the business transaction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Data Security</h2>
            <p className="mb-4">
              We implement security measures to protect your information from unauthorized access, alteration, or loss. However, 
              no method of transmission over the internet is 100% secure. We advise users to take precautions when sharing 
              sensitive information online.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              Our website uses cookies and tracking technologies to improve user experience. You may manage or disable cookies 
              through your browser settings. However, this may affect website functionality.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Your Rights and Choices</h2>
            <p className="mb-4">
              Depending on your location, you may have the following rights regarding your data:
            </p>
            <ul className="list-disc pl-8 mb-4 space-y-2">
              <li><strong>Access & Correction:</strong> You can request access to your personal data and correct inaccuracies.</li>
              <li><strong>Opt-Out:</strong> You can opt out of marketing emails and promotional communications.</li>
              <li><strong>Data Deletion:</strong> You can request the deletion of your personal data, subject to legal obligations.</li>
            </ul>
            <p className="mb-4">
              To exercise these rights, please contact us at [your contact email].
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Third-Party Links</h2>
            <p className="mb-4">
              Our website may contain links to third-party websites. We are not responsible for their privacy practices and encourage 
              you to review their privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update this policy from time to time. Any changes will be posted on this page with an updated date. Your 
              continued use of our website after changes indicate acceptance of the revised policy.
            </p>
            <p className="mb-4">
              By using our website and services, you acknowledge that you have read and understood this Privacy Policy.
            </p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Address */}
            <div className="flex flex-col">
              <div className="mb-4">
                <img 
                  src="/images/bardos-footer-logo.png" 
                  alt="Bardos Global Limited" 
                  className="h-16"
                />
              </div>
              <address className="not-italic text-sm text-gray-300 mb-4">
                <p>Aberdare Gardens 87B, Providence Mall, First CCTV</p>
                <p>Ebimpe, Lekki, Adjamé, Agbogbloshie</p>
                <p>Hidden Address: 146, Fajol road, Abeokuta, Ibehala, Jimeta - Yoe-Ayue</p>
              </address>
              <div className="flex space-x-3 mt-2">
                <a href="#" className="text-white hover:text-green-400 bg-green-700 rounded-full p-2">
                  <FaFacebook size={18} />
                </a>
                <a href="#" className="text-white hover:text-green-400 bg-green-700 rounded-full p-2">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="text-white hover:text-green-400 bg-green-700 rounded-full p-2">
                  <FaInstagram size={18} />
                </a>
                <a href="#" className="text-white hover:text-green-400 bg-green-700 rounded-full p-2">
                  <FaLinkedin size={18} />
                </a>
                <a href="#" className="text-white hover:text-green-400 bg-green-700 rounded-full p-2">
                  <FaYoutube size={18} />
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/about" className="hover:text-green-400">About Us</Link></li>
                <li><Link to="/agents" className="hover:text-green-400">Agents</Link></li>
                <li><Link to="/blog" className="hover:text-green-400">Blog</Link></li>
                <li><Link to="/services" className="hover:text-green-400">Services</Link></li>
              </ul>
            </div>

            {/* Our Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Our Information</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/privacy-policy" className="hover:text-green-400">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions" className="hover:text-green-400">Terms & Conditions</Link></li>
                <li><Link to="/faq" className="hover:text-green-400">FAQ</Link></li>
                <li><Link to="/help-center" className="hover:text-green-400">Help Center</Link></li>
              </ul>
            </div>

            {/* Agent Prompt */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Are you a Realtor?</h3>
              <Link 
                to="/become-agent" 
                className="inline-block mt-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-300"
              >
                Become an agent →
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>© Bardos Global · All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;