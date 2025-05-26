/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "../styles/auth.css";

const LoginRegister = ({ initialMode = "login" }) => {
  const [isRegister, setIsRegister] = useState(initialMode === "register");
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  
  // Initialize Google Sign-In API
  useEffect(() => {
    // Load the Google Sign-In API script
    const loadGoogleScript = () => {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    };

    // Initialize Google Sign-In once the script is loaded
    const initializeGoogleSignIn = () => {
      if (window.google && window.google.accounts) {
        window.google.accounts.id.initialize({
          client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with your actual Google Client ID
          callback: handleGoogleSignIn,
        });
      }
    };

    loadGoogleScript();

    // Clean up
    return () => {
      const scriptTag = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (scriptTag) {
        document.body.removeChild(scriptTag);
      }
    };
  }, []);

  // Handle Google Sign-In response
  const handleGoogleSignIn = (response) => {
    setIsGoogleLoading(true);
    // The response contains a JWT token with user info
    if (response.credential) {
      // Process the Google sign-in
      const credential = response.credential;
      
      // Here you would typically:
      // 1. Send this credential to your backend
      // 2. Verify the token on your server
      // 3. Create a session or return a JWT for your app
      
      console.log("Google Authentication Successful:", credential);
      
      // Simulate API call delay
      setTimeout(() => {
        setIsGoogleLoading(false);
        // Here you would handle successful authentication (redirect, set auth state, etc.)
      }, 1000);
    } else {
      setIsGoogleLoading(false);
      console.error("Google Authentication Failed");
    }
  };

  // Manual trigger for Google Sign-In
  const triggerGoogleSignIn = () => {
    setIsGoogleLoading(true);
    if (window.google && window.google.accounts) {
      window.google.accounts.id.prompt();
    } else {
      console.error("Google Sign-In API not loaded");
      setIsGoogleLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const firstName = document.querySelector('input[placeholder="First Name"]').value;
    const lastName = document.querySelector('input[placeholder="Last Name"]').value;
    const email = document.querySelector('input[placeholder="Email"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;

    if (!firstName || !lastName || !email || !password) {
      toast.error("Please fill in all fields."); // Show error notification
      return;
    }

    try {
      const response = await fetch("https://barods-global.onrender.com/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show a success notification
        toast.success("Account created successfully!");

        // Switch to login mode after successful sign-up
        setIsRegister(false);
      } else {
        // Show an error notification
        toast.error(data.message || "Failed to create account. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      toast.error("An error occurred. Please try again later."); // Show error notification
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = document.querySelector('input[placeholder="Email"]').value;
    const password = document.querySelector('input[placeholder="Password"]').value;

    if (!email || !password) {
      toast.error("Please fill in all fields."); // Show error notification
      return;
    }

    try {
      const response = await fetch("https://barods-global.onrender.com/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token to localStorage
        localStorage.setItem("userToken", data.token);

        // Show a success notification
        toast.success("Login successful!");

        // Redirect to the homepage after a short delay
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        toast.error(data.message || "Failed to log in. Please try again."); // Show error notification
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again later."); // Show error notification
    }
  };
  
  return (
    <div className="auth-page">
      <ToastContainer /> {/* Add ToastContainer for notifications */}
      <div className="auth-container">
        <div className="auth-content">
          <div className="auth-logo-container">
            <img src="/images/barods-logo.png" alt="Barods Global Limited" className="auth-logo2" />
          </div>
          
          {isRegister ? (
            // Register Form
            <>
              <h3 className="auth-title">Create an Account</h3>
              <p className="auth-switch-text">
                Already have an account? <a href="#" className="auth-link" onClick={(e) => { e.preventDefault(); setIsRegister(false); }}>Login</a>
              </p>
              
              <div className="auth-form">
                <div className="auth-name-fields">
                  <div className="auth-input-group">
                    <input type="text" placeholder="First Name" className="auth-input" />
                  </div>
                  <div className="auth-input-group">
                    <input type="text" placeholder="Last Name" className="auth-input" />
                  </div>
                </div>
                
                <div className="auth-input-group">
                  <input type="email" placeholder="Email" className="auth-input" />
                </div>
                
                <div className="auth-input-group password-group">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    className="auth-input" 
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                
                <div className="auth-checkbox-group">
                  <input type="checkbox" id="terms" />
                  <label htmlFor="terms">I agree to the <a href="#" className="terms-link">Terms & Conditions</a></label>
                </div>
                
                <button className="auth-button create-account-btn" onClick={handleSignUp}>
                  Create account
                </button>
                
                <div className="auth-divider">
                  <span>or sign up with</span>
                </div>
                
                <button 
                  className="auth-social-button"
                  onClick={triggerGoogleSignIn}
                  disabled={isGoogleLoading}
                >
                  {isGoogleLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <img src="/images/google-icon.png" alt="Google" className="google-icon" />
                      Google
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            // Login Form
            <>
              <h3 className="auth-title2">Log In</h3>
              <p className="auth-switch-text">
                Don't have an account? <a href="#" className="auth-link" onClick={(e) => { e.preventDefault(); setIsRegister(true); }}>Register</a>.
              </p>
              
              <div className="auth-form">
                <div className="auth-input-group">
                  <input type="email" placeholder="Email" className="auth-input" />
                </div>
                
                <div className="auth-input-group password-group">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                    className="auth-input" 
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                
                <a 
                  href="#" 
                  className="forgot-password" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/forgot';
                  }}
                >
                  Forgot Password?
                </a>
                
                <button className="auth-button login-btn" onClick={handleLogin}>Log in</button>
                
                <div className="auth-divider">
                  <span>or log in with</span>
                </div>
                
                <button 
                  className="auth-social-button"
                  onClick={triggerGoogleSignIn}
                  disabled={isGoogleLoading}
                >
                  {isGoogleLoading ? (
                    "Processing..."
                  ) : (
                    <>
                      <img src="/images/google.png" alt="Google" className="google-icon" />
                      Google
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;