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
  FaChevronRight, 
  FaEdit, 
  FaTrash 
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "../styles/blog-detail.css";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
    const blogData = {
      id: parseInt(id),
      title: "The Ultimate Guide to Off-Plan Property Investments: Challenges and Solutions",
      image: "/images/Recent-3.png",
      content: `
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit...</p>
      `,
      author: "James Kofi",
      date: "Nov 15, 2024",
      comments: 8,
      tags: ["Property Investment", "Real Estate", "Off-Plan", "Investment Guide"]
    };

    const relatedPostsData = [
      { id: 2, title: "Getting the best Nigerian Property", image: "/images/team-ladies.png", date: "Nov 15, 2024" },
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

    if (editingCommentId !== null) {
      // Edit existing comment
      setComments(prev =>
        prev.map(c =>
          c.id === editingCommentId ? { ...c, ...comment } : c
        )
      );
      toast.success("Comment updated successfully!");
      setEditingCommentId(null);
    } else {
      // Add new comment
      const newComment = {
        id: Date.now(),
        ...comment
      };
      setComments(prev => [...prev, newComment]);
      toast.success("Comment added successfully!");
    }

    // Reset the comment form
    setComment({ name: "", email: "", message: "" });
  };

  const handleEditComment = (id) => {
    const commentToEdit = comments.find(c => c.id === id);
    setComment(commentToEdit);
    setEditingCommentId(id);
  };

  const handleDeleteComment = (id) => {
    setComments(prev => prev.filter(c => c.id !== id));
    toast.success("Comment deleted successfully!");
  };

  if (!blog) return <div className="loading"><div className="spinner"></div></div>;

  return (
    <div className="page-container">
      <ToastContainer /> {/* Add ToastContainer for notifications */}
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
            <h3>Comments</h3>
            <ul className="comments-list">
              {comments.map(c => (
                <li key={c.id} className="comment-item">
                  <div className="comment-header">
                    <strong>{c.name}</strong> <span>({c.email})</span>
                  </div>
                  <p>{c.message}</p>
                  <div className="comment-actions">
                    <button onClick={() => handleEditComment(c.id)} className="edit-btn">
                      <FaEdit /> Edit
                    </button>
                    <button onClick={() => handleDeleteComment(c.id)} className="delete-btn">
                      <FaTrash /> Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

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
              <button type="submit">{editingCommentId ? "Update Comment" : "Submit"}</button>
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
                      <h3>{post.title}</h3>
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