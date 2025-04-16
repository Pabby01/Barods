import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/images/logo.png';
import './Register.css'; // Import the CSS file for styling
import Success from './Success';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false
  });
  
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    const requirements = {
      length: pass.length >= 8,
      uppercase: /[A-Z]/.test(pass),
      lowercase: /[a-z]/.test(pass),
      number: /[0-9]/.test(pass),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pass)
    };
    
    setPasswordRequirements(requirements);
    
    const allRequirementsMet = Object.values(requirements).every(req => req);
    
    if (!allRequirementsMet) {
      return false;
    }
    
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate email
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate phone
    if (!/^\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Validate password
    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password does not fulfill requirements';
    }
    
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await fetch('https://api.barodsglobal.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setShowSuccess(true);
      } else {
        alert(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData.password) {
      validatePassword(formData.password);
    }
  }, [formData.password]);

  if (showSuccess) {
    return <Success 
      message="Account created successfully! You can now log in." 
      buttonText="Proceed to Login" 
      onAction={() => navigate('/')} 
    />;
  }

  return (
    <div className="login-container">
      <div className="city-background"></div>
      <div className="login-form-container">
        <div className="logo-container">
          <img src={logo} alt="Barods Global Limited" className="logo" />
        </div>
        <h3>Create Account</h3>
        <p>Join Barods Global Limited as an agent</p>
        
        <form onSubmit={handleSubmit}>
          <div className={`form-group ${errors.fullName ? 'error' : ''}`}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && <div className="error-message">{errors.fullName}</div>}
          </div>
          
          <div className={`form-group ${errors.email ? 'error' : ''}`}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className={`form-group ${errors.phone ? 'error' : ''}`}>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {errors.phone && <div className="error-message">{errors.phone}</div>}
          </div>
          
          <div className={`form-group ${errors.password ? 'error' : ''}`}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          
          <div className={`form-group ${errors.confirmPassword ? 'error' : ''}`}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>
          
          
          
          <button 
            type="submit" 
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="login-link">
          <p>Already have an account? <button onClick={() => navigate('/become-agent')} className="btn-link">Log In</button></p>
        </div>
      </div>
    </div>
  );
};

export default Register;