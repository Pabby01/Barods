/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FaWhatsapp, FaEnvelope, FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaPlay, FaPause, FaTimes } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import './PropertyView.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import placeholderData from "../data/properties.json"; // fallback data

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

const Prodetails = () => {
  const { slugOrId } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [calculatorValues, setCalculatorValues] = useState({
    principalAmount: 0,
    downPayment: 0,
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
    message: ''
  });

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://barods-global.onrender.com/api/v1/user/property?id=${slugOrId}`
        );
        const data = await response.json();
        console.log("API property details response:", data);

        if (response.ok && data && data.property) {
          // Map API property to UI structure
          const apiProp = data.property;
          const mapped = {
            id: apiProp._id,
            title: apiProp.Title || apiProp.title || "Untitled Property",
            description: apiProp.Description || apiProp.description || "",
            fullDescription: apiProp.Description || apiProp.description || "",
            images: apiProp.Image || [],
            amenities: Array.isArray(apiProp.Amenities)
              ? apiProp.Amenities
              : typeof apiProp.Amenities === "string"
              ? apiProp.Amenities.split(",")
              : [],
            price: {
              current:
                apiProp.Price && typeof apiProp.Price === "object" && apiProp.Price.$numberDecimal
                  ? Number(apiProp.Price.$numberDecimal)
                  : typeof apiProp.Price === "number"
                  ? apiProp.Price
                  : Number(apiProp.Price) || 0,
              formatted: {
                current:
                  apiProp.Price && typeof apiProp.Price === "object" && apiProp.Price.$numberDecimal
                    ? `₦${Number(apiProp.Price.$numberDecimal).toLocaleString()}`
                    : typeof apiProp.Price === "number"
                    ? `₦${apiProp.Price.toLocaleString()}`
                    : typeof apiProp.Price === "string"
                    ? `₦${apiProp.Price}`
                    : "₦0"
              }
            },
            location: {
              address: apiProp.StreetAddress || "",
              area: apiProp.Area || "",
              city: apiProp.State || "",
              coordinates: {
                latitude: apiProp.latitude || 6.5244, // fallback Lagos
                longitude: apiProp.longitude || 3.3792
              }
            },
            features: {
              beds: apiProp.Bedroom || 0,
              baths: apiProp.Bathroom || 0,
              area: {
                size: apiProp.Area || "",
                unit: "sqm"
              }
            },
            agent: {
              name: apiProp.postedBy?.fullName || "Barods Agent",
              phone: apiProp.postedBy?.phone || "+234 000 000 0000",
              email: apiProp.postedBy?.email || "info@barodsglobal.com",
              image: "/images/team-1.png",
              description: "Contact us for more details."
            },
            virtualTourUrl: apiProp.virtualTourUrl || "https://www.youtube.com/embed/OYmtXRAcMfg?si=Vv2_Ux631-QjSJsW"
          };

          setProperty(mapped);
        } else {
          throw new Error(data?.message || "Property not found");
        }
      } catch (error) {
        toast.error(error.message || "Could not load property details");
        // Fallback to placeholder
        const fallback =
          placeholderData.properties?.find((p) => p.id === slugOrId) ||
          placeholderData.properties?.[0];
        setProperty(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [slugOrId]);

  useEffect(() => {
    if (property) {
      // Initialize calculator with property price
      setCalculatorValues(prev => ({
        ...prev,
        principalAmount: property.price.current,
        downPayment: property.price.current * 0.2 // 20% down payment
      }));
      // Initialize message with property details
      setMessageFormData(prev => ({
        ...prev,
        message: `Hello, I am interested in ${property.title}, ${property.location.address}, ${property.location.area} ${property.location.city}, and would love to make further enquiries.`
      }));
    }
  }, [property]);

  if (loading) return <div>Loading...</div>;
  if (!property) return <div>Property not found.</div>;

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
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
    window.open(`mailto:${property.agent.email}?subject=${subject}&body=${body}`, '_blank');
    handleCloseModals();
    toast.success("Opening email client...");
  };

  const handleScheduleTour = (e) => {
    e.preventDefault();
    if (!tourFormData.name || !tourFormData.email || !tourFormData.date) {
      toast.error("Please fill in all required fields");
      return;
    }

    const subject = encodeURIComponent(`Tour Request: ${property.title}`);
    const body = encodeURIComponent(
      `Tour Request Details:\n\n` +
      `Name: ${tourFormData.name}\n` +
      `Email: ${tourFormData.email}\n` +
      `Date: ${tourFormData.date}\n` +
      `Time: ${tourFormData.time}\n` +
      `Message: ${tourFormData.message}\n\n` +
      `Property: ${property.title}\n` +
      `Address: ${property.location.address}, ${property.location.area} ${property.location.city}`
    );

    window.open(`mailto:${property.agent.email}?subject=${subject}&body=${body}`, '_blank');
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

  // Get related properties (excluding current property)
  const relatedProperties = placeholderData.properties
    .filter(p => p.id !== property.id)
    .slice(0, 3); // Get first 3 related properties

  return (
    <div className="property-view-container">
      {/* Property Header */}
      <div className="property-header">
        <h1>{property.title}</h1>
        <p className="property-address">
          <FaMapMarkerAlt /> {property.location.address}, {property.location.area} {property.location.city}
        </p>
        <div className="property-quick-info">
          <span>{property.features.beds} Beds</span>
          <span>{property.features.baths} Baths</span>
          <span>{property.features.area.size} {property.features.area.unit}</span>
        </div>
        <div className="property-price">{property.price.formatted.current}</div>
      </div>

      {/* Image Gallery */}
      <div className="property-gallery">
        <div className="main-image-container">
          <img
            src={property.images[currentImageIndex]}
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
          {property.images.map((image, index) => (
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
            <p>{property.fullDescription || property.description}</p>
          </section>

          {/* Amenities Section */}
          <section className="property-section">
            <h3>Amenities</h3>
            <div className="amenities-grid">
              {property.amenities.map((amenity, index) => (
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
                src={property.virtualTourUrl}
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
                  lat: property.location.coordinates.latitude,
                  lng: property.location.coordinates.longitude
                }}
                zoom={15}
              >
                <Marker
                  position={{
                    lat: property.location.coordinates.latitude,
                    lng: property.location.coordinates.longitude
                  }}
                />
              </GoogleMap>
            </LoadScript>
          </section>

          {/* Mortgage Calculator Section */}
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
              <img src={property.agent.image} alt={property.agent.name} className="agent-image2" />
              <div className="agent-info2">
                <h3>{property.agent.name}</h3>
                <p className="agent-about2">About: {property.agent.description}</p>
                <p className="agent-contact2">Phone: {property.agent.phone}</p>
                <p className="agent-contact2">Mail: {property.agent.email}</p>
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
          {relatedProperties.map((relatedProperty) => (
            <div key={relatedProperty.id} className="related-property-card" onClick={() => navigate(`/property/${relatedProperty.slug}`)}>
              <img src={relatedProperty.images[0]} alt={relatedProperty.title} />
              <div className="related-property-info">
                <h3>{relatedProperty.title}</h3>
                <p className="location">{relatedProperty.location.address}, {relatedProperty.location.area}</p>
                <div className="features">
                  <span>{relatedProperty.features.beds} Beds</span>
                  <span>{relatedProperty.features.baths} Baths</span>
                  <span>{relatedProperty.features.area.size} {relatedProperty.features.area.unit}</span>
                </div>
                <div className="price">{relatedProperty.price.formatted.current}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Prodetails;