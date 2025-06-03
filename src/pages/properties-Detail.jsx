/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaWhatsapp, FaEnvelope, FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaPlay, FaPause, FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import './PropertyView.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Modal = ({ isOpen, onClose, title, children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.modal-header')) {
      setIsDragging(true);
      const rect = modalRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const x = e.clientX - dragOffset.x;
      const y = e.clientY - dragOffset.y;
      setPosition({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal-container"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? 'grabbing' : 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
      >
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <button className="modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const PropertyView = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calculatorValues, setCalculatorValues] = useState({
    principalAmount: 12000000,
    downPayment: 2400000,
    interestRate: 5,
    loanTerm: 30,
    propertyTax: 5000,
    insurance: 8000
  });
  const [tourFormData, setTourFormData] = useState({
    name: '',
    email: '',
    date: null,
    time: '',
    message: ''
  });
  const [messageFormData, setMessageFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    subject: 'General Enquiries',
    message: `Hello, I am interested in Diamond Family Home, 374, Johnson Ave, Ikoyi Lagos, and would love to make further enquiries.`
  });

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
    setMessageFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTourInputChange = (e) => {
    const { name, value } = e.target;
    setTourFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const phoneNumber = messageFormData.mobileNumber.replace(/\D/g, '');
    const message = encodeURIComponent(messageFormData.message);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    handleCloseModals();
    toast.success("Opening WhatsApp...");
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(messageFormData.subject);
    const body = encodeURIComponent(messageFormData.message);
    window.open(`mailto:${sampleProperty.agent.email}?subject=${subject}&body=${body}`, '_blank');
    handleCloseModals();
    toast.success("Opening email client...");
  };

  const handleScheduleTour = (e) => {
    e.preventDefault();
    if (!tourFormData.name || !tourFormData.email || !tourFormData.date) {
      toast.error("Please fill in all required fields");
      return;
    }

    const subject = encodeURIComponent(`Tour Request: ${sampleProperty.title}`);
    const body = encodeURIComponent(
      `Tour Request Details:\n\n` +
      `Name: ${tourFormData.name}\n` +
      `Email: ${tourFormData.email}\n` +
      `Date: ${tourFormData.date}\n` +
      `Time: ${tourFormData.time}\n` +
      `Message: ${tourFormData.message}\n\n` +
      `Property: ${sampleProperty.title}\n` +
      `Address: ${sampleProperty.address}`
    );

    window.open(`mailto:${sampleProperty.agent.email}?subject=${subject}&body=${body}`, '_blank');
    toast.success("Tour request sent successfully!");
    setTourFormData({
      name: '',
      email: '',
      date: null,
      time: '',
      message: ''
    });
  };

  const calculateMortgage = () => {
    const {
      principalAmount,
      downPayment,
      interestRate,
      loanTerm,
      propertyTax,
      insurance
    } = calculatorValues;

    const loanAmount = principalAmount - downPayment;
    const monthlyInterest = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const monthlyMortgage =
      (loanAmount *
        (monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments))) /
      (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);

    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;

    return {
      monthlyPayment: monthlyMortgage + monthlyTax + monthlyInsurance,
      monthlyPrincipalAndInterest: monthlyMortgage,
      monthlyTax,
      monthlyInsurance
    };
  };

  const mortgageDetails = calculateMortgage();

  // Sample property data (you would fetch this from your API)
  const sampleProperty = {
    id: 1,
    title: "Diamond Family Home",
    address: "374, Johnson Ave, Ajah Lagos",
    price: "₦12,000,000",
    agent: {
      name: "Alabi Ogundare",
      phone: "+234 902 025 0260",
      email: "alabi@barodsglobal.com",
      image: "/images/team-1.png",
      description: "Hello! I would love to show you this beautiful property. I am committed to providing exceptional service and finding the perfect home for you."
    },
    beds: 3,
    baths: 3,
    area: "300 sqm",
    description: `Welcome to your dream residence! A stunning family villa is a 3-bedroom Apartment perfect for a modern family. Located in a central hub, Lagos, which boasts many convenient amenities. This property offers a perfect blend of sophistication and modern functionality.

Step inside to discover expansive living spaces adorned with luxurious finishes, high ceilings, and wall-to-wall windows. The main living area flows seamlessly into a gourmet kitchen, featuring state-of-the-art appliances, custom cabinetry, and elegant granite countertops. The master suite is a tranquil retreat with a spa-like bathroom designed to rejuvenate your senses.

Each of the generously sized bedrooms are en-suite with spacious, comfortable walk-in closets. The shared areas are thoughtfully designed to improve open flow between spaces. The house also has a small cinema room and a private study.

You'll especially be won't over at the ground level of this magnificent neighborhood. Here, there's easy access to schools, shopping centers, and recreational facilities. With 24/7 security, gated parking, and a comprehensive building management system, this house proves to be a haven of elegant living.

Because this rare opportunity to own a piece of Lagos's finest properties. Tour their home today!`,
    images: [
      "/images/Recent-1.png",
      "/images/Recent-2.png",
      "/images/Recent-3.png",
      "/images/Recent-1.png"
    ],
    virtualTourUrl: "https://www.youtube.com/embed/your-virtual-tour-id",
    location: {
      latitude: 6.6018,
      longitude: 3.3515 // Coordinates for Ogun State
    },
    amenities: [
      "24/7 Power supply",
      "24hrs Security",
      "CCTV Camera",
      "Ultra-modern facility",
      "24hrs Water supply",
      "Ultra-modern facility"
    ],
    relatedProperties: [
      {
        id: 2,
        title: "Diamond Family Home",
        location: "374, Johnson Ave, Ajah Lagos",
        price: "₦12,000,000",
        image: "/images/Recent-1.png",
        beds: 3,
        baths: 3,
        area: "300 sqm"
      },
      {
        id: 3,
        title: "Mountain View Villa",
        location: "374, Johnson Ave, Ajah Lagos",
        price: "₦12,000,000",
        image: "/images/Recent-2.png",
        beds: 3,
        baths: 3,
        area: "300 sqm"
      },
      {
        id: 4,
        title: "Seaside Cottage",
        location: "374, Johnson Ave, Ajah Lagos",
        price: "₦12,000,000",
        image: "/images/Recent-3.png",
        beds: 3,
        baths: 3,
        area: "300 sqm"
      }
    ]
  };

  return (
    <div className="property-view-container">
      {/* Property Header */}
      <div className="property-header">
        <h1>{sampleProperty.title}</h1>
        <p className="property-address">
          <FaMapMarkerAlt /> {sampleProperty.address}
        </p>
        <div className="property-quick-info">
          <span>{sampleProperty.beds} Beds</span>
          <span>{sampleProperty.baths} Baths</span>
          <span>{sampleProperty.area}</span>
        </div>
        <div className="property-price">{sampleProperty.price}</div>
      </div>

      {/* Image Gallery */}
      <div className="property-gallery">
        <div className="main-image-container">
          <img
            src={sampleProperty.images[currentImageIndex]}
            alt={`Property view ${currentImageIndex + 1}`}
            className="main-image"
          />
          <button className="gallery-nav prev" onClick={handlePrevImage}>
            <FaChevronLeft />
          </button>
          <button className="gallery-nav next" onClick={handleNextImage}>
            <FaChevronRight />
          </button>
        </div>
        <div className="thumbnail-container">
          {sampleProperty.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${currentImageIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentImageIndex(index)}
            />
          ))}
        </div>
      </div>

      <div className="property-content">
        <div className="property-main-content">
          {/* Overview Section */}
          <section className="property-section">
            <h3>Overview</h3>
            <p>{sampleProperty.description}</p>
          </section>

          {/* Amenities Section */}
          <section className="property-section">
            <h3>Amenities</h3>
            <div className="amenities-grid">
              {sampleProperty.amenities.map((amenity, index) => (
                <div key={index} className="amenity-item">
                  <span className="amenity-icon">✓</span>
                  {amenity}
                </div>
              ))}
            </div>
          </section>

          {/* Virtual Tour Section */}
          <section className="property-section">
            <h3>Virtual Tour</h3>
            <div className="virtual-tour-container">
              <iframe
                src={sampleProperty.virtualTourUrl}
                title="Virtual Tour"
                width="100%"
                height="400"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </section>

          {/* Map Section */}
          <section className="property-section">
            <h3>Map</h3>
            <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
              <GoogleMap
                mapContainerStyle={{
                  width: '100%',
                  height: '400px'
                }}
                center={{
                  lat: sampleProperty.location.latitude,
                  lng: sampleProperty.location.longitude
                }}
                zoom={15}
              >
                <Marker
                  position={{
                    lat: sampleProperty.location.latitude,
                    lng: sampleProperty.location.longitude
                  }}
                />
              </GoogleMap>
            </LoadScript>
          </section>

          {/* Mortgage Calculator */}
          <section className="property-section">
            <h3>Mortgage Calculator</h3>
            <div className="mortgage-calculator">
              <div className="calculator-inputs">
                <div className="input-group">
                  <label>Principal Amount</label>
                  <input
                    type="number"
                    value={calculatorValues.principalAmount}
                    onChange={(e) =>
                      setCalculatorValues({
                        ...calculatorValues,
                        principalAmount: parseFloat(e.target.value)
                      })
                    }
                  />
                </div>
                <div className="input-group">
                  <label>Down Payment</label>
                  <input
                    type="number"
                    value={calculatorValues.downPayment}
                    onChange={(e) =>
                      setCalculatorValues({
                        ...calculatorValues,
                        downPayment: parseFloat(e.target.value)
                      })
                    }
                  />
                </div>
                <div className="input-group">
                  <label>Interest Rate (%)</label>
                  <input
                    type="number"
                    value={calculatorValues.interestRate}
                    onChange={(e) =>
                      setCalculatorValues({
                        ...calculatorValues,
                        interestRate: parseFloat(e.target.value)
                      })
                    }
                  />
                </div>
                <div className="input-group">
                  <label>Loan Term (years)</label>
                  <input
                    type="number"
                    value={calculatorValues.loanTerm}
                    onChange={(e) =>
                      setCalculatorValues({
                        ...calculatorValues,
                        loanTerm: parseInt(e.target.value)
                      })
                    }
                  />
                </div>
              </div>
              <div className="calculator-results">
                <div className="result-item">
                  <label>Monthly Payment:</label>
                  <span>₦{Math.round(mortgageDetails.monthlyPayment).toLocaleString()}</span>
                </div>
                <div className="result-item">
                  <label>Principal & Interest:</label>
                  <span>₦{Math.round(mortgageDetails.monthlyPrincipalAndInterest).toLocaleString()}</span>
                </div>
                <div className="result-item">
                  <label>Property Tax:</label>
                  <span>₦{Math.round(mortgageDetails.monthlyTax).toLocaleString()}</span>
                </div>
                <div className="result-item">
                  <label>Insurance:</label>
                  <span>₦{Math.round(mortgageDetails.monthlyInsurance).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="property-sidebar">
          {/* Agent Information */}
          <div className="agent-card2">
            <div className="agent-header2">
              <img src={sampleProperty.agent.image} alt={sampleProperty.agent.name} className="agent-image2" />
              <div className="agent-info2">
                <h3>{sampleProperty.agent.name}</h3>
                <p className="agent-about2">About: {sampleProperty.agent.description}</p>
                <p className="agent-contact2">Phone: {sampleProperty.agent.phone}</p>
                <p className="agent-contact2">Mail: {sampleProperty.agent.email}</p>
              </div>
            </div>
            <div className="agent-actions2">
              <button className="contact-button2 whatsapp" onClick={handleOpenWhatsAppModal}>
                <FaWhatsapp /> Send a message
              </button>
              <button className="contact-button2 email" onClick={handleOpenEmailModal}>
                <FaEnvelope /> Send mail
              </button>
            </div>
          </div>

          {/* Schedule Tour */}
          <div className="schedule-tour-card">
            <h3>Schedule a Tour</h3>
            <form onSubmit={handleScheduleTour}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={tourFormData.name}
                onChange={handleTourInputChange}
                className="tour-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={tourFormData.email}
                onChange={handleTourInputChange}
                className="tour-input"
              />
              <input
                type="date"
                name="date"
                value={tourFormData.date}
                onChange={handleTourInputChange}
                className="tour-input"
              />
              <input
                type="time"
                name="time"
                value={tourFormData.time}
                onChange={handleTourInputChange}
                className="tour-input"
              />
              <textarea
                name="message"
                placeholder="Message (optional)"
                value={tourFormData.message}
                onChange={handleTourInputChange}
                className="tour-input"
                rows="3"
              />
              <button type="submit" className="schedule-button">
                Submit a Tour Request
              </button>
            </form>
          </div>
        </div>

        {/* WhatsApp Modal */}
        <Modal
          isOpen={showWhatsAppModal}
          onClose={handleCloseModals}
          title="Contact Agent"
        >
          <form onSubmit={handleSendWhatsApp}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={messageFormData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input
                type="tel"
                name="mobileNumber"
                value={messageFormData.mobileNumber}
                onChange={handleInputChange}
                placeholder="+234"
                required
              />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={messageFormData.message}
                onChange={handleInputChange}
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="send-button whatsapp-button2">
              <FaWhatsapp /> Send WhatsApp Message
            </button>
          </form>
        </Modal>

        {/* Email Modal */}
        <Modal
          isOpen={showEmailModal}
          onClose={handleCloseModals}
          title="Send Email"
        >
          <form onSubmit={handleSendEmail}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                value={messageFormData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={messageFormData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <select
                name="subject"
                value={messageFormData.subject}
                onChange={handleInputChange}
                required
              >
                <option value="General Enquiries">General Enquiries</option>
                <option value="Property Viewing">Property Viewing</option>
                <option value="Price Negotiation">Price Negotiation</option>
                <option value="Payment Plan">Payment Plan</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                value={messageFormData.message}
                onChange={handleInputChange}
                rows="4"
                required
              ></textarea>
            </div>
            <button type="submit" className="send-button email-button2">
              <FaEnvelope /> Send Email
            </button>
          </form>
        </Modal>
      </div>

      {/* Related Properties */}
      <section className="related-properties">
        <h3>Related Properties</h3>
        <div className="related-properties-grid">
          {sampleProperty.relatedProperties.map((property) => (
            <div key={property.id} className="related-property-card">
              <img src={property.image} alt={property.title} />
              <div className="related-property-info">
                <h3>{property.title}</h3>
                <p className="location">{property.location}</p>
                <div className="features">
                  <span>{property.beds} Beds</span>
                  <span>{property.baths} Baths</span>
                  <span>{property.area}</span>
                </div>
                <div className="price">{property.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PropertyView;