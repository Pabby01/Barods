import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/images/barods-logo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://barods-global-eight.vercel.app/api/v1/agent/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          // This bypasses CORS but limits the response data
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed. Please try again.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message || "An error occurred during login. Please try again.");
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
        <h3>Log In</h3>
        <p>Kindly fill the details below to login</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              )}
            </button>
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <div className="forgot-password">
          <button onClick={() => navigate("/forgot-password")} className="btn-link">
            Forgot Password?
          </button>
        </div>

        <div className="create-account">
          <p>
            Don't have an account?{" "}
            <button onClick={() => navigate("/register")} className="btn-link">
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;