import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, User, ChevronDown, LogOut, Settings } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import './AdminDashboard.css';
import AdminLayout from './components/AdminLayout';

// Fallback data for testing
const fallbackData = {
  stats: {
    totalListings: 423,
    closedDeals: 82,
    conversionRate: 77,
    averagePrice: 12300000
  },
  salesTrend: [
    { month: 'January', sales: 45 },
    { month: 'February', sales: 30 },
    { month: 'March', sales: 60 },
    { month: 'April', sales: 40 },
    { month: 'May', sales: 70 },
    { month: 'June', sales: 45 }
  ]
};

// Add fallback notifications
const fallbackNotifications = [
  {
    id: 1,
    message: 'New property listing added',
    time: '5 mins ago',
    read: false
  },
  {
    id: 2,
    message: 'Agent registration request',
    time: '1 hour ago',
    read: false
  },
  {
    id: 3,
    message: 'Property status updated',
    time: '2 hours ago',
    read: false
  }
];

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState(null);
  const [notifications, setNotifications] = useState(fallbackNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('AdminToken');
      const response = await axios.get('https://barods-global.onrender.com/api/v1/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setDashboardData(response.data.data);
        setAdminInfo(response.data.admin); // Assuming the API returns admin info
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
      // Use fallback data
      setDashboardData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('AdminToken');
      const response = await axios.get('https://barods-global.onrender.com/api/v1/admin/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setNotifications(response.data.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Keep using fallback notifications
    }
  };

  const markNotificationAsRead = async (id) => {
    try {
      const token = localStorage.getItem('AdminToken');
      await axios.put(
        `https://barods-global.onrender.com/api/v1/admin/notifications/${id}`,
        { read: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('AdminToken');
    navigate('/');
  };

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch data on mount
  useEffect(() => {
    fetchDashboardData();
    fetchNotifications();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="header-right">
            <div className="notifications-wrapper" ref={notificationsRef}>
              <button 
                className="notifications-button"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="notification-badge">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="notifications-dropdown">
                  <div className="notifications-header">
                    <h3>Notifications</h3>
                    {notifications.some(n => !n.read) && (
                      <button 
                        className="mark-all-read"
                        onClick={() => notifications.forEach(n => markNotificationAsRead(n.id))}
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="notifications-list">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`notification-item ${notification.read ? 'read' : ''}`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <p>{notification.message}</p>
                          <span>{notification.time}</span>
                        </div>
                      ))
                    ) : (
                      <div className="no-notifications">
                        No notifications
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="profile-wrapper" ref={profileRef}>
              <button 
                className="profile-button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <User size={20} />
                <span>{adminInfo?.name || 'Admin'}</span>
                <ChevronDown size={16} />
              </button>

              {showProfileMenu && (
                <div className="profile-dropdown">
                  <button onClick={() => navigate('/admin/account')}>
                    <Settings size={16} />
                    Account Settings
                  </button>
                  <button onClick={handleLogout}>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Listings</h3>
            <p className="stat-value">{dashboardData.stats.totalListings}</p>
            <span className="stat-label">Properties</span>
          </div>
          <div className="stat-card">
            <h3>Closed Deals</h3>
            <p className="stat-value">{dashboardData.stats.closedDeals}</p>
            <span className="stat-trend positive">+10%</span>
          </div>
          <div className="stat-card">
            <h3>Conversion Rate</h3>
            <p className="stat-value">{dashboardData.stats.conversionRate}%</p>
            <span className="stat-trend positive">+10%</span>
          </div>
          <div className="stat-card">
            <h3>Average Sales Price</h3>
            <p className="stat-value">₦{(dashboardData.stats.averagePrice / 1000000).toFixed(1)}M</p>
            <span className="stat-trend positive">+10%</span>
          </div>
        </div>

        <div className="sales-chart">
          <div className="chart-header">
            <h3>Sales Trend</h3>
            <select className="time-filter">
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData.salesTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#519A14" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;