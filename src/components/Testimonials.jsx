 
/* eslint-disable no-unused-vars */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Atigbo Chinonso",
    avatar: "https://via.placeholder.com/50", // Replace with actual avatar
    date: "2024-11-05",
    rating: 5,
    review: "I bought my house from them, and they are reliable and credible. It took me three months to completely trust...",
  },
  {
    id: 2,
    name: "Christiana Alagbe",
    avatar: "https://via.placeholder.com/50",
    date: "2024-09-28",
    rating: 5,
    review: "From the very beginning, Lawrita made our home-buying experience seamless. From property viewings to making a...",
  },
  {
    id: 3,
    name: "Kehinde Opemipo",
    avatar: "https://via.placeholder.com/50",
    date: "2024-09-27",
    rating: 5,
    review: "Hands down the best real estate company in Abeokuta you could ask for.",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="testimonial-header">
        <div className="business-info">
          <img src="/images/company-logo.jpg" alt="Barods Global" className="company-logo" />
          <div>
            <h4>Barods Global</h4>
            <div className="rating">
              {"★".repeat(5)} <span>29 Google reviews</span>
            </div>
            <button className="review-btn">Write a review</button>
          </div>
        </div>
      </div>

      <h2>What Our Clients Are Saying</h2>

      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 3000 }}
        className="testimonial-swiper"
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="testimonial-slide">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                <div>
                  <h4 className="testimonial-name">{testimonial.name}</h4>
                  <p className="testimonial-date">{testimonial.date}</p>
                </div>
              </div>
              <div className="testimonial-rating">{"★".repeat(testimonial.rating)}</div>
              <p className="testimonial-review">{testimonial.review}</p>
              <a href="#" className="read-more">Read more</a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
