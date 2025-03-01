/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HotDeals.css"; 

const HotDeals = () => {
  const hotDeals = [
    { id: 1, img: "/images/Recent-1.png", title: "Luxury Villa in California", price: "$2,500,000" },
    { id: 2, img: "/images/Recent-2.png", title: "Modern Apartment in New York", price: "$850,000" },
    { id: 3, img: "/images/Recent-3.png", title: "Cozy Cottage in Colorado", price: "$430,000" },
    { id: 4, img: "/images/Recent-1.png", title: "Beachfront House in Miami", price: "$1,700,000" },
    { id: 5, img: "/images/Recent-2.png", title: "Penthouse in Las Vegas", price: "$3,200,000" },
    { id: 6, img: "/images/Recent-3.png", title: "Country Home in Texas", price: "$780,000" },
    { id: 7, img: "/images/Recent-1.png", title: "Modern Loft in Chicago", price: "$910,000" },
    { id: 8, img: "/images/Recent-2.png", title: "Rustic Cabin in Montana", price: "$350,000" },
    { id: 9, img: "/images/Recent-3.png", title: "Suburban House in Seattle", price: "$1,200,000" },
    { id: 10, img: "/images/Recent-1.png", title: "Luxury Condo in Boston", price: "$1,500,000" }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <section className="hot-deals">
      <h2>🔥 Hot Deals</h2>
      <Slider {...settings}>
        {hotDeals.map((deal) => (
          <div key={deal.id} className="deal-card">
            <img src={deal.img} alt={deal.title} />
            <h3>{deal.title}</h3>
            <p>{deal.price}</p>
            <button>View Details</button>
          </div>
        ))}
      </Slider>
    </section>
  );
};

// Custom Next Arrow
const SampleNextArrow = (props) => {
  const { onClick } = props;
  return <div className="next-arrow" onClick={onClick}>▶</div>;
};

// Custom Prev Arrow
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return <div className="prev-arrow" onClick={onClick}>◀</div>;
};

export default HotDeals;
