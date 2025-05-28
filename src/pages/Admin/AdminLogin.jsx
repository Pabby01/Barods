import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './AdminLogin.css';

const AdminLogin = () => {
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
    const loadingToast = toast.loading('Logging in...');

    try {
      const response = await axios.post(
        'https://barods-global.onrender.com/api/v1/admin/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        // Store admin data in localStorage
        localStorage.setItem('AdminToken', response.data.token);
        localStorage.setItem('adminName', response.data.admin.fullName);
        localStorage.setItem('adminEmail', response.data.admin.email);
        
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success('Login successful! Redirecting to dashboard...');
        
        // Short delay before redirect for better UX
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 1000);
      }
    } catch (error) {
      console.error('Login error:', error);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Detailed error handling
      if (error.response) {
        const statusCode = error.response.status;
        const errorMessage = error.response.data.message || `Error ${statusCode}`;
        
        // Handle specific status codes
        if (statusCode === 401) {
          toast.error('Invalid email or password');
        } else if (statusCode === 403) {
          toast.error('Your account is not authorized');
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

  const handleForgotPassword = () => {
    navigate('/admin/forgot-password');
  };

  return (
    <div className="admin-login-container">
      <div className="login-image-section">
        <div className="overlay"></div>
      </div>

      <div className="login-form-section">
        <div className="login-header">
          <img src="/images/logo.png" alt="Barods Global Limited" className="logo" />
          <h1>Admin Log In</h1>
          <p>Kindly fill the details below to login</p>
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
            {loading ? 'Logging in...' : 'Log in'}
          </button>

          <div className="admin-links">
            <button
              type="button"
              className="forgot-password"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
            
            <button
              type="button"
              className="forgot-password"
              onClick={() => navigate('/admin/signup')}
            >
              Create Admin Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;