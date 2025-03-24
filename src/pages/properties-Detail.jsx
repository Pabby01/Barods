/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';
import './PropertyView.css';

const PropertyView = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    subject: 'General Enquiries',
    message: `Hello, I am interested in Diamond Family Home, 374, Herbert Macaulay Road, Yaba Lagos, and would love to make further enquiries.`
  });

  // Sample property data (you would fetch this from your API)
  const sampleProperty = property || {
    id: 1,
    title: "Diamond Family Home",
    address: "374, Herbert Macaulay Road, Yaba Lagos",
    price: "₦12,000,000",
    agent: {
      name: "Jude Ogundare",
      phone: "08012345678",
      email: "jude@example.com",
      image: "/images/team-1.png"
    },
    beds: 4,
    baths: 3,
    area: "350 sqm",
    description: "This is a beautifully designed 4 bedroom semi-detached duplex in a serene environment. Perfect for a modern family, this property features spacious rooms, quality finishes, and is located in a secure estate with 24/7 security.",
    images: [
      "/images/Recent-1.png",
      "/images/Recent-2.png",
      "/images/Recent-3.png",
      "/images/ibadan.png"
    ],
    videoUrl: "/videos/web5.mp4",
    location: {
      latitude: 6.5095,
      longitude: 3.3711
    },
    features: [
      "24/7 Electricity", 
      "Swimming Pool", 
      "Security", 
      "Air Conditioning", 
      "Fully Fitted Kitchen", 
      "Parking Space"
    ],
    relatedProperties: [
      { id: 2, title: "Modern Villa", price: "₦15,000,000", image: "/images/Recent-1.png" },
      { id: 3, title: "Luxury Apartment", price: "₦9,500,000", image: "/images/Recent-1.png" },
      { id: 4, title: "Family Bungalow", price: "₦7,200,000", image: "/images/Recent-1.png" }
    ]
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? sampleProperty.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === sampleProperty.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const toggleVideoPlay = () => {
    setIsPlaying(!isPlaying);
    const video = document.getElementById('propertyVideo');
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  const handleOpenWhatsAppModal = () => {
    setShowWhatsAppModal(true);
    setShowEmailModal(false);
  };

  const handleOpenEmailModal = () => {
    setShowEmailModal(true);
    setShowWhatsAppModal(false);
  };

  const handleCloseModals = () => {
    setShowWhatsAppModal(false);
    setShowEmailModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    // Format phone number and message for WhatsApp API
    const phoneNumber = sampleProperty.agent.phone.replace(/\D/g, '');
    const message = encodeURIComponent(formData.message);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    handleCloseModals();
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    // Create mailto link with subject and body
    const subject = encodeURIComponent(formData.subject);
    const body = encodeURIComponent(formData.message);
    window.open(`mailto:${sampleProperty.agent.email}?subject=${subject}&body=${body}`, '_blank');
    handleCloseModals();
  };

  return (
    <div className="property-view-container">
      {/* Property Images Carousel */}
      <div className="property-carousel">
        <button className="carousel-button prev" onClick={handlePrevImage}>
          <FaChevronLeft />
        </button>
        <img 
          src={sampleProperty.images[currentImageIndex]} 
          alt={`${sampleProperty.title} - Image ${currentImageIndex + 1}`}
          className="carousel-image"
        />
        <button className="carousel-button next" onClick={handleNextImage}>
          <FaChevronRight />
        </button>
        <div className="carousel-indicators">
          {sampleProperty.images.map((_, index) => (
            <span 
              key={index} 
              className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Property Info Section */}
      <div className="property-info-section">
        <div className="property-prices">{sampleProperty.price}</div>
        <h1 className="property-title">{sampleProperty.title}</h1>
        <div className="property-address">
          <FaMapMarkerAlt /> {sampleProperty.address}
        </div>
        
        <div className="property-details">
          <div className="detail-item">
            <FaBed /> <span>{sampleProperty.beds} Beds</span>
          </div>
          <div className="detail-item">
            <FaBath /> <span>{sampleProperty.baths} Baths</span>
          </div>
          <div className="detail-item">
            <FaRulerCombined /> <span>{sampleProperty.area}</span>
          </div>
        </div>

        {/* Agent Info */}
        <div className="agent-info7">
          <img src={sampleProperty.agent.image} alt={sampleProperty.agent.name} className="agent-image" />
          <div className="agent-details7">
            <div className="agent-name7">{sampleProperty.agent.name}</div>
            <div className="agent-contact7">
              <button className="contact-button call" onClick={handleOpenWhatsAppModal}>
                <FaWhatsapp /> WhatsApp
              </button>
              <button className="contact-button email" onClick={handleOpenEmailModal}>
                <FaEnvelope /> Email
              </button>
            </div>
          </div>
        </div>

        {/* Schedule a Tour Section */}
        <div className="schedule-tour">
          <h3>Schedule a Tour</h3>
          <div className="tour-date-options">
            <button className="date-button">Today</button>
            <button className="date-button">Tomorrow</button>
            <button className="date-button">Fri, Mar 25</button>
          </div>
          <button className="schedule-button">Request a Tour</button>
        </div>

        {/* Description */}
        <div className="property-description">
          <h3>Description</h3>
          <p>{sampleProperty.description}</p>
        </div>

        {/* Property Video */}
        <div className="property-video-container">
          <h3>Property Video</h3>
          <div className="video-wrapper">
            <video 
              id="propertyVideo"
              src={sampleProperty.videoUrl} 
              poster={sampleProperty.images[0]}
              controls={false}
            ></video>
            <button className="video-control" onClick={toggleVideoPlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="property-features">
          <h3>Amenities</h3>
          <div className="features-grid">
            {sampleProperty.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-check">✓</span> {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Location Map */}
        <div className="property-map">
          <h3>Location</h3>
          <div className="map-container">
            {/* This would be your actual map component */}
            <div className="map-placeholder">
              <img src="/images/Recent-1.png" alt="Property Location Map" />
            </div>
          </div>
        </div>

        {/* Mortgage Calculator */}
        <div className="mortgage-calculator">
          <h3>Mortgage Calculator</h3>
          <div className="calculator-form">
            <div className="form-group">
              <label>Purchase Price</label>
              <input type="text" value={sampleProperty.price} readOnly />
            </div>
            <div className="form-group">
              <label>Down Payment</label>
              <input type="text" placeholder="20%" />
            </div>
            <div className="form-group">
              <label>Loan Term</label>
              <select>
                <option>30 Years</option>
                <option>20 Years</option>
                <option>15 Years</option>
                <option>10 Years</option>
              </select>
            </div>
            <div className="form-group">
              <label>Interest Rate</label>
              <input type="text" placeholder="3.5%" />
            </div>
            <button className="calculate-button">Calculate</button>
          </div>
        </div>

        {/* Related Properties */}
        <div className="related-properties">
          <h3>Related Properties</h3>
          <div className="property-grid">
            {sampleProperty.relatedProperties.map((relatedProperty) => (
              <div key={relatedProperty.id} className="property-card">
                <img src={relatedProperty.image} alt={relatedProperty.title} />
                <div className="property-card-info">
                  <div className="property-card-title">{relatedProperty.title}</div>
                  <div className="property-card-price">{relatedProperty.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Modal */}
      {showWhatsAppModal && (
        <div className="modal-overlay" onClick={handleCloseModals}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-tabs">
                <button className="modal-tab active">WhatsApp</button>
                <button className="modal-tab" onClick={handleOpenEmailModal}>Email</button>
              </div>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSendWhatsApp}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleInputChange} 
                    placeholder="Full Name" 
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input 
                    type="tel" 
                    name="mobileNumber" 
                    value={formData.mobileNumber} 
                    onChange={handleInputChange} 
                    placeholder="+234" 
                  />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    rows="4"
                  ></textarea>
                </div>
                <button type="submit" className="send-button whatsapp-buttons">
                  <FaWhatsapp /> Send WhatsApp Message
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div className="modal-overlay" onClick={handleCloseModals}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-tabs">
                <button className="modal-tab" onClick={handleOpenWhatsAppModal}>WhatsApp</button>
                <button className="modal-tab active">Email</button>
              </div>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSendEmail}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    name="fullName" 
                    value={formData.fullName} 
                    onChange={handleInputChange} 
                    placeholder="Full Name" 
                  />
                </div>
                <div className="form-group">
                  <label>Mobile Number</label>
                  <input 
                    type="tel" 
                    name="mobileNumber" 
                    value={formData.mobileNumber} 
                    onChange={handleInputChange} 
                    placeholder="+234" 
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange} 
                    placeholder="Email" 
                  />
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <select 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleInputChange}
                  >
                    <option>General Enquiries</option>
                    <option>Property Viewing</option>
                    <option>Price Negotiation</option>
                    <option>Payment Plan</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    rows="4"
                  ></textarea>
                </div>
                <button type="submit" className="send-button email-button">
                  <FaEnvelope /> Send Email
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyView;