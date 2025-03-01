/* eslint-disable react/no-unescaped-entities */
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
    name: "John Doe",
    image: "/images/user1.jpg",
    review: "Barods Global helped me find my dream home. The process was smooth and stress-free!",
  },
  {
    id: 2,
    name: "Jane Smith",
    image: "/images/user2.jpg",
    review: "The team is professional and extremely helpful. Highly recommend their service!",
  },
  {
    id: 3,
    name: "Michael Johnson",
    image: "/images/user3.jpg",
    review: "Top-notch real estate services. The best in the industry!",
  },
  {
    id: 4,
    name: "Emily Davis",
    image: "/images/user4.jpg",
    review: "Great experience from start to finish. Very satisfied!",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials">
      <h2>What Our Clients Say</h2>
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 3000 }}
        className="testimonial-swiper"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id} className="testimonial-slide">
            <div className="testimonial-card">
              <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
              <p className="testimonial-review">"{testimonial.review}"</p>
              <h4 className="testimonial-name">- {testimonial.name}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
