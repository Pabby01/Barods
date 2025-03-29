import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFallbackData = () => {
      setTestimonials([
        {
          id: 1,
          name: "Atigbo Chinonso",
          avatar: "a",
          avatarColor: "#9c27b0",
          date: "2024-11-05",
          rating: 5,
          review: "I bought my house from them, and they are reliable and credible. It took me three months to completely trust...",
          isGoogle: true
        },
        {
          id: 2,
          name: "Christiana Alagbe",
          avatar: "/images/human.png",
          date: "2024-09-28",
          rating: 5,
          review: "From the very beginning, Lawrita made our home-buying experience seamless. From property viewings to making...",
          isGoogle: true
        },
        {
          id: 3,
          name: "Kehinde Opemipo",
          avatar: "K",
          avatarColor: "#673ab7",
          date: "2024-09-27",
          rating: 3,
          review: "Hands down the best real estate company in Abeokuta you could ask for.",
          isGoogle: true
        },
        {
          id: 4,
          name: "Deborah Ogunsola",
          avatar: "D",
          avatarColor: "#2196f3",
          date: "2024-09-15",
          rating: 5,
          review: "Their attention to detail and personalized service exceeded all my expectations. Highly recommended!",
          isGoogle: true
        },
        {
          id: 5,
          name: "Samuel Adeniyi",
          avatar: "S",
          avatarColor: "#4caf50",
          date: "2024-09-10",
          rating: 4,
          review: "Great service overall, very responsive team and transparent process from start to finish.",
          isGoogle: true
        },
      ]);
      setLoading(false);
    };

    // Commented out the API call
    // const fetchGoogleReviews = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await fetch('/api/google-reviews', {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       }
    //     });

    //     if (!response.ok) {
    //       throw new Error('Failed to fetch Google reviews');
    //     }

    //     const data = await response.json();
    //     setTestimonials(data.reviews || []);
    //     setLoading(false);
    //   } catch (err) {
    //     console.error("Error fetching Google reviews:", err);
    //     setError("Failed to load reviews");
    //     setLoading(false);
    //   }
    // };

    loadFallbackData();
  }, []);

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  // Generate avatar if image is not available
  const getAvatar = (testimonial) => {
    if (testimonial.avatar && testimonial.avatar.length > 1) {
      return (
        <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
      );
    } else {
      return (
        <div 
          className="testimonial-avatar-letter" 
          style={{ backgroundColor: testimonial.avatarColor || "#9c27b0" }}
        >
          {testimonial.avatar || testimonial.name.charAt(0)}
        </div>
      );
    }
  };

  // Generate stars based on rating
  const renderStars = (rating) => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < rating ? "star filled" : "star"}>★</span>
        ))}
      </div>
    );
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="business-info">
          <img src="/images/review.png" alt="Barods Global" className="company-logo" />
          <div className="business-details">
            <h3 className="business-name">Barods Global</h3>
            <div className="business-rating">
              {renderStars(5)}
              <span className="review-count">29 Google reviews</span>
            </div>
            <a 
              href="https://g.page/r/barods-global/review" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="review-btn"
            >
              Write a review
            </a>
          </div>
        </div>

        <h2 className="testimonials-title">What Our Clients Are Saying</h2>

        {loading ? (
          <div className="loading-reviews">Loading reviews...</div>
        ) : error ? (
          <div className="error-reviews">{error}</div>
        ) : (
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="testimonials-swiper"
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="testimonial-slide">
                <div className="testimonial-card">
                  <div className="testimonial-header">
                    {getAvatar(testimonial)}
                    <div className="testimonial-info">
                      <h4 className="testimonial-name">{testimonial.name}</h4>
                      <p className="testimonial-date">{formatDate(testimonial.date)}</p>
                    </div>
                    {testimonial.isGoogle && (
                      <img 
                        src="/images/google.png" 
                        alt="Google Review" 
                        className="google-icon" 
                      />
                    )}
                  </div>
                  <div className="testimonial-content">
                    {renderStars(testimonial.rating)}
                    <p className="testimonial-text">{testimonial.review}</p>
                    <a href="#" className="read-more">Read more</a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
};

export default Testimonials;