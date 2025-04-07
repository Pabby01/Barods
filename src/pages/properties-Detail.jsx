/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaWhatsapp, FaEnvelope, FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';
import './PropertyView.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";


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
      phone: "+234 902 025 0260",
      email: "adeolalasisi6@gmail.com",
      image: "/images/team-1.png"
    },
    beds: 4,
    baths: 3,
    area: "350 sqm",
    description: "This is a beautifully designed 4 bedroom semi-detached duplex in a serene environment. Perfect for a modern family, this property features spacious rooms, quality finishes, and is located in a secure estate with 24/7 security.",
    images: [
      "/images/image.png",
      "/images/lagos.jpeg",
      "/images/image-2.png",
      "/images/akure.jpeg"
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
      { id: 3, title: "Luxury Apartment", price: "₦9,500,000", image: "/images/image.png" },
      { id: 4, title: "Family Bungalow", price: "₦7,200,000", image: "/images/image-2.png" }
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

  const ScheduleTour = ({ agentEmail, propertyTitle }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
  
    const handleScheduleTour = () => {
      if (!selectedDate || !selectedTime) {
        toast.error("Please select a date and time for the tour.");
        return;
      }
  
      const formattedDate = selectedDate.toLocaleDateString();
      const formattedTime = selectedTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
  
      // Send email to the agent
      const subject = `Tour Request for ${propertyTitle}`;
      const body = `Hello,\n\nA client has requested a tour for the property "${propertyTitle}" on ${formattedDate} at ${formattedTime}.\n\nPlease confirm the booking.\n\nThank you.`;
      window.open(`mailto:${agentEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
  
      // Generate calendar event links
      const eventTitle = `Tour for ${propertyTitle}`;
      const eventDescription = `Tour for the property "${propertyTitle}" with the agent.`;
      const startDateTime = new Date(selectedDate);
      startDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes());
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(startDateTime.getHours() + 1); // Assume 1-hour tour
  
      const googleCalendarLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDateTime.toISOString().replace(/-|:|\.\d+/g, "")}/${endDateTime.toISOString().replace(/-|:|\.\d+/g, "")}&details=${encodeURIComponent(eventDescription)}`;
      const appleCalendarLink = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${eventTitle}\nDESCRIPTION:${eventDescription}\nDTSTART:${startDateTime.toISOString().replace(/-|:|\.\d+/g, "")}\nDTEND:${endDateTime.toISOString().replace(/-|:|\.\d+/g, "")}\nEND:VEVENT\nEND:VCALENDAR`;
      const microsoftCalendarLink = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${encodeURIComponent(eventTitle)}&startdt=${startDateTime.toISOString()}&enddt=${endDateTime.toISOString()}&body=${encodeURIComponent(eventDescription)}`;
  
      // Show success message
      toast.success("Tour scheduled successfully! Add it to your calendar below.");
  
      // Display calendar links
      window.open(googleCalendarLink, "_blank");
      window.open(appleCalendarLink, "_blank");
      window.open(microsoftCalendarLink, "_blank");
    };
  
    return (
      <div className="schedule-tour">
        <h4>Schedule a Tour</h4>
        <div className="tour-date-picker">
          <label>Select Date:</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="MMMM d, yyyy"
            placeholderText="Choose a date"
          />
        </div>
        <div className="tour-time-picker">
          <label>Select Time:</label>
          <DatePicker
            selected={selectedTime}
            onChange={(time) => setSelectedTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            placeholderText="Choose a time"
          />
        </div>
        <button className="schedule-button" onClick={handleScheduleTour}>
          Request a Tour
        </button>
      </div>
    );
  };

  const MapSection = () => {
    // Coordinates for Abeokuta, Ogun State, Nigeria
    const location = {
      lat: 7.1475, // Latitude
      lng: 3.3619, // Longitude
    };
  
    const mapContainerStyle = {
      width: "100%",
      height: "400px",
    };
  
    const mapOptions = {
      zoom: 14,
      center: location,
    };
  
    return (
      <div className="property-map">
        <h3>Location</h3>
        <div className="map-container">
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={location}
              zoom={mapOptions.zoom}
            >
              {/* Marker for the company's location */}
              <Marker position={location} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    );
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
        <ScheduleTour agentEmail={sampleProperty.agent.email} propertyTitle={sampleProperty.title} />

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
        <MapSection />

        {/* Mortgage Calculator */}
        <MortgageCalculator propertyPrice={12000000} />

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
          {/* See More Button */}
          <div className="see-more-container">
            <a href="/buy" className="see-more-button">
              See More Properties
            </a>
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

const MortgageCalculator = ({ propertyPrice }) => {
  const [downPayment, setDownPayment] = useState("");
  const [loanTerm, setLoanTerm] = useState(30); // Default to 30 years
  const [interestRate, setInterestRate] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMortgage = () => {
    if (!downPayment || !interestRate || !loanTerm) {
      toast.error("Please fill in all fields to calculate the mortgage.");
      return;
    }

    const loanAmount = propertyPrice - (propertyPrice * parseFloat(downPayment)) / 100;
    const monthlyInterestRate = parseFloat(interestRate) / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    // Mortgage formula: M = P[r(1+r)^n]/[(1+r)^n - 1]
    const monthlyPayment =
      (loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    setMonthlyPayment(monthlyPayment.toFixed(2));
  };

  return (
    <div className="mortgage-calculator">
      <h3>Mortgage Calculator</h3>
      <div className="calculator-form">
        <div className="form-group">
          <label>Purchase Price</label>
          <input type="text" value={`₦${propertyPrice}`} readOnly />
        </div>
        <div className="form-group">
          <label>Down Payment (%)</label>
          <input
            type="number"
            placeholder="20"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Loan Term (Years)</label>
          <select
            value={loanTerm}
            onChange={(e) => setLoanTerm(parseInt(e.target.value))}
          >
            <option value={30}>30 Years</option>
            <option value={20}>20 Years</option>
            <option value={15}>15 Years</option>
            <option value={10}>10 Years</option>
          </select>
        </div>
        <div className="form-group">
          <label>Interest Rate (%)</label>
          <input
            type="number"
            placeholder="3.5"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>
        <button className="calculate-button" onClick={calculateMortgage}>
          Calculate
        </button>
        {monthlyPayment && (
          <div className="result">
            <h4>Estimated Monthly Payment:</h4>
            <p>₦{monthlyPayment}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyView;