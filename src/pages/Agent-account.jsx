// AccountPage.jsx
import React, { useState, useEffect } from 'react';
import './AccountPage.css';
import { FaUpload, FaArrowRight, FaBars, FaBell, FaUserCircle } from 'react-icons/fa';

const AccountPage = () => {
  const [userInfo, setUserInfo] = useState({
    accountId: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    profileImage: null
  });

  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo({
          ...userInfo,
          profileImage: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveChanges = () => {
    // Here you would typically make an API call to save the user info
    console.log('Saving user info:', userInfo);
    
    // Show notification
    setNotification({
      show: true,
      message: 'Profile information updated successfully!',
      type: 'success'
    });
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 3000);
  };

  const updatePassword = () => {
    // Validate passwords
    if (passwords.newPassword !== passwords.confirmPassword) {
      setNotification({
        show: true,
        message: 'New passwords do not match!',
        type: 'error'
      });
      setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      return;
    }

    if (passwords.newPassword.length < 6) {
      setNotification({
        show: true,
        message: 'Password must be at least 6 characters!',
        type: 'error'
      });
      setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      return;
    }

    // Here you would make an API call to update the password
    console.log('Updating password');
    
    // Clear password fields and show success notification
    setPasswords({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    setNotification({
      show: true,
      message: 'Password updated successfully!',
      type: 'success'
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

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="logo-container">
          <img src="/images/logo.png" alt="Barods Global Limited" className="logo" />
        </div>

        <div className="sidebar-menu">
          {/* Dashboard */}
          <div
            className="menu-item"
            onClick={() => handleNavigation("/dashboard")}
          >
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
          <div
            className="menu-item"
            onClick={() => handleNavigation("/properties3")}
          >
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
          <div
            className="menu-item active"
            onClick={() => handleNavigation("/account")}
          >
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
            <div className="account-section">
              <h3 className="section-title">My Account</h3>
              <div className="account-id-container">
                <p>Account ID: {userInfo.accountId}</p>
              </div>
              
              <div className="form-group">
                <label htmlFor="fullName">Full name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={userInfo.fullName}
                  onChange={handleInfoChange}
                />
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
              </div>
              
              <div className="form-group">
                <label htmlFor="profileImage">Image</label>
                <div className="image-upload-container">
                  {userInfo.profileImage ? (
                    <div className="profile-image-preview">
                      <img src={userInfo.profileImage} alt="Profile" />
                    </div>
                  ) : (
                    <div className="image-upload-placeholder">
                      <div className="upload-icon-container">
                        <FaUpload className="upload-icon" />
                      </div>
                      <p>Click to upload.</p>
                      <p className="file-formats">jpg/png/gif. 5MB</p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="file-input"
                  />
                </div>
              </div>
              
              <button className="save-button" onClick={saveChanges}>
                Save Changes <FaArrowRight className="button-icon" />
              </button>
            </div>
            
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