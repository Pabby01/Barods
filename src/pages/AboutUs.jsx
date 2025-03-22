/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import "../styles/about.css";

const teamMembers = [
  { name: "Batosandeko Denton", role: "CEO", img: "/images/team-1.png" },
  { name: "James Smith", role: "CFO", img: "/images/team-2.png" },
  { name: "Sarah Johnson", role: "Property Manager", img: "/images/team-3.png" },
  { name: "Michael Brown", role: "Sales Director", img: "/images/team-4.png" },
  { name: "Jennifer Davis", role: "Marketing Manager", img: "/images/team-5.png" },
  { name: "Robert Wilson", role: "Legal Advisor", img: "/images/team-6.png" },
  { name: "Elizabeth Miller", role: "Customer Relations", img: "/images/team-7.png" },
  { name: "David Taylor", role: "Property Analyst", img: "/images/team-8.png" },
];

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <div className="hero-section relative w-full h-64 bg-gray-800 mt-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img 
          src="/images/team-group.jpg" 
          alt="Team banner" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Vision</h1>
          <p className="text-lg md:text-xl max-w-3xl">"To revolutionize the real estate industry by delivering high-quality and innovative solutions."</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white py-12 px-4 md:px-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          
          {/* Our Story Section */}
          <section className="story-section mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="story-text">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Barods Global Limited is a leading real estate company 
                  specializing in property sales, rentals, and management.
                  Founded on strong values and integrity, we provide seamless property solutions.
                </p>
                <p className="text-gray-600 mb-4">
                  The journey began when two friends with a passion for real estate
                  recognized the need for a more personal approach to property transactions.
                  Since then, we've grown to become one of the region's most trusted names 
                  in real estate.
                </p>
                <p className="text-gray-600">
                  Over the years, we have successfully completed several projects, 
                  providing clients with exceptional properties across various categories.
                  Our company's growth reflects our commitment to excellence and customer satisfaction.
                </p>
              </div>
              
              <div className="story-images grid grid-cols-2 gap-4">
                <img 
                  src="/images/team-lead.png" 
                  alt="CEO Portrait" 
                  className="col-span-1 row-span-1 w-full h-full object-cover rounded-md shadow"
                />
                <div className="col-span-1 space-y-4">
                  <img 
                    src="/images/team-ladies.png" 
                    alt="Team meeting" 
                    className="w-full h-48 object-cover rounded-md shadow"
                  />
                  <img 
                    src="/images/barods-team2.png" 
                    alt="Office meeting" 
                    className="w-full h-48 object-cover rounded-md shadow"
                  />
                </div>
              </div>
            </div>
          </section>
          
          {/* Our Values Section */}
          <section className="values-section mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="values-text order-2 lg:order-1">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
                <p className="text-gray-600 mb-4">
                  We are committed to excellence, innovation, and customer satisfaction. 
                  Our company operates with integrity and a customer-centric approach 
                  to ensure that every client receives the best service.
                </p>
                <p className="text-gray-600">
                  At Barods Global Limited, we pride ourselves in our attention to detail and 
                  our ability to understand exactly what our clients need. We work tirelessly to 
                  match people with properties that fulfill both their practical requirements and 
                  emotional desires.
                </p>
              </div>
              
              <div className="values-image order-1 lg:order-2">
                <img 
                  src="/images/team-collaboration.jpg" 
                  alt="Team Collaboration" 
                  className="w-full h-auto rounded-md shadow"
                />
              </div>
            </div>
          </section>
          
          {/* Meet Our Team Section */}
          <section className="team-section mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Meet Our Team</h2>
              <p className="text-gray-600">Meet the professionals behind our success who are dedicated to providing exceptional service.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-member bg-white rounded-lg shadow-sm overflow-hidden text-center">
                  <img 
                    src={member.img} 
                    alt={member.name} 
                    className="w-full h-52 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">{member.name}</h3>
                    <p className="text-green-600 text-sm">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Logo and Address */}
            <div className="bg-green-700 p-6 rounded-lg">
              <div className="mb-4">
                <img 
                  src="/images/bardos-footer-logo.png" 
                  alt="Bardos Global Limited" 
                  className="h-16"
                />
              </div>
              <address className="not-italic text-sm text-white mb-4">
                <p>Aberdare Gardens 87B, Providence Mall, First CCTV</p>
                <p>Ebimpe, Lekki, Adjamé, Agbogbloshie</p>
              </address>
              <div className="flex space-x-3 mt-2">
                <a href="#" className="text-white hover:text-green-400 bg-green-800 rounded-full p-2">
                  <FaFacebook size={18} />
                </a>
                <a href="#" className="text-white hover:text-green-400 bg-green-800 rounded-full p-2">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="text-white hover:text-green-400 bg-green-800 rounded-full p-2">
                  <FaInstagram size={18} />
                </a>
                <a href="#" className="text-white hover:text-green-400 bg-green-800 rounded-full p-2">
                  <FaLinkedin size={18} />
                </a>
                <a href="#" className="text-white hover:text-green-400 bg-green-800 rounded-full p-2">
                  <FaYoutube size={18} />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-green-100 p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-800 text-sm font-medium mb-1">Name</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-gray-800 text-sm font-medium mb-1">Email</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-800 text-sm font-medium mb-1">Your Message</label>
                <textarea rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md"></textarea>
              </div>
              <div className="text-right">
                <button className="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;