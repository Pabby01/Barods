import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './AdminLogin.css';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('AdminToken');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setLoading(true);

    try {
      // Get existing admin token if available (for authorization)
      const token = localStorage.getItem('AdminToken');
      
      const response = await axios.post(
        'https://barods-global.onrender.com/api/v1/admin/signup',
        {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // Include authorization if token exists (might be required for admin creation)
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
        }
      );

      if (response.data.success) {
        toast.success('Admin account created successfully!');
        // Store token if provided in response
        if (response.data.token) {
          localStorage.setItem('AdminToken', response.data.token);
          localStorage.setItem('adminName', response.data.admin?.fullName || formData.fullName);
          localStorage.setItem('adminEmail', response.data.admin?.email || formData.email);
          navigate('/admin/dashboard'); // Redirect to dashboard if token provided
        } else {
          navigate('/admin'); // Otherwise redirect to login
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      
      // Detailed error handling
      if (error.response) {
        const statusCode = error.response.status;
        const errorMessage = error.response.data.message || `Error ${statusCode}`;
        
        // Handle specific status codes
        if (statusCode === 403) {
          toast.error('Permission denied. You may need admin privileges to create new admin accounts.');
        } else if (statusCode === 409) {
          toast.error('An account with this email already exists.');
        } else {
          toast.error(errorMessage);
        }
        
        console.log('Error data:', error.response.data);
      } else if (error.request) {
        toast.error('No response from server. Please try again later.');
        console.log('Error request:', error.request);
      } else {
        toast.error('Error setting up request: ' + error.message);
        console.log('Error message:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-image-section">
        <div className="overlay"></div>
      </div>

      <div className="login-form-section">
        <div className="login-header">
          <img src="/images/logo.png" alt="Barods Global Limited" className="logo" />
          <h1>Create Admin Account</h1>
          <p>Fill in the details below to create a new admin account</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <button
            type="button"
            className="forgot-password"
            onClick={() => navigate('/admin')}
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;