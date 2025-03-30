import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '/images/barods-logo.png';
import Success from './Success';
import './create-password.css';

const CreatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  const validatePassword = (pass) => {
    const requirements = {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pass)
    };
    
    setPasswordRequirements(requirements);
    
    if (pass && !requirements.length) {
      setPasswordError('Password does not fulfill requirements');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (pass, confirm) => {
    if (pass && confirm && pass !== confirm) {
      setConfirmError('Passwords do not match');
      return false;
    }
    
    setConfirmError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate password
    const isPasswordValid = validatePassword(password);
    const isConfirmValid = validateConfirmPassword(password, confirmPassword);
    
    if (!isPasswordValid || !isConfirmValid) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('https://api.barodsglobal.com/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token,
          password 
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setShowSuccess(true);
      } else {
        alert(data.message || 'Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Request error:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (password) {
      validatePassword(password);
    }
    
    if (password && confirmPassword) {
      validateConfirmPassword(password, confirmPassword);
    }
  }, [password, confirmPassword]);

  if (showSuccess) {
    return <Success message="Password has been successfully reset." buttonText="Proceed to Login" onAction={() => navigate('/')} />;
  }

  return (
    <div className="login-container">
      <div className="city-background"></div>
      <div className="login-form-container">
        <div className="logo-container">
          <img src={logo} alt="Barods Global Limited" className="logo" />
        </div>
        <h3>Create New Password</h3>
        <p>Input a new password to reset.</p>
        
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${passwordError ? 'error' : ''}`}>
            <input
              type="password"
              placeholder="Enter New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>
          
          <div className={`form-group ${confirmError ? 'error' : ''}`}>
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {confirmError && <div className="error-message">{confirmError}</div>}
          </div>
          
          <div className="password-requirements">
            <div className={`requirement ${passwordRequirements.length ? 'met' : ''}`}>
              <span className="indicator"></span> 8 characters
            </div>
            <div className={`requirement ${passwordRequirements.uppercase ? 'met' : ''}`}>
              <span className="indicator"></span> 1 uppercase
            </div>
            <div className={`requirement ${passwordRequirements.lowercase ? 'met' : ''}`}>
              <span className="indicator"></span> 1 lowercase
            </div>
            <div className={`requirement ${passwordRequirements.number ? 'met' : ''}`}>
              <span className="indicator"></span> 1 number
            </div>
            <div className={`requirement ${passwordRequirements.special ? 'met' : ''}`}>
              <span className="indicator"></span> 1 special character
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset password'}
          </button>
        </form>
        
        <div className="go-back">
          <button 
            onClick={() => navigate('/')}
            className="btn-link"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;