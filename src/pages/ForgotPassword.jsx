/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/auth.css';

const ForgotPassword2 = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://barods-global.onrender.com/api/v1/user/forgotpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Password reset link has been sent to your email!');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        toast.error(data.message || 'Failed to process request. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <ToastContainer />
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-logo-container">
            <img src="/images/barods-logo.png" alt="Barods Global Limited" className="auth-logo2" />
          </div>
          
          <h3 className="auth-title">Forgot Password</h3>
          <p className="auth-description">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />
            </div>
            
            <button 
              type="submit" 
              className="auth-button" 
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
            
            <div className="auth-links">
              <a 
                href="#" 
                className="auth-link" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/login');
                }}
              >
                Back to Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword2;