/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import './AgentsPage.css';

const AgentsPage = () => {
  // Sample agent data - replace with your actual data
  const agents = [
    {
      id: 1,
      name: 'Name Surname',
      position: 'Real Estate Agent',
      email: 'mail@example.com',
      phone: '+123 456 7890',
      image: '/images/team-1.png'
    },
    {
      id: 2,
      name: 'Name Surname',
      position: 'Real Estate Agent',
      email: 'mail@example.com',
      phone: '+123 456 7890',
      image: '/images/team-1.png'
    },
    {
      id: 3,
      name: 'Name Surname',
      position: 'Real Estate Agent',
      email: 'mail@example.com',
      phone: '+123 456 7890',
      image: '/images/team-1.png'
    },
    {
      id: 4,
      name: 'Name Surname',
      position: 'Real Estate Agent',
      email: 'mail@example.com',
      phone: '+123 456 7890',
      image: '/images/team-1.png'
    },
    {
      id: 5,
      name: 'Name Surname',
      position: 'Real Estate Agent',
      email: 'mail@example.com',
      phone: '+123 456 7890',
      image: '/images/team-1.png'
    },
    {
      id: 6,
      name: 'Name Surname',
      position: 'Real Estate Agent',
      email: 'mail@example.com',
      phone: '+123 456 7890',
      image: '/images/team-1.png'
    },
    {
      id: 7,
      name: 'Name Surname',
      position: 'Real Estate Agent',
      email: 'mail@example.com',
      phone: '+123 456 7890',
      image: '/images/team-1.png'
    },
    {
      id: 8,
      name: 'Name Surname',
      position: 'Real Estate Agent',
      email: 'mail@example.com',
      phone: '+123 456 7890',
      image: '/images/team-1.png'
    },
    {
      id: 9,
      name: 'Name Surname',
      position: 'Real Estate Agent',
      email: 'mail@example.com',
      phone: '+123 456 7890',
      image: '/images/team-1.png'
    },
  ];
  
  // Get current date for the timestamp
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { weekday: 'long' }) + ' | ' +
                        today.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' });

  return (
    <div className="agents-page">
      {/* Hero Section */}
      <div className="hero-section">
        <h3>Agents</h3>
      </div>
      <div className="container">
        <h1 className="section-title">Meet Our Agents</h1>
        <h3 className='Hold'>Home/Agents</h3>
        
        {/* Date Display */}
        <div className="date-display">{formattedDate}</div>
        
        {/* Agents Grid */}
        <div className="agents-grid">
          {agents.map(agent => (
            <div key={agent.id} className="agent-card">
              <div className="agent-image-container">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="agent-image"
                />
              </div>
              <div className="agent-info">
                <h3 className="agent-name">{agent.name}</h3>
                <div className="agent-details">
                  <div className="agent-position">
                    <p>{agent.position}</p>
                  </div>
                  <div className="agent-contact">
                    <div className="contact-item">
                      <span className="contact-label">Phone:</span>
                      <span className="contact-value">{agent.phone}</span>
                    </div>
                    <div className="contact-item">
                      <span className="contact-label">Mail:</span> 
                     <a className='Hold' href="mailto:adeolalasisi6@gmail.com"> <span className="contact-value">{agent.email}</span></a> 
                    </div>
                  </div>
                </div>
                <Link
                  to={`/agent-ID`}
                  className="view-profile-button"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentsPage;