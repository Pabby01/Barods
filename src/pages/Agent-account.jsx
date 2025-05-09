// AccountPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AccountPage.css";
import { FaUpload, FaArrowRight, FaBars, FaBell, FaUserCircle } from "react-icons/fa";

const AccountPage = () => {
  const [userInfo, setUserInfo] = useState({
    accountId: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    profileImage: null,
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo({
          ...userInfo,
          profileImage: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateProfile = () => {
    const newErrors = {};
    if (!userInfo.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }
    if (!userInfo.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!userInfo.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required.";
    } else if (!/^\d+$/.test(userInfo.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must contain only digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePassword = () => {
    const newErrors = {};
    if (!passwords.oldPassword.trim()) {
      newErrors.oldPassword = "Old password is required.";
    }
    if (!passwords.newPassword.trim()) {
      newErrors.newPassword = "New password is required.";
    } else if (passwords.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters.";
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveChanges = () => {
    if (!validateProfile()) {
      return;
    }

    // Simulate API call to save user info
    console.log("Saving user info:", userInfo);

    // Show notification
    setNotification({
      show: true,
      message: "Profile information updated successfully!",
      type: "success",
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 3000);
  };

  const updatePassword = () => {
    if (!validatePassword()) {
      return;
    }

    // Simulate API call to update password
    console.log("Updating password");

    // Clear password fields and show success notification
    setPasswords({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setNotification({
      show: true,
      message: "Password updated successfully!",
      type: "success",
    });

    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 3000);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("userToken");

    // Show a success notification
    toast.success("Logged out successfully!");

    // Redirect to the login page
    navigate("/become-agent");
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="logo-container">
          <img src="/images/logo.png" alt="Barods Global Limited" className="logo" />
        </div>

        <div className="sidebar-menu">
          {/* Dashboard */}
          <div className="menu-item" onClick={() => handleNavigation("/dashboard")}>
            <div className="menu-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="3"
                  width="7"
                  height="7"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="14"
                  y="3"
                  width="7"
                  height="7"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="3"
                  y="14"
                  width="7"
                  height="7"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <rect
                  x="14"
                  y="14"
                  width="7"
                  height="7"
                  rx="1"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <span>Dashboard</span>
          </div>

          {/* Properties */}
          <div className="menu-item" onClick={() => handleNavigation("/properties3")}>
            <div className="menu-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 22V12H15V22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>Properties</span>
          </div>

          {/* Account */}
          <div className="menu-item active" onClick={() => handleNavigation("/account")}>
            <div className="menu-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>Account</span>
          </div>

          {/* Logout */}
          <div className="menu-item logout" onClick={handleLogout}>
            <div className="menu-icon">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 17L21 12L16 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 12H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span>Logout</span>
          </div>
        </div>
        {/* Cityscape silhouette */}
        <div className="cityscape">
          <svg width="100%" height="150" viewBox="0 0 300 150" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="60" width="15" height="90" fill="#004D00" />
            <rect x="20" y="80" width="15" height="70" fill="#004D00" />
            <rect x="40" y="100" width="15" height="50" fill="#004D00" />
            <rect x="60" y="70" width="15" height="80" fill="#004D00" />
            <rect x="80" y="90" width="15" height="60" fill="#004D00" />
            <rect x="100" y="50" width="25" height="100" fill="#004D00" />
            <rect x="130" y="70" width="20" height="80" fill="#004D00" />
            <rect x="155" y="90" width="15" height="60" fill="#004D00" />
            <rect x="180" y="60" width="30" height="90" fill="#004D00" />
            <rect x="215" y="80" width="25" height="70" fill="#004D00" />
            <rect x="245" y="100" width="15" height="50" fill="#004D00" />
            <rect x="265" y="70" width="35" height="80" fill="#004D00" />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <FaBars />
            </button>
            <h3 className="page-title">Account</h3>
          </div>
          <div className="header-right">
            <div className="notification-icon">
              <FaBell />
            </div>
            <div className="user-profile">
              {userInfo.profileImage ? (
                <img src={userInfo.profileImage} alt="User" className="profile-pic" />
              ) : (
                <FaUserCircle className="profile-pic-placeholder" />
              )}
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="content-area">
          {notification.show && (
            <div className={`notification ${notification.type}`}>
              {notification.message}
            </div>
          )}

          <div className="account-sections-container">
            {/* Profile Section */}
            <div className="account-section">
              <h3 className="section-title">My Account</h3>
              <div className="form-group">
                <label htmlFor="fullName">Full name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={userInfo.fullName}
                  onChange={handleInfoChange}
                />
                {errors.fullName && <p className="error-message">{errors.fullName}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleInfoChange}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  onChange={handleInfoChange}
                />
                {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="profileImage">Image</label>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>

              <button className="save-button" onClick={saveChanges}>
                Save Changes <FaArrowRight className="button-icon" />
              </button>
            </div>

            {/* Password Section */}
            <div className="account-section">
              <h3 className="section-title">Change Password</h3>
              <div className="form-group">
                <label htmlFor="oldPassword">Old Password</label>
                <input
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  placeholder="Enter Password"
                  value={passwords.oldPassword}
                  onChange={handlePasswordChange}
                />
                {errors.oldPassword && <p className="error-message">{errors.oldPassword}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Enter Password"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />
                {errors.newPassword && <p className="error-message">{errors.newPassword}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Enter Password"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                />
                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
              </div>

              <button className="change-password-button" onClick={updatePassword}>
                Change Password <FaArrowRight className="button-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;