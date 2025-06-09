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
    console.log('Checking authentication status');
    const adminToken = localStorage.getItem('AdminToken');
    if (adminToken) {
      console.log('Admin token found, redirecting to dashboard');
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
    
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Form data being submitted:', formData);
    
    // Show loading toast
    const loadingToast = toast.loading('Logging in...');

    try {
      console.log('Making API request to:', 'https://barods-global.onrender.com/api/v1/admin/login');
      
      const response = await axios.post(
        'https://barods-global.onrender.com/api/v1/admin/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('API response received:', response);
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);

      // Inside the handleSubmit function, replace the if condition and its contents
      
      // From this:
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
      
      // To this:
      if (response.data.token) {
        console.log('Login successful, token received');
        
        // Store token in localStorage
        localStorage.setItem('AdminToken', response.data.token);
        localStorage.setItem('token', response.data.token); // Also store as 'token' for consistency
        
        // If admin data is available in the response, store it
        if (response.data.admin) {
          localStorage.setItem('adminName', response.data.admin.fullName || '');
          localStorage.setItem('adminEmail', response.data.admin.email || '');
        } else {
          // If admin data is not in the response, store email from form
          localStorage.setItem('adminEmail', formData.email);
        }
        
        // Dismiss loading toast and show success
        toast.dismiss(loadingToast);
        toast.success(response.data.msg || 'Login successful! Redirecting to dashboard...');
        
        // Short delay before redirect for better UX
        setTimeout(() => {
          console.log('Navigating to dashboard');
          navigate('/admin/dashboard');
        }, 1000);
      } else {
        console.log('Login failed: No token in response');
        toast.dismiss(loadingToast);
        toast.error('Login failed: ' + (response.data.msg || 'Authentication failed'));
      }
    } catch (error) {
      console.error('=== LOGIN ERROR ===');
      console.error('Login error:', error);
      
      // Log the full error object
      console.log('Full error object:', JSON.stringify(error, null, 2));
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      // Detailed error handling
      if (error.response) {
        const statusCode = error.response.status;
        const errorData = error.response.data;
        
        console.log('Error status code:', statusCode);
        console.log('Error response data:', errorData);
        
        // Handle specific status codes
        if (statusCode === 401) {
          console.log('401 Unauthorized: Invalid credentials');
          toast.error('Invalid email or password');
        } else if (statusCode === 403) {
          console.log('403 Forbidden: Account not authorized');
          toast.error('Your account is not authorized');
        } else {
          console.log(`Error ${statusCode}: ${errorData.message || 'Unknown error'}`);
          toast.error(errorData.message || `Error ${statusCode}: Login failed`);
        }
      } else if (error.request) {
        console.log('No response received from server');
        console.log('Request details:', error.request);
        toast.error('No response from server. Please try again later.');
      } else {
        console.log('Error setting up request:', error.message);
        toast.error('Error setting up request: ' + error.message);
      }
    } finally {
      console.log('Login attempt completed, setting loading to false');
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