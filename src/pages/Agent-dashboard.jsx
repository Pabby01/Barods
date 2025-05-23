/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Bell, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import axios from "axios";
import toast from "react-hot-toast";
import "./Dashboard.css";

// Utility function to format prices
const formatPrice = (price) => {
  if (!price) return "N/A";
  return `₦${price.toLocaleString()}`;
};

// Function to render the sales chart
const renderSalesChart = (salesData) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={salesData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="sales" stroke="#FF5733" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const API_BASE_URL = "https://barods-global.onrender.com/api/v1/agent";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalListings: 0,
    closedDeals: 0,
    conversionRate: 0,
    averageSalesPrice: 0,
    salesTrend: [
      { month: "January", sales: 75 },
      { month: "February", sales: 25 },
      { month: "March", sales: 85 },
      { month: "April", sales: 40 },
      { month: "May", sales: 75 },
      { month: "June", sales: 45 },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("Month");
  const [userName, setUserName] = useState("Emmanuel");
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

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      navigate("/become-agent");
      return;
    }

    // Fetch data separately to handle individual failures
    const fetchData = async () => {
      try {
        await fetchAgentData();
      } catch (error) {
        console.error("Error fetching agent data:", error);
      }

      try {
        await fetchDashboardData();
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }

      try {
        await fetchNotifications();
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchData();
  }, []);

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

      // Log the response to debug
      console.log("Profile response:", response.data);

      // The data structure shows user object contains the profile info
      if (response.data.user) {
        const { fullName, email, accountID } = response.data.user;
        setAgentData({
          name: fullName || "User", // Changed from name to fullName
          email: email || "",
          image: null, // API doesn't seem to return image yet
          id: accountID || null
        });
        setUserName(fullName || "User"); // Update userName state with fullName
      } else {
        throw new Error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching agent data:", error);
      // Set default values if fetch fails
      setAgentData({
        name: "User",
        email: "",
        image: null,
        id: null
      });
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.get(`${API_BASE_URL}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setDashboardData(response.data.data);
      } else {
        throw new Error(response.data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("Token");
      // Using the correct notifications endpoint
      const response = await axios.get(`${API_BASE_URL}/get-notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setNotifications(response.data.data || []);
      } else {
        throw new Error(response.data.message || "Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
      // Don't show error toast for notifications as they might not be implemented yet
      setNotifications([]);
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      const token = localStorage.getItem("Token");
      await axios.delete(`${API_BASE_URL}/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setNotifications(prev => prev.filter(notif => notif.id !== id));
      toast.success("Notification deleted");
    } catch (error) {
      console.error("Error deleting notification:", error);
      toast.error("Failed to delete notification");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    toast.success("Logged out successfully");
    navigate("/become-agent");
  };

  const toggleNotifications = (e) => {
    e.stopPropagation();
    setShowNotifications(!showNotifications);
    setShowUserDropdown(false);
  };

  const toggleUserDropdown = (e) => {
    e.stopPropagation();
    setShowUserDropdown(!showUserDropdown);
    setShowNotifications(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar2" style={{ marginTop: '-0px' }}>
        <div className="logo-container">
          <div className="logo">
            <img src="/images/logo.png" alt="Barods Global Limited" />
            <div className="logo-subtitle">Real Estate and Construction</div>
          </div>
        </div>

        <div className="sidebar-menu">
          <div
            className="menu-item active"
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
          
          <div 
            className="menu-item" 
            onClick={() => handleNavigation('/properties3')}
          >
            <div className="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span>Properties</span>
          </div>
          
          <div 
            className="menu-item" 
            onClick={() => handleNavigation('/account')}
          >
            <div className="menu-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
            
            {/* Windows */}
            <rect x="105" y="60" width="5" height="5" fill="#004D00" />
            <rect x="115" y="60" width="5" height="5" fill="#004D00" />
            <rect x="105" y="70" width="5" height="5" fill="#004D00" />
            <rect x="115" y="70" width="5" height="5" fill="#004D00" />
            <rect x="185" y="70" width="5" height="5" fill="#004D00" />
            <rect x="195" y="70" width="5" height="5" fill="#004D00" />
            <rect x="185" y="80" width="5" height="5" fill="#004D00" />
            <rect x="195" y="80" width="5" height="5" fill="#004D00" />
          </svg>
        </div>
      </div>
      
      {/* Main content */}
      <div className="main-content">
        {/* Top bar */}
        <div className="top-bar">
          <div className="welcome-section">
            <h1 className="page-title">Dashboard</h1>
            <p className="welcome-text">Welcome, {agentData.name}</p>
          </div>
          <div className="user-section">
            <div className="notification-wrapper" ref={notificationsRef}>
              {/* Notifications */}
              <div
                className="notification-icon"
                onClick={toggleNotifications}
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

            {/* User Profile */}
            <div className="user-wrapper" ref={userDropdownRef}>
              <div
                className="user-profile"
                onClick={toggleUserDropdown}
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
                  <button onClick={() => handleNavigation("/account")}>
                    My Profile
                  </button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="dashboard-content">
          {/* Stats cards */}
          <div className="stats-grid">
            <div className="stats-card">
              <div className="stats-header">
                <div className="stats-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" fill="currentColor" />
                  </svg>
                </div>
                <div className="stats-label">Total Listings</div>
              </div>
              <div className="stats-value">{dashboardData.totalListings}</div>
              {dashboardData.totalListings > 0 && <div className="stats-action">View All</div>}
            </div>
            
            <div className="stats-card">
              <div className="stats-header">
                <div className="stats-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4h2v4zm0-6h-2V7h2v4zm4 6h-2v-8h2v8zm0-10h-2V7h2v4z" fill="currentColor" />
                  </svg>
                </div>
                <div className="stats-label">Closed Deals</div>
              </div>
              <div className="stats-value">{dashboardData.closedDeals}</div>
              {dashboardData.closedDeals > 0 && <div className="stats-trend negative">↓ 10%</div>}
            </div>
            
            <div className="stats-card">
              <div className="stats-header">
                <div className="stats-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor" />
                  </svg>
                </div>
                <div className="stats-label">Conversion Rate</div>
              </div>
              <div className="stats-value">{dashboardData.conversionRate > 0 ? `${dashboardData.conversionRate}%` : '0'}</div>
              {dashboardData.conversionRate > 0 && <div className="stats-trend negative">↓ 10%</div>}
            </div>
            
            <div className="stats-card">
              <div className="stats-header">
                <div className="stats-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="currentColor" />
                  </svg>
                </div>
                <div className="stats-label">Average Sales Price</div>
              </div>
              <div className="stats-value">{formatPrice(dashboardData.averageSalesPrice)}</div>
              {dashboardData.averageSalesPrice > 0 && <div className="stats-trend negative">↓ 10%</div>}
            </div>
          </div>
          
          {/* Sales trend chart */}
          <div className="chart-section">
            <div className="chart-header">
              <h3 className="chart-title">Sales Trend</h3>
              <div className="timeframe-selector">
                <span>{timeframe}</span>
                <ChevronDown size={16} />
              </div>
            </div>
            {renderSalesChart(dashboardData.salesTrend)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;