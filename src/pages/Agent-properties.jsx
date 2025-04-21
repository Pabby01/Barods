import { useState, useEffect, useRef } from "react";
import { Bell, Search, ChevronDown, User, Share, Edit, Trash2, ArrowRight, ArrowLeft, Upload, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import Axios for API requests
import { toast as hotToast } from "react-hot-toast";
import "./prop.css";

export default function Properties3() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
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
    bedrooms: "",
    bathrooms: "",
    toilets: "",
    parking: "",
    amenities: {},
    description: "",
    images: [], // Initialize as an empty array
  });
  const [editPropertyId, setEditPropertyId] = useState(null);
  const [errors, setErrors] = useState({}); // State to track field-specific errors
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
      {properties.map((property) => (
        <div key={property._id} className="property-item">
          <div className="property-image">
            <img
              src={property.Image?.[0] || "/images/default-property.jpg"}
              alt={property.Title}
            />
          </div>
          <div className="property-details">
            <h3>{property.Title}</h3>
            <p>{property.Description}</p>
            <p className="property-price">
              {formatCurrency(property.Price?.$numberDecimal || property.Price)}
            </p>
            <span className={`property-status ${property.Status?.toLowerCase()}`}>
              {property.Status}
            </span>
          </div>
          <div className="property-actions">
            <button
              className="btn-edit"
              onClick={() => handleEdit(property)}
            >
              Edit
            </button>
            <button
              className="btn-delete"
              onClick={() => handleDelete(property._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const handleEdit = (property) => {
    setEditPropertyId(property._id);
    setPropertyForm({
      title: property.Title,
      street: property.StreetAddress,
      area: property.Area,
      state: property.State,
      status: property.Status,
      type: property.Type,
      category: property.Category,
      currency: property.Currency,
      price: property.Price?.$numberDecimal || property.Price,
      bedrooms: property.Bedroom,
      bathrooms: property.Bathroom,
      toilets: property.Toilet,
      parking: property.parking,
      description: property.Description,
      images: property.Image || [],
    });
    setView("edit");
  };

  const handleDelete = async (propertyId) => {
    if (!propertyId) {
      toast.error("Invalid property ID");
      return;
    }

    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        toast.error("Authentication token is missing. Please login again.");
        return;
      }

      const isConfirmed = window.confirm("Are you sure you want to delete this property?");
      if (!isConfirmed) {
        return;
      }

      const response = await axios.delete(
        `${API_BASE_URL}/deleteproperty/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setProperties((prev) => prev.filter((p) => p._id !== propertyId));
        setFilteredProperties((prev) => prev.filter((p) => p._id !== propertyId));
        toast.success("Property deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      const errorMessage = error.response?.status === 404 
        ? "Property not found or already deleted"
        : "Failed to delete property";
      toast.error(errorMessage);
    }
  };

  const renderPropertyForm = () => (
    <form onSubmit={handleSaveChanges} className="property-form">
      {/* Title */}
      <div className="form-group">
        <input
          type="text"
          placeholder="Title"
          value={propertyForm.title}
          onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
        />
        {errors.title && <p className="error-message">{errors.title}</p>}
      </div>

      {/* Street */}
      <div className="form-group">
        <input
          type="text"
          placeholder="Street"
          value={propertyForm.street}
          onChange={(e) => setPropertyForm({ ...propertyForm, street: e.target.value })}
        />
        {errors.street && <p className="error-message">{errors.street}</p>}
      </div>

      {/* Area */}
      <div className="form-group">
        <input
          type="text"
          placeholder="Area"
          value={propertyForm.area}
          onChange={(e) => setPropertyForm({ ...propertyForm, area: e.target.value })}
        />
        {errors.area && <p className="error-message">{errors.area}</p>}
      </div>

      {/* State */}
      <div className="form-group">
        <input
          type="text"
          placeholder="State"
          value={propertyForm.state}
          onChange={(e) => setPropertyForm({ ...propertyForm, state: e.target.value })}
        />
        {errors.state && <p className="error-message">{errors.state}</p>}
      </div>

      {/* Status */}
      <div className="form-group">
        <select
          value={propertyForm.status}
          onChange={(e) => setPropertyForm({ ...propertyForm, status: e.target.value })}
        >
          <option value="">Select Status</option>
          <option value="For Sale">For Sale</option>
          <option value="For Rent">For Rent</option>
        </select>
        {errors.status && <p className="error-message">{errors.status}</p>}
      </div>

      {/* Type */}
      <div className="form-group">
        <select
          value={propertyForm.type}
          onChange={(e) => setPropertyForm({ ...propertyForm, type: e.target.value })}
        >
          <option value="">Select Type</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Land">Land</option>
        </select>
        {errors.type && <p className="error-message">{errors.type}</p>}
      </div>

      {/* Category */}
      <div className="form-group">
        <select
          value={propertyForm.category}
          onChange={(e) => setPropertyForm({ ...propertyForm, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
        </select>
        {errors.category && <p className="error-message">{errors.category}</p>}
      </div>

      {/* Currency */}
      <div className="form-group">
        <select
          value={propertyForm.currency}
          onChange={(e) => setPropertyForm({ ...propertyForm, currency: e.target.value })}
        >
          <option value="">Select Currency</option>
          <option value="₦">₦</option>
          <option value="$">$</option>
          <option value="€">€</option>
        </select>
        {errors.currency && <p className="error-message">{errors.currency}</p>}
      </div>

      {/* Price */}
      <div className="form-group">
        <input
          type="number"
          placeholder="Price"
          value={propertyForm.price}
          onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })}
        />
        {errors.price && <p className="error-message">{errors.price}</p>}
      </div>

      {/* Payment Frequency */}
      <div className="form-group">
        <select
          value={propertyForm.paymentFrequency}
          onChange={(e) =>
            setPropertyForm({ ...propertyForm, paymentFrequency: e.target.value })
          }
        >
          <option value="">Select Payment Frequency</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
          <option value="One-Time">One-Time</option>
        </select>
        {errors.paymentFrequency && <p className="error-message">{errors.paymentFrequency}</p>}
      </div>

      {/* Bedrooms */}
      <div className="form-group">
        <input
          type="number"
          placeholder="Bedrooms"
          value={propertyForm.bedrooms}
          onChange={(e) => setPropertyForm({ ...propertyForm, bedrooms: e.target.value })}
        />
        {errors.bedrooms && <p className="error-message">{errors.bedrooms}</p>}
      </div>

      {/* Bathrooms */}
      <div className="form-group">
        <input
          type="number"
          placeholder="Bathrooms"
          value={propertyForm.bathrooms}
          onChange={(e) => setPropertyForm({ ...propertyForm, bathrooms: e.target.value })}
        />
        {errors.bathrooms && <p className="error-message">{errors.bathrooms}</p>}
      </div>

      {/* Toilets */}
      <div className="form-group">
        <input
          type="number"
          placeholder="Toilets"
          value={propertyForm.toilets}
          onChange={(e) => setPropertyForm({ ...propertyForm, toilets: e.target.value })}
        />
        {errors.toilets && <p className="error-message">{errors.toilets}</p>}
      </div>

      {/* Parking */}
      <div className="form-group">
        <input
          type="number"
          placeholder="Parking Spaces"
          value={propertyForm.parking}
          onChange={(e) => setPropertyForm({ ...propertyForm, parking: e.target.value })}
        />
        {errors.parking && <p className="error-message">{errors.parking}</p>}
      </div>

      {/* Description */}
      <div className="form-group">
        <textarea
          placeholder="Description"
          value={propertyForm.description}
          onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
        />
        {errors.description && <p className="error-message">{errors.description}</p>}
      </div>

      {/* Images */}
      <div className="form-group">
        <input className="put" type="file" multiple onChange={handleImageUpload} />
        {errors.images && <p className="error-message">{errors.images}</p>}
      </div>

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
      const token = localStorage.getItem("Token");
      console.log("Retrieved Token:", token);

      if (!token) {
        toast.error("Session expired. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/getproperties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedProperties = response.data.properties || [];
      setProperties(fetchedProperties);
      setFilteredProperties(fetchedProperties);
      setTotalPages(Math.ceil(fetchedProperties.length / 10));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error(error.response?.data?.message || "Error fetching properties!");
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

    try {
      const token = localStorage.getItem("Token");
      
      if (!token) {
        toast.error("Authentication token is missing. Please login again.");
        return;
      }

      const formData = new FormData();

      if (!propertyForm.title || !propertyForm.description) {
        toast.error("Title and description are required!");
        return;
      }

      formData.append("Title", propertyForm.title || "");
      formData.append("StreetAddress", propertyForm.street || "");
      formData.append("Area", propertyForm.area || "");
      formData.append("State", propertyForm.state || "");
      formData.append("Status", propertyForm.status || "");
      formData.append("Type", propertyForm.type || "");
      formData.append("Category", propertyForm.category || "");
      formData.append("Currency", propertyForm.currency || "");
      formData.append("Price", propertyForm.price || "0");
      formData.append("Bedroom", propertyForm.bedrooms || "0");
      formData.append("Bathroom", propertyForm.bathrooms || "0");
      formData.append("Toilet", propertyForm.toilets || "0");
      formData.append("parking", propertyForm.parking || "0");
      formData.append("Description", propertyForm.description || "");
      
      const amenitiesArray = propertyForm.amenities ? 
        Object.entries(propertyForm.amenities)
          .filter(([_, value]) => value)
          .map(([key]) => key) : 
        [];
      formData.append("Amenities", amenitiesArray.join(","));

      if (propertyForm.images && propertyForm.images.length > 0) {
        propertyForm.images.forEach((image, index) => {
          formData.append(`image`, image);
        });
      }

      let response;
      if (editPropertyId) {
        response = await axios.put(
          `${API_BASE_URL}/updateproperty/${editPropertyId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setProperties((prev) =>
          prev.map((p) => (p._id === editPropertyId ? response.data.property : p))
        );
        toast.success("Property updated successfully!");
      } else {
        response = await axios.post(
          `${API_BASE_URL}/postproperties`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setProperties((prev) => [response.data.property, ...prev]);
        toast.success("Property added successfully!");
      }

      setPropertyForm({
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
        bedrooms: "",
        bathrooms: "",
        toilets: "",
        parking: "",
        amenities: {},
        description: "",
        images: [],
      });
      setView("list");
    } catch (error) {
      console.error("Error saving property:", error);
      toast.error(error.response?.data?.message || "Error saving property!");
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setPropertyForm((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...files],
    }));
    toast.success(`${files.length} image(s) uploaded successfully!`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatCurrency = (amount, currency = "₦") => {
    if (amount == null || isNaN(amount)) {
      return `${currency}0`;
    }
    return `${currency}${amount.toLocaleString()}`;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email: loginForm.email,
        password: loginForm.password,
      });

      const token = response.data.token;
      localStorage.setItem("Token", token);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleSearch = (query) => {
    const filtered = properties.filter((property) =>
      property.Title.toLowerCase().includes(query.toLowerCase()) ||
      property.Description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  const handleSort = (value) => {
    const sorted = [...properties];
    switch (value) {
      case "price-asc":
        sorted.sort((a, b) => (a.Price?.$numberDecimal || 0) - (b.Price?.$numberDecimal || 0));
        break;
      case "price-desc":
        sorted.sort((a, b) => (b.Price?.$numberDecimal || 0) - (a.Price?.$numberDecimal || 0));
        break;
      case "date-desc":
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "date-asc":
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }
    setProperties(sorted);
  };

  return (
    <>
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
      
      <div className="main-content">
        <div className="top-bar">
          <div className="welcome-section">
            <h2 className="page-title">Properties</h2>
            <div className="top-bar-actions">
              <button className="add-property-btn" onClick={() => setView("add")}>
                <Plus size={20} />
                Add Property
              </button>
            </div>
          </div>
          <div className="search-sort-container">
            <input
              type="text"
              placeholder="Search properties..."
              className="search-input"
              onChange={(e) => handleSearch(e.target.value)}
            />
            <select 
              className="sort-select"
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
            </select>
          </div>
          <div className="user-section">
            <div
              className="notification-icon"
              onClick={toggleNotifications}
              ref={notificationsRef}
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

            <div
              className="user-profile"
              onClick={toggleUserDropdown}
              ref={userDropdownRef}
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
        
        <div className="main-area">
          {loading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <>
              {view === "list" && (
                filteredProperties.length === 0 ? renderEmptyState() : renderPropertyList()
              )}
              {(view === "add" || view === "edit") && renderPropertyForm()}
            </>
          )}
        </div>
      </div>
    </>
  );
}