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
  FaUser, 
  FaComments,
  FaChevronRight,
  FaShare
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

  // Sample blog data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate fetching a blog post by ID
    const blogData = {
      id: parseInt(id),
      title: "The Ultimate Guide to Off-Plan Property Investments: Challenges and Solutions",
      image: "/images/blog/property-offplan.jpg",
      content: `
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

    // Simulate fetching related posts
    const relatedPostsData = [
      {
        id: 2,
        title: "The Ultimate Guide to Off-Plan Property Investments: Challenges and Solutions",
        image: "/images/blog/property-offplan.jpg",
        date: "Nov 15, 2024"
      },
      {
        id: 3,
        title: "10 Ways Guide to Off-Plan Property Investments: Challenges and Solutions",
        image: "/images/blog/property-transaction.jpg",
        date: "Nov 10, 2024"
      }
    ];

    setBlog(blogData);
    setRelatedPosts(relatedPostsData);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    console.log("Comment submitted:", comment);
    // Here you would typically send this to your API
    // Then reset the form
    setComment({
      name: "",
      email: "",
      message: ""
    });
    alert("Comment submitted successfully!");
  };

  if (!blog) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Main Content */}
      <div className="bg-gray-100 py-8 px-4 md:px-8 flex-grow mt-20">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="breadcrumb text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-green-600">Home</Link> {" "}
            <FaChevronRight className="inline mx-1 text-xs" /> {" "}
            <Link to="/blog" className="hover:text-green-600">Blog</Link>
          </div>

          {/* Blog Title */}
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">{blog.title}</h1>
          
          {/* Blog Meta */}
          <div className="blog-meta text-sm text-gray-500 mb-6">
            <span className="published-date">{blog.date}</span>
          </div>

          {/* Feature Image */}
          <div className="feature-image mb-8">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-auto rounded-lg shadow"
            />
          </div>

          {/* Blog Content */}
          <div 
            className="blog-content prose max-w-none mb-10"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>

          {/* Comment Section */}
          <div className="comments-section mt-12 mb-8">
            <h3 className="text-xl font-semibold mb-6">Leave a comment</h3>
            <form onSubmit={handleSubmitComment} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={comment.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={comment.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={comment.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>
              <div className="text-right">
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Related Posts */}
          <div className="related-posts mt-12">
            <h3 className="text-xl font-semibold mb-6">Related Posts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map(post => (
                <div key={post.id} className="blog-card bg-white shadow-sm overflow-hidden rounded-lg">
                  <Link to={`/blog/${post.id}`} className="block">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-4">
                    <Link to={`/blog/${post.id}`}>
                      <h2 className="text-lg font-semibold text-gray-800 hover:text-green-600 mb-2">{post.title}</h2>
                    </Link>
                    <div className="flex items-center text-sm text-gray-500">
                      <FaCalendarAlt className="mr-1 text-green-600" />
                      {post.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Address */}
            <div className="flex flex-col">
              <div className="mb-4">
                <img 
                  src="/images/bardos-footer-logo.png" 
                  alt="Bardos Global Limited" 
                  className="h-16"
                />
              </div>
              <address className="not-italic text-sm text-gray-300 mb-4">
                <p>Aberdare Gardens 87B, Providence Mall, First CCTV</p>
                <p>Ebimpe, Lekki, Adjamé, Agbogbloshie</p>
              </address>
              <div className="flex space-x-3 mt-2">
                <a href="#" className="text-white hover:text-green-400 bg-green-700 rounded-full p-2">
                  <FaFacebook size={18} />
                </a>
                <a href="#" className="text-white hover:text-green-400 bg-green-700 rounded-full p-2">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="text-white hover:text-green-400 bg-green-700 rounded-full p-2">
                  <FaInstagram size={18} />
                </a>
                <a href="#" className="text-white hover:text-green-400 bg-green-700 rounded-full p-2">
                  <FaLinkedin size={18} />
                </a>
                <a href="#" className="text-white hover:text-green-400 bg-green-700 rounded-full p-2">
                  <FaYoutube size={18} />
                </a>
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/about" className="hover:text-green-400">About Us</Link></li>
                <li><Link to="/agents" className="hover:text-green-400">Agents</Link></li>
                <li><Link to="/blog" className="hover:text-green-400">Blog</Link></li>
                <li><Link to="/services" className="hover:text-green-400">Services</Link></li>
              </ul>
            </div>

            {/* Our Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Our Information</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/privacy-policy" className="hover:text-green-400">Privacy Policy</Link></li>
                <li><Link to="/terms-conditions" className="hover:text-green-400">Terms & Conditions</Link></li>
                <li><Link to="/faq" className="hover:text-green-400">FAQ</Link></li>
                <li><Link to="/help-center" className="hover:text-green-400">Help Center</Link></li>
              </ul>
            </div>

            {/* Agent Prompt */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Are you a Realtor?</h3>
              <Link 
                to="/become-agent" 
                className="inline-block mt-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition duration-300"
              >
                Become an agent →
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>© Bardos Global · All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogDetailPage;