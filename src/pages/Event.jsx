/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import './EventsGallery.css';

const EventsGallery = () => {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  // Sample events data
  const events = [
    {
      id: 1,
      title: "Educational Programs",
      image: "/images/team-1.png", // Replace with your actual image path
      date: "January 15, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "Main Office, Yaba",
      description: "Providing essential real estate workshops to help our clients understand today's landscape in a clearer and more tangible manner. It's more than just an information session, it's an educational experience. Save the date to be a part of this exclusive opportunity."
    },
    {
      id: 2,
      title: "Staff Training 2024",
      image: "/images/team-1.png", // Replace with your actual image path
      date: "February 20, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Training Center, Ikeja",
      description: "Equipping our team with the latest real estate knowledge, empowering them to provide exceptional service to clients in a clearer and more tangible manner. It's more than just an information session, it's an educational experience. Open only to our commission employees."
    },
    {
      id: 3,
      title: "Educational Programs",
      image: "/images/team-1.png", // Replace with your actual image path
      date: "March 10, 2024",
      time: "10:00 AM - 2:00 PM",
      location: "Main Office, Yaba",
      description: "Providing essential real estate workshops to help our clients understand today's landscape in a clearer and more tangible manner. It's more than just an information session, it's an educational experience. Save the date to be a part of this exclusive opportunity."
    },
    {
      id: 4,
      title: "Staff Training 2024",
      image: "/images/team-1.png", // Replace with your actual image path
      date: "April 15, 2024",
      time: "9:00 AM - 4:00 PM",
      location: "Training Center, Ikeja",
      description: "Equipping our team with the latest real estate knowledge, empowering them to provide exceptional service to clients in a clearer and more tangible manner. It's more than just an information session, it's an educational experience. Open only to our commission employees."
    }
  ];

  // Sample gallery images
  const galleryImages = [
    {
      id: 1,
      src: "/images/Recent-2.png", // Replace with your actual image path
      alt: "Group of professional realtors in suits"
    },
    {
      id: 2,
      src: "/images/Recent-3.png",
      alt: "Office opening ceremony"
    },
    {
      id: 3,
      src: "/images/team-1.png",
      alt: "Team building activity"
    },
    {
      id: 4,
      src: "/images/Recent-1.png",
      alt: "Award ceremony"
    },
    {
      id: 5,
      src: "/images/team-ladies.png",
      alt: "Client meeting"
    },
    {
      id: 6,
      src: "/images/team-male.png",
      alt: "Property tour"
    },
    {
      id: 7,
      src: "/images/team-1.png",
      alt: "Community outreach"
    }
  ];

  const prevGalleryImage = () => {
    setCurrentGalleryIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const nextGalleryImage = () => {
    setCurrentGalleryIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="events-gallery-container">
      {/* Hero Banner */}
      <div className="hero-banner">
        <h1>Events & Gallery</h1>
      </div>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/">Home</a> / <span>Events & Gallery</span>
      </div>

      {/* Events Section */}
      <section className="events-section">
        <h2>Events</h2>
        <div className="events-grid">
          {events.map(event => (
            <div key={event.id} className="event-card">
              <div className="event-image">
                <img src={event.image} alt={event.title} />
              </div>
              <div className="event-content">
                <h3>{event.title}</h3>
                <div className="event-details">
                  <p><FaCalendarAlt /> <span>{event.date}</span></p>
                  <p><FaClock /> <span>{event.time}</span></p>
                  <p><FaMapMarkerAlt /> <span>{event.location}</span></p>
                </div>
                <p className="event-description">{event.description}</p>
                <a href={`/event/${event.id}`} className="view-more-btn">View More</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="gallery-section">
        <h2>Gallery</h2>
        <div className="gallery-carousel">
          <button className="gallery-nav prev" onClick={prevGalleryImage}>
            <FaArrowLeft />
          </button>
          <div className="gallery-image-container">
            <img 
              src={galleryImages[currentGalleryIndex].src} 
              alt={galleryImages[currentGalleryIndex].alt} 
              className="gallery-image"
            />
          </div>
          <button className="gallery-nav next" onClick={nextGalleryImage}>
            <FaArrowRight />
          </button>
        </div>
        <div className="gallery-indicators">
          {galleryImages.map((_, index) => (
            <span 
              key={index} 
              className={`gallery-indicator ${index === currentGalleryIndex ? 'active' : ''}`}
              onClick={() => setCurrentGalleryIndex(index)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default EventsGallery;