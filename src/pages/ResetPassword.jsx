/* eslint-disable no-unused-vars */
 
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/auth.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [passwords, setPasswords] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const token = searchParams.get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (passwords.password !== passwords.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (passwords.password.length < 6) {
      toast.error('Password must be at least 6 characters long!');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://barods-global.onrender.com/api/v1/user//resetpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword: passwords.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Password has been reset successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        toast.error(data.message || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  if (!token) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <div className="auth-content">
            <h3 className="auth-title">Invalid Reset Link</h3>
            <p className="auth-description">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <button 
              className="auth-button"
              onClick={() => navigate('/forgot-password')}
            >
              Request New Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <ToastContainer />
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-logo-container">
            <img src="/images/barods-logo.png" alt="Barods Global Limited" className="auth-logo2" />
          </div>
          
          <h3 className="auth-title">Reset Password</h3>
          <p className="auth-description">
            Enter your new password below.
          </p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-group password-group">
              <input
                type={showPassword.password ? 'text' : 'password'}
                placeholder="New Password"
                value={passwords.password}
                onChange={(e) => setPasswords(prev => ({ ...prev, password: e.target.value }))}
                required
                className="auth-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility('password')}
              >
                {showPassword.password ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="auth-input-group password-group">
              <input
                type={showPassword.confirmPassword ? 'text' : 'password'}
                placeholder="Confirm New Password"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords(prev => ({ ...prev, confirmPassword: e.target.value }))}
                required
                className="auth-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility('confirmPassword')}
              >
                {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            <button 
              type="submit" 
              className="auth-button" 
              disabled={isLoading}
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;