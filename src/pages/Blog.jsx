/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCalendarAlt, FaUser, FaComments } from "react-icons/fa";
import "../styles/blog.css";

const BlogPage = () => {
  // Sample blog data - in a real app, this would come from an API
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Top Tips For Selling Your Property In Ghana",
      image: "/images/Hero.png",
      summary: "Explore the best strategies for selling your property in Ghana's competitive real estate market. Learn how to attract buyers and maximize your property value.",
      author: "James Kofi",
      date: "March 15, 2025",
      comments: 8
    },
    {
      id: 2,
      title: "Understanding The Process Of A Property Transaction",
      image: "/images/Hero.png",
      summary: "Navigate the complexities of property transactions with our comprehensive guide. From paperwork to closing, understand every step of the process.",
      author: "Sarah Men",
      date: "March 10, 2025",
      comments: 12
    },
    {
      id: 3,
      title: "Top Tips For Selling Your Property In Ghana",
      image: "/images/Hero.png",
      summary: "Explore the best strategies for selling your property in Ghana's competitive real estate market. Learn how to attract buyers and maximize your property value.",
      author: "James Kofi",
      date: "March 15, 2025",
      comments: 8
    },
    {
      id: 4,
      title: "Understanding The Process Of A Property Transaction",
      image: "/images/Hero.png",
      summary: "Navigate the complexities of property transactions with our comprehensive guide. From paperwork to closing, understand every step of the process.",
      author: "Sarah Mensah",
      date: "March 10, 2025",
      comments: 12
    },
    {
      id: 5,
      title: "Top Tips For Selling Your Property In Ghana",
      image: "/images/Hero.png",
      summary: "Explore the best strategies for selling your property in Ghana's competitive real estate market. Learn how to attract buyers and maximize your property value.",
      author: "James Kofi",
      date: "March 15, 2025",
      comments: 8
    },
    {
      id: 6,
      title: "Understanding The Process Of A Property Transaction",
      image: "/images/Hero.png",
      summary: "Navigate the complexities of property transactions with our comprehensive guide. From paperwork to closing, understand every step of the process.",
      author: "Sarah Mensah",
      date: "March 10, 2025",
      comments: 12
    }
  ]);

  return (
    <div className="blog-page">
      {/* Hero Banner */}
      <div className="blog-hero">
        <div className="blog-hero-overlay"></div>
        <img 
          src="/images/Hero.png" 
          alt="Blog Banner" 
          className="blog-hero-image"
        />
        <div className="blog-hero-content">
          <h1 className="blog-hero-title">Blog</h1>
          <p className="blog-hero-breadcrumb">Home / Blog</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="blog-main-content">
        <div className="blog-container">
          <div className="blog-grid">
            {blogs.map(blog => (
              <div key={blog.id} className="blog-card">
                <Link to={`/blog/${blog.id}`} className="blog-card-image-link">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="blog-card-image"
                  />
                </Link>
                <div className="blog-card-content">
                  <Link to={`/blog/${blog.id}`} className="blog-card-title-link">
                    <h2 className="blog-card-title">{blog.title}</h2>
                  </Link>
                  <p className="blog-card-summary">{blog.summary}</p>
                  <div className="blog-card-meta">
                    <div className="blog-card-author-info">
                      <span className="blog-card-date">
                        <FaCalendarAlt className="blog-card-icon" />
                        {blog.date}
                      </span>
                      <span className="blog-card-author">
                        <FaUser className="blog-card-icon" />
                        {blog.author}
                      </span>
                    </div>
                    <Link to={`/blog/${blog.id}#comments`} className="blog-card-comments">
                      <FaComments className="blog-card-icon" />
                      {blog.comments} Comments
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="blog-pagination">
            <div className="blog-pagination-controls">
              <button className="blog-pagination-button blog-pagination-prev">
                Previous
              </button>
              <button className="blog-pagination-button blog-pagination-active">
                1
              </button>
              <button className="blog-pagination-button">
                2
              </button>
              <button className="blog-pagination-button blog-pagination-next">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;