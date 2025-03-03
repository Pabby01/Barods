/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/auth.css"; // Import styles

const LoginRegisterModal = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">
      <div className="auth-modal">
        <img className="auth-logo" src="/images/barods-logo.png" alt="Barods Global Logo" />

        {isRegister ? (
          // Register Form
          <div className="auth-form">
            <h2>Create an Account</h2>
            <p>
              Already have an account?{" "}
              <span className="toggle-link" onClick={() => setIsRegister(false)}>Login</span>
            </p>
            <div className="input-group">
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
            </div>
            <input type="email" placeholder="Email" required />
            <div className="password-group">
              <input type={showPassword ? "text" : "password"} placeholder="Password" required />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <label className="terms">
              <input type="checkbox" required /> I agree to the <a href="#">Terms & Conditions</a>
            </label>
            <button className="auth-btn register">Create account</button>
          </div>
        ) : (
          // Login Form
          <div className="auth-form">
            <h2>Log In</h2>
            <p>
              Don&apos;t have an account?{" "}
              <span className="toggle-link" onClick={() => setIsRegister(true)}>Register.</span>
            </p>
            <input type="email" placeholder="Email" required />
            <div className="password-group">
              <input type={showPassword ? "text" : "password"} placeholder="Password" required />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <a href="#" className="forgot-password">Forgot Password?</a>
            <button className="auth-btn login">Log in</button>
          </div>
        )}

        <div className="divider">or log in with</div>
        <button className="google-btn">
          <img src="/images/google-icon.png" alt="Google Icon" />
          Google
        </button>
      </div>
    </div>
  );
};

export default LoginRegisterModal;
