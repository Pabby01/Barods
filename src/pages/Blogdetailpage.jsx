/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin, 
  FaYoutube, 
  FaCalendarAlt, 
  FaChevronRight 
} from "react-icons/fa";
import "../styles/blog-detail.css";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [comment, setComment] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    const blogData = {
      id: parseInt(id),
      title: "The Ultimate Guide to Off-Plan Property Investments: Challenges and Solutions",
      image: "/images/Recent-3.png",
      content:  `
      <p>Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h2>Lorem Ipsum dolor sit</h2>
      
      <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <h2>Lorem ipsum dolor sit amet</h2>
      
      <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    `,
      author: "James Kofi",
      date: "Nov 15, 2024",
      comments: 8,
      tags: ["Property Investment", "Real Estate", "Off-Plan", "Investment Guide"]
    };

    const relatedPostsData = [
      { id: 2, title: "Getting the best Nigerian Prperty", image: "/images/team-ladies.png", date: "Nov 15, 2024" },
      { id: 3, title: "Qualities of a very good property", image: "/images/team-male.png", date: "Nov 10, 2024" }
    ];

    setBlog(blogData);
    setRelatedPosts(relatedPostsData);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComment(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    console.log("Comment submitted:", comment);
    setComment({ name: "", email: "", message: "" });
    alert("Comment submitted successfully!");
  };

  if (!blog) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="page-container">
      <Header />
      <div className="main-content">
        <div className="content-wrapper">
          <div className="breadcrumb">
            <Link to="/">Home</Link> <FaChevronRight /> <Link to="/blog">Blog</Link>
          </div>

          <h1>{blog.title}</h1>
          <div className="blog-meta">{blog.date}</div>
          <div className="feature-image">
            <img src={blog.image} alt={blog.title} />
          </div>
          <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }}></div>

          <div className="comments-section">
            <h3>Leave a comment</h3>
            <form onSubmit={handleSubmitComment} className="comment-form">
              <div className="form-grid">
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={comment.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={comment.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={comment.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>

          <div className="related-posts">
            <h3>Related Posts</h3>
            <div className="posts-grid">
              {relatedPosts.map(post => (
                <div key={post.id} className="blog-card">
                  <Link to={`/blog/${post.id}`}>
                    <img src={post.image} alt={post.title} />
                  </Link>
                  <div className="card-content">
                    <Link to={`/blog/${post.id}`}>
                      <h2>{post.title}</h2>
                    </Link>
                    <div className="post-meta">
                      <FaCalendarAlt /> {post.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

         </div>
  );
};

export default BlogDetailPage;