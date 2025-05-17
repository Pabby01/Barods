/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, User, ChevronDown, Menu } from "lucide-react";
import PropTypes from 'prop-types';
import toast from "react-hot-toast";
import "./AgentLayout.css";

const AgentLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: localStorage.getItem("userName") || "User",
    email: localStorage.getItem("userEmail") || "",
    image: localStorage.getItem("userImage") || null,
  });

  const navigate = useNavigate();
  const notificationsRef = useRef(null);
  const userDropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      navigate("/become-agent");
      return;
    }

    fetchNotifications();
  }, [navigate]);

  const fetchNotifications = async () => {
    // Replace with actual API call
    setNotifications([
      { id: 1, message: "New property listed" },
      { id: 2, message: "Profile updated" },
      { id: 3, message: "New deal closed" },
    ]);
  };

  const handleDeleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast.success("Notification deleted");
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userImage");
    toast.success("Logged out successfully");
    navigate("/become-agent");
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: "Properties",
      path: "/properties3",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    },
    {
      title: "Account",
      path: "/account",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      )
    }
  ];

  return (
    <div className="agent-layout">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="logo-container">
          <img src="/images/logo.png" alt="Barods Global Limited" />
          <div className="logo-subtitle">Real Estate and Construction</div>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <div className="menu-icon">{item.icon}</div>
              <span>{item.title}</span>
            </button>
          ))}
        </nav>

        {/* Cityscape */}
        <div className="cityscape">
          {/* Your existing cityscape SVG */}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-section">
        {/* Header */}
        <header className="agent-header">
          <div className="header-left">
            <button className="menu-toggle" onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
          </div>

          <div className="header-right">
            {/* Notifications */}
            <div className="notifications" ref={notificationsRef}>
              <button
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="notification-badge">{notifications.length}</span>
                )}
              </button>

              {showNotifications && (
                <div className="notifications-dropdown">
                  <h3>Notifications</h3>
                  {notifications.map(notification => (
                    <div key={notification.id} className="notification-item">
                      <p>{notification.message}</p>
                      <button onClick={() => handleDeleteNotification(notification.id)}>
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User Profile */}
            <div className="user-profile" ref={userDropdownRef}>
              <button
                className="profile-btn"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                {userInfo.image ? (
                  <img src={userInfo.image} alt={userInfo.name} className="profile-image" />
                ) : (
                  <User size={20} />
                )}
                <span>{userInfo.name}</span>
                <ChevronDown size={16} />
              </button>

              {showUserDropdown && (
                <div className="user-dropdown">
                  <button onClick={() => navigate("/account")}>My Profile</button>
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
};
AgentLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AgentLayout;
