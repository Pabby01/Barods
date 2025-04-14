import { useState, useEffect, useRef } from "react";
import { Bell, Search, ChevronDown, User, Share, Edit, Trash2, ArrowRight, ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import Axios for API requests
import "./prop.css";

export default function Properties3() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list"); // "list", "add", "edit"
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userName, setUserName] = useState("Emmanuel");
  const [propertyForm, setPropertyForm] = useState({
    title: "",
    street: "",
    area: "",
    state: "",
    status: "",
    type: "",
    category: "",
    currency: "",
    price: "",
    paymentFrequency: "",
    bedrooms: 0,
    bathrooms: 0,
    toilets: 0,
    parking: 0,
    amenities: {
      "24Hrs Power supply": false,
      "Rent": false,
      "Swimming Pool": false,
      "Gym": false,
      "Security": false,
      "Elevator": false,
      "Furnished": false,
      "Air Conditioning": false,
      "Balcony": false,
      "Pet Friendly": false,
      "WiFi": false,
      "Parking Space": false,
      "Playground": false,
      "Backup Generator": false,
      "Laundry Room": false,
      "CCTV": false,
    },
    description: "",
    image: null,
  });
  const [editPropertyId, setEditPropertyId] = useState(null);
  const navigate = useNavigate();
  const notificationsRef = useRef(null);
  const userDropdownRef = useRef(null);

  const API_BASE_URL = "https://barods-global.onrender.com/api/v1/agent";

  useEffect(() => {
    fetchProperties();
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleNotifications = () => {
      setShowNotifications((prev) => !prev);
  };
  
  const handleNavigation = (path) => {
      navigate(path);
  };
  
  const handleDeleteNotification = (id) => {
      setNotifications((prev) => prev.filter((notification) => notification.id !== id));
      toast.success("Notification deleted!");
  };
  
  const toggleUserDropdown = () => {
      setShowUserDropdown((prev) => !prev);
  };
  
  const handleLogout = () => {
      toast.success("Logged out successfully!");
      navigate("/login");
  };
  
  const renderEmptyState = () => (
      <div className="empty-state">
          <p>No properties available. Add a new property to get started.</p>
          <button className="mix" onClick={() => setView("add")}>Add Property</button>
      </div>
  );
  
  const renderPropertyList = () => (
      <div className="property-list">
          {properties.slice((currentPage - 1) * 10, currentPage * 10).map((property) => (
              <div key={property.id} className="property-item">
                  <h3>{property.title}</h3>
                  <p>{property.description}</p>
                  <p>{formatCurrency(property.price)}</p>
                  <button onClick={() => {
                      setEditPropertyId(property.id);
                      setPropertyForm(property);
                      setView("edit");
                  }}>
                      Edit
                  </button>
              </div>
          ))}
          <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                  <button
                      key={i + 1}
                      className={currentPage === i + 1 ? "active" : ""}
                      onClick={() => handlePageChange(i + 1)}
                  >
                      {i + 1}
                  </button>
              ))}
          </div>
      </div>
  );
  
  const renderPropertyForm = () => (
      <form onSubmit={handleSaveChanges} className="property-form">
        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          value={propertyForm.title}
          onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
        />

        {/* Street */}
        <input
          type="text"
          placeholder="Street"
          value={propertyForm.street}
          onChange={(e) => setPropertyForm({ ...propertyForm, street: e.target.value })}
        />

        {/* Area */}
        <input
          type="text"
          placeholder="Area"
          value={propertyForm.area}
          onChange={(e) => setPropertyForm({ ...propertyForm, area: e.target.value })}
        />

        {/* State */}
        <input
          type="text"
          placeholder="State"
          value={propertyForm.state}
          onChange={(e) => setPropertyForm({ ...propertyForm, state: e.target.value })}
        />

        {/* Status */}
        <select
          value={propertyForm.status}
          onChange={(e) => setPropertyForm({ ...propertyForm, status: e.target.value })}
        >
          <option value="">Select Status</option>
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
        </select>

        {/* Type */}
        <select
          value={propertyForm.type}
          onChange={(e) => setPropertyForm({ ...propertyForm, type: e.target.value })}
        >
          <option value="">Select Type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Land">Land</option>
        </select>

        {/* Category */}
        <select
          value={propertyForm.category}
          onChange={(e) => setPropertyForm({ ...propertyForm, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
        </select>

        {/* Currency */}
        <select
          value={propertyForm.currency}
          onChange={(e) => setPropertyForm({ ...propertyForm, currency: e.target.value })}
        >
          <option value="">Select Currency</option>
          <option value="₦">₦</option>
          <option value="$">$</option>
        </select>

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={propertyForm.price}
          onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })}
        />

        {/* Payment Frequency */}
        <select
          value={propertyForm.paymentFrequency}
          onChange={(e) => setPropertyForm({ ...propertyForm, paymentFrequency: e.target.value })}
        >
          <option value="">Select Payment Frequency</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>

        {/* Bedrooms */}
        <input
          type="number"
          placeholder="Bedrooms"
          value={propertyForm.bedrooms}
          onChange={(e) => setPropertyForm({ ...propertyForm, bedrooms: e.target.value })}
        />

        {/* Bathrooms */}
        <input
          type="number"
          placeholder="Bathrooms"
          value={propertyForm.bathrooms}
          onChange={(e) => setPropertyForm({ ...propertyForm, bathrooms: e.target.value })}
        />

        {/* Toilets */}
        <input
          type="number"
          placeholder="Toilets"
          value={propertyForm.toilets}
          onChange={(e) => setPropertyForm({ ...propertyForm, toilets: e.target.value })}
        />

        {/* Parking */}
        <input
          type="number"
          placeholder="Parking"
          value={propertyForm.parking}
          onChange={(e) => setPropertyForm({ ...propertyForm, parking: e.target.value })}
        />

        {/* Amenities */}
        <div className="amenities">
          <h4>Amenities</h4>
          {Object.keys(propertyForm.amenities).map((amenity) => (
            <label key={amenity}>
              <input
                type="checkbox"
                checked={propertyForm.amenities[amenity]}
                onChange={(e) =>
                  setPropertyForm({
                    ...propertyForm,
                    amenities: {
                      ...propertyForm.amenities,
                      [amenity]: e.target.checked,
                    },
                  })
                }
              />
              {amenity}
            </label>
          ))}
        </div>

        {/* Description */}
        <textarea
        className="prof"
          placeholder="Description"
          value={propertyForm.description}
          onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
        />

        {/* Image */}
        <input className="put" type="file" onChange={handleImageUpload} />

        {/* Buttons */}
        <button type="submit">{view === "add" ? "Add Property" : "Save Changes"}</button>
        <button type="button" onClick={() => setView("list")}>
          Cancel
        </button>
      </form>
  );

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("userToken"); // Retrieve the token from localStorage

      const response = await axios.get(`${API_BASE_URL}/getproperties`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Bearer token
        },
      });

      setProperties(response.data.properties || []);
      setTotalPages(Math.ceil((response.data.properties || []).length / 10)); // Assuming 10 properties per page
      setLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized! Please log in again.");
        navigate("/login"); // Redirect to login if unauthorized
      } else {
        toast.error("Error fetching properties!");
      }
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
    setTimeout(() => {
      setNotifications([
        { id: 1, message: "New property listed: Diamond Family Home" },
        { id: 2, message: "Your profile has been updated successfully" },
        { id: 3, message: "New deal closed: Mountainview Villa" },
      ]);
    }, 500);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!propertyForm.title || !propertyForm.price) {
      toast.error("Please fill in all required fields!");
      return;
    }

    try {
      const token = localStorage.getItem("userToken"); // Retrieve the token from localStorage

      if (view === "add") {
        const formData = new FormData();
        Object.keys(propertyForm).forEach((key) => {
          if (key === "amenities") {
            formData.append(key, JSON.stringify(propertyForm[key]));
          } else {
            formData.append(key, propertyForm[key]);
          }
        });

        if (propertyForm.image) {
          formData.append("image", propertyForm.image);
        }

        const response = await axios.post(`${API_BASE_URL}/postproperties`, formData, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the Bearer token
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Property added successfully!");
        setProperties((prev) => [response.data.property, ...prev]);
      } else if (view === "edit" && editPropertyId) {
        const updatedProperty = {
          ...propertyForm,
          id: editPropertyId,
        };

        const response = await axios.put(
          `${API_BASE_URL}/updateproperty/${editPropertyId}`,
          updatedProperty,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the Bearer token
            },
          }
        );

        setProperties((prev) =>
          prev.map((property) =>
            property.id === editPropertyId ? response.data.property : property
          )
        );
        toast.success("Property updated successfully!");
      }

      setView("list");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized! Please log in again.");
        navigate("/login"); // Redirect to login if unauthorized
      } else {
        toast.error("Error saving property!");
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPropertyForm((prev) => ({
          ...prev,
          image: file // Save the file for upload
        }));
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // In a real app, this would trigger a new API call with page parameter
  };

  const formatCurrency = (amount, currency = "₦") => {
    return `${currency}${amount.toLocaleString()}`;
  };

  return (
      <>
      {/* Sidebar */}
      <div className="sidebar2">
      <div className="logo-container">
        <div className="logo">
          <img src="/images/logo.png" alt="Barods Global Limited" />
          <div className="logo-subtitle">Real Estate and Construction</div>
        </div>
      </div>

      <div className="sidebar-menu">
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
        
        <div 
          className="menu-item active" 
          onClick={() => setView("list")}
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
        </svg>
      </div>
    </div>
    
    {/* Main content */}
    <div className="main-content">
      {/* Top bar */}
      <div className="top-bar">
        <div className="welcome-section">
          <h1 className="page-title">Properties</h1>
        </div>
        <div className="user-section">
          {/* Notifications */}
          <div
            className="notification-icon"
            onClick={toggleNotifications}
            ref={notificationsRef} // Add ref here
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="notification-badge">{notifications.length}</span>
            )}
            
            {showNotifications && (
              <div className="notifications-dropdown">
                <div className="notifications-header">
                  <h3>Notifications</h3>
                </div>
                {notifications.length > 0 ? (
                  <div className="notification-list">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="notification-item">
                        <p>{notification.message}</p>
                        <button onClick={() => handleDeleteNotification(notification.id)}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-notifications">No notifications</p>
                )}
              </div>
            )}
          </div>

          {/* User Profile */}
          <div
            className="user-profile"
            onClick={toggleUserDropdown}
            ref={userDropdownRef} // Add ref here
          >
            <div className="avatar">
              <User size={20} />
            </div>
            <span className="user-name">{userName}</span>
            <ChevronDown size={16} />
            
            {showUserDropdown && (
              <div className="user-dropdown">
                <div className="dropdown-item" onClick={() => handleNavigation("/profile")}>
                  My Profile
                </div>
                <div className="dropdown-item" onClick={() => handleNavigation("/settings")}>
                  Settings
                </div>
                <div className="dropdown-divider"></div>
                <div className="dropdown-item logout" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Main area */}
      <div className="main-area">
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <>
            {view === "list" && (
              properties.length === 0 ? renderEmptyState() : renderPropertyList()
            )}
            {(view === "add" || view === "edit") && renderPropertyForm()}
          </>
        )}
      </div>
  </div>
  </>
);
}