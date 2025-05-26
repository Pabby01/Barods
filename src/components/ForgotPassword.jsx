/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/images/barods-logo.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './forgot-password.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('https://barods-global-eight.vercel.app/api/v1/agent/forgotpass', {
        mode: 'cors',
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success('Password reset link sent to your email');
        navigate('/reset-password');
      } else {
        toast.error(data.message || 'Failed to send reset link. Please try again.');
      }
    } catch (error) {
      console.error('Request error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="city-background2"></div>
      <div className="login-form-container">
        <div className="logo-container">
          <img src={logo} alt="Barods Global Limited" className="logo" />
        </div>
        <h3>Forgot Password</h3>
        <p>Enter email address below to receive your reset password link</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send reset password link'}
          </button>
        </form>
        
        <div className="go-back">
          <button 
            onClick={() => navigate('/become-agent')}
            className="btn-link"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;