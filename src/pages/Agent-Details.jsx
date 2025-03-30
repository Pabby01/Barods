/* eslint-disable no-unused-vars */
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './AgentDetailPage.css';

const AgentDetailPage = () => {
  const { id } = useParams();
  
  // Sample agent data - replace with your actual data
  const agent = {
    id: id,
    name: 'Michael Smith',
    position: 'Real Estate Agent',
    email: 'mail@example.com',
    phone: '+123 456 7890',
    image: '/images/team-1.png'
  };
  
  // Sample properties data - replace with your actual data
  const properties = [
    {
      id: 1,
      title: 'Detached Family Home',
      location: 'Lagos',
      price: '₦12,000,000',
      beds: 4,
      baths: 3,
      area: '250 sqm',
      image: '/images/Recent-1.png'
    },
    {
      id: 2,
      title: 'Modern Villa',
      location: 'Abuja',
      price: '₦12,000,000',
      beds: 5,
      baths: 4,
      area: '300 sqm',
      image: '/images/Recent-2.png'
    },
    {
      id: 3,
      title: 'Neolife Cottage',
      location: 'Lagos',
      price: '₦12,000,000',
      beds: 3,
      baths: 2,
      area: '180 sqm',
      image: '/images/Recent-3.png'
    },
    {
      id: 4,
      title: 'Lagesville Family Home',
      location: 'Lagos',
      price: '₦12,000,000',
      beds: 4,
      baths: 3,
      area: '220 sqm',
      image: '/images/Recent-1.png'
    },
    {
      id: 5,
      title: 'Modern Estate Villa',
      location: 'Abuja',
      price: '₦12,000,000',
      beds: 5,
      baths: 4,
      area: '320 sqm',
      image: '/images/Recent-2.png'
    },
    {
      id: 6,
      title: 'Neolife Cottage',
      location: 'Port Harcourt',
      price: '₦12,000,000',
      beds: 3,
      baths: 2,
      area: '190 sqm',
      image: '/images/Recent-3.png'
    },
  ];
  
  // Get current date for the timestamp
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long' }) + ' | ' + 
                        today.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: '2-digit' });

  return (
    <div className="agent-detail-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background" style={{ backgroundImage: 'url(/hero-background.jpg)' }}>
          <div className="hero-container">
            <h1 className="hero-title">Agents</h1>
          </div>
        </div>
      </div>
      
      <div className="container">
        {/* Agent Information */}
        <div className="agent-profile-section">
          <div className="agent-sidebar">
            <div className="agent-profile-card">
              <img 
                src={agent.image} 
                alt={agent.name} 
                className="agent-profile-image"
              />
              <div className="agent-profile-info">
                <h3 className="agent-profile-name">{agent.name}</h3>
                <p className="agent-profile-position">{agent.position}</p>
                <p className="agent-profile-contact">Phone: {agent.phone}</p>
                <p className="agent-profile-contact">Mail: {agent.email}</p>
                <div className="agent-contact-buttons">
                  <button className="email-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a className='hold' href="mailto:">Send Email</a>
                  </button>
                  <button className="call-button">
                    <svg xmlns="http://www.w3.org/2000/svg" className="button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                   <a className='hold' href="tel:+2349020250260">Call Agent</a> 
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="agent-listings-section">
            <h3 className="listings-title">Listings</h3>
            
            {/* Date Display */}
            <div className="date-display">{formattedDate}</div>
          </div>
        </div>
        
        {/* Properties Grid */}
        <div className="properties-grid">
          {properties.map(property => (
            <div key={property.id} className="property-card">
              <div className="property-image-container">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="property-image"
                />
                <div className="property-badge">
                  For Sale
                </div>
              </div>
              <div className="property-info">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-location">{property.location}</p>
                <div className="property-details">
                  <div className="property-specs">
                    <span className="property-spec">{property.beds} Beds</span>
                    <span className="property-spec">{property.baths} Baths</span>
                    <span className="property-spec">{property.area}</span>
                  </div>
                </div>
                <div className="property-footer">
                  <div className="property-price5">
                    {property.price}
                  </div>
                  <Link
                  to={`/property-ID`}
                  className="details-button"
                >
                  See Details
                </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentDetailPage;