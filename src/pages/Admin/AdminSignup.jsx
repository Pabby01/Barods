import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './AdminLogin.css';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
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
    setLoading(true);

    // Show loading toast
    const loadingToast = toast.loading('Creating account...');

    try {
      // Create the request payload exactly as expected by the API
      const requestData = {
        email: formData.email,
        password: formData.password
      };

      console.log('Sending request with data:', requestData);
      
      // Get the admin token for authorization
      const adminToken = localStorage.getItem('AdminToken');
      
      if (!adminToken) {
        toast.dismiss(loadingToast);
        toast.error('Admin authorization required. Please login first.');
        setLoading(false);
        navigate('/admin');
        return;
      }
      
      const response = await axios.post(
        'https://barods-global.onrender.com/api/v1/admin/signup',
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminToken}`
          }
        }
      );

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      if (response.data.success) {
        toast.success('Admin account created successfully!');
        // Store token if provided in response
        if (response.data.token) {
          localStorage.setItem('AdminToken', response.data.token);
          localStorage.setItem('adminEmail', response.data.admin?.email || formData.email);
          navigate('/admin/dashboard'); // Redirect to dashboard if token provided
        } else {
          navigate('/admin'); // Otherwise redirect to login
        }
      }
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      console.error('Signup error:', error);
      
      // Detailed error handling with more specific messages
      if (error.response) {
        const statusCode = error.response.status;
        const errorData = error.response.data;
        
        console.log('Error response data:', errorData);
        
        // Handle specific status codes
        if (statusCode === 400) {
          // Extract specific validation errors if available
          const errorMessage = errorData.message || 'Invalid request format. Please check your input.';
          toast.error(errorMessage);
        } else if (statusCode === 403) {
          toast.error('Permission denied. You need admin privileges to create new admin accounts.');
          // Redirect to login if not authorized
          navigate('/admin');
        } else if (statusCode === 409) {
          toast.error('An account with this email already exists.');
        } else {
          toast.error(errorData.message || `Error ${statusCode}: Signup failed`);
        }
      } else if (error.request) {
        toast.error('No response from server. Please try again later.');
      } else {
        toast.error('Error setting up request: ' + error.message);
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