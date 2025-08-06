/* eslint-disable no-unused-vars */
// AccountPage.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Change to react-hot-toast
import { Bell, User, ChevronDown } from "lucide-react"; // Use lucide-react icons
import { FaBars, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import "./AccountPage.css";

const API_BASE_URL = "https://barods-global.onrender.com/api/v1/agent";

// Add API endpoints constant at the top of the file
const ENDPOINTS = {
  PROFILE: "/profile",
  UPDATE_PROFILE: "/edit-profile", // Changed from update-profile
  CHANGE_PASSWORD: "/change-password"
};

// New endpoints for patch updates
const PATCH_ENDPOINTS = {
  UPDATE_PROFILE_PIC: "/update-profile-pic",
  UPDATE_EMAIL: "/update/email"
};

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
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const notificationsRef = useRef(null);
  const userDropdownRef = useRef(null);
  const [agentData, setAgentData] = useState({
    name: "",
    email: "",
    image: null,
    id: null
  });

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
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("Image size should be less than 5MB");
        return;
      }

      // Store the actual file
      setUserInfo(prev => ({
        ...prev,
        profileImage: file
      }));

      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserInfo(prev => ({
          ...prev,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateProfile = () => {
    const errors = {};

    if (!userInfo.fullName?.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!userInfo.email?.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      errors.email = "Invalid email format";
    }

    if (userInfo.profileImage && userInfo.profileImage.size > 5 * 1024 * 1024) {
      errors.profileImage = "Image size should be less than 5MB";
    }

    // Update error state
    setErrors(errors);

    // Return true if no errors
    return Object.keys(errors).length === 0;
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

  // New: Patch only profile picture
  const updateProfilePicture = async () => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        toast.error("Not authenticated");
        return;
      }
      if (!userInfo.profileImage || !(userInfo.profileImage instanceof File)) {
        toast.error("Please select an image to upload");
        return;
      }
      const formData = new FormData();
      // Ensure the field name matches backend expectation
      formData.append("profileImage", userInfo.profileImage);

      const response = await axios.patch(
        `${API_BASE_URL}${PATCH_ENDPOINTS.UPDATE_PROFILE_PIC}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data?.success) {
        toast.success("Profile picture updated successfully!");
        fetchAgentData();
      } else {
        throw new Error(response.data?.message || "Failed to update profile picture");
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      console.error("Error response:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to update profile picture");
    }
  };

  // New: Patch only email
  const updateEmail = async () => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        toast.error("Not authenticated");
        return;
      }
      if (!userInfo.email) {
        toast.error("Please enter a valid email");
        return;
      }
      const response = await axios.patch(
        `${API_BASE_URL}${PATCH_ENDPOINTS.UPDATE_EMAIL}`,
        { email: userInfo.email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      if (response.data?.success) {
        toast.success("Email updated successfully!");
        fetchAgentData();
      } else {
        throw new Error(response.data?.message || "Failed to update email");
      }
    } catch (error) {
      console.error("Error updating email:", error);
      console.error("Error response:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to update email");
    }
  };

  // Update the saveChanges function
  const saveChanges = async () => {
    if (!validateProfile()) {
      return;
    }

    try {
      const token = localStorage.getItem("Token");
      const formData = new FormData();
      
      // Append text data
      formData.append("fullName", userInfo.fullName);
      formData.append("email", userInfo.email);
      formData.append("phoneNumber", userInfo.phoneNumber);

      // Append image if it exists
      if (userInfo.profileImage && userInfo.profileImage instanceof File) {
        formData.append("profileImage", userInfo.profileImage);
      }

      // Add debugging logs
      console.log("Request URL:", `${API_BASE_URL}${ENDPOINTS.UPDATE_PROFILE}`);
      console.log("FormData contents:", Object.fromEntries(formData.entries()));

      const response = await axios.put(
        `${API_BASE_URL}${ENDPOINTS.UPDATE_PROFILE}`,
        formData,
        {
          headers:
           {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Add response debugging
      console.log("Response:", response);

      if (response.data.success) {
        toast.success("Profile updated successfully!");
        fetchAgentData(); // Refresh the profile data
      } else {
        throw new Error(response.data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      
      // More detailed error logging
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
        console.log("Error response headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Error request:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error message:", error.message);
      }

      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const updatePassword = async () => {
    if (!validatePassword()) {
      return;
    }

    try {
      const token = localStorage.getItem("Token");
      const response = await axios.put(
        `${API_BASE_URL}/change-password`,
        {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast.success("Password updated successfully!");
        // Clear password fields
        setPasswords({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        throw new Error(response.data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("Token");

    // Show a success notification
    toast.success("Logged out successfully!");

    // Redirect to the login page
    navigate("/become-agent");
  };

  // Add useEffect for fetching agent data
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      navigate("/become-agent");
      return;
    }

    fetchAgentData();
    fetchNotifications();
  }, [navigate]);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Add fetch functions
  const fetchAgentData = async () => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.user) {
        const { fullName, email, accountID } = response.data.user;
        setAgentData({
          name: fullName || "User",
          email: email || "",
          image: null,
          id: accountID || null
        });
        // Pre-fill the form with user data
        setUserInfo(prev => ({
          ...prev,
          fullName: fullName || "",
          email: email || "",
          accountId: accountID || ""
        }));
      }
    } catch (error) {
      console.error("Error fetching agent data:", error);
      toast.error("Failed to load profile data");
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(`${API_BASE_URL}/get-notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setNotifications(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      const token = localStorage.getItem("Token");
      await axios.delete(`${API_BASE_URL}/delete-notification/${notificationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      // Remove the notification from the state
      setNotifications(notifications.filter(n => n.id !== notificationId));
      toast.success("Notification deleted successfully");
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification");
    }
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
        {/* Updated Header */}
        <header className="header">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <FaBars />
            </button>
            <h1 className="page-title">Account</h1>
          </div>
          <div className="header-right">
            <div className="notification-wrapper" ref={notificationsRef}>
              <div
                className="notification-icon"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="notification-badge">{notifications.length}</span>
                )}
              </div>
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h4>Notifications</h4>
                    {notifications.length > 0 && (
                      <button className="clear-all">Clear All</button>
                    )}
                  </div>
                  <div className="notifications-list">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div key={notification.id} className="notification-item">
                          <div className="notification-content">
                            <p>{notification.message}</p>
                            <span className="notification-time">
                              {new Date(notification.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <button 
                            className="delete-notification"
                            onClick={() => handleDeleteNotification(notification.id)}
                          >
                            ×
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="no-notifications">No notifications</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="user-wrapper" ref={userDropdownRef}>
              <div
                className="user-profile"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <div className="avatar">
                  {agentData.image ? (
                    <img 
                      src={agentData.image} 
                      alt={agentData.name}
                      className="profile-image"
                    />
                  ) : (
                    <User size={20} color="white" />
                  )}
                </div>
                <span className="user-name">{agentData.name}</span>
                <ChevronDown size={16} />
              </div>
              {showUserDropdown && (
                <div className="user-dropdown">
                  <button onClick={() => navigate("/account")}>My Profile</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
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
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={userInfo.fullName}
                  onChange={handleInfoChange}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
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
                <button className="save-button" onClick={updateEmail} style={{marginTop: "8px"}}>
                  Update Email <FaArrowRight className="button-icon" />
                </button>
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
                <label htmlFor="profileImage">Profile Image</label>
                <div className="image-upload-container">
                  {userInfo.imagePreview && (
                    <div className="image-preview">
                      <img src={userInfo.imagePreview} alt="Preview" />
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
                <p className="help-text">Max size: 5MB. Accepted formats: JPG, PNG</p>
                <button className="save-button" onClick={updateProfilePicture} style={{marginTop: "8px"}}>
                  Update Profile Picture <FaArrowRight className="button-icon" />
                </button>
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