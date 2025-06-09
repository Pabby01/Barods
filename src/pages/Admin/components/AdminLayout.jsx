import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LayoutGrid, Building2, Users, UserCircle, Bell, Menu } from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const notificationsRef = useRef(null);
  const userDropdownRef = useRef(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
      icon: <LayoutGrid size={20} />
    },
    {
      title: 'Properties',
      path: '/admin/properties',
      icon: <Building2 size={20} />
    },
    {
      title: 'Agents',
      path: '/admin/agents',
      icon: <Users size={20} />
    },
   
  ];

  const handleLogout = () => {
    // Clear all admin-related data from localStorage
    localStorage.removeItem('AdminToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminEmail');
    // Any other admin-related data that might be stored
    
    // Navigate to login page
    navigate('/admin');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="logo-container">
          <img src="/images/logo.png" alt="Barods Global Limited" />
          
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="menu-item"
              onClick={() => navigate(item.path)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-title">{item.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="header-left">
            <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={24} />
            </button>
          </div>

          <div className="header-right">
            <div className="notifications" ref={notificationsRef}>
              <button
                className="notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
              </button>
            </div>

            <div className="user-profile" ref={userDropdownRef}>
              <button
                className="profile-btn"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <UserCircle size={24} />
                <span>Admin</span>
              </button>

              {showUserDropdown && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
};
AdminLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AdminLayout;