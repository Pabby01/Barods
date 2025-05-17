import { useState, useEffect, useRef } from 'react';
import { Bell, User, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AgentHeader() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userProfile, setUserProfile] = useState({
    name: localStorage.getItem('userName') || 'User',
    image: localStorage.getItem('userImage') || null
  });

  const navigate = useNavigate();
  const notificationsRef = useRef(null);
  const userDropdownRef = useRef(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchNotifications = async () => {
    // Simulated notifications - replace with actual API call
    setNotifications([
      { id: 1, message: 'New property listed: Diamond Family Home' },
      { id: 2, message: 'Your profile has been updated successfully' },
      { id: 3, message: 'New deal closed: Mountainview Villa' },
    ]);
  };

  const handleDeleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
    toast.success('Notification deleted!');
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userImage');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <div className="agent-header">
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
              {notifications.length === 0 ? (
                <p className="no-notifications">No new notifications</p>
              ) : (
                <div className="notification-list">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="notification-item">
                      <p>{notification.message}</p>
                      <button
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="delete-notification"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="user-profile" ref={userDropdownRef}>
          <button
            className="profile-btn"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            {userProfile.image ? (
              <img
                src={userProfile.image}
                alt={userProfile.name}
                className="profile-image"
              />
            ) : (
              <User size={20} />
            )}
            <span className="user-name">{userProfile.name}</span>
            <ChevronDown size={16} />
          </button>

          {showUserDropdown && (
            <div className="profile-dropdown">
              <button onClick={() => navigate('/settings')}>Settings</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}