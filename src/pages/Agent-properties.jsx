import { useState, useEffect, useRef } from "react";
import { Bell, Search, ChevronDown, User, Share, Edit, Trash2, ArrowRight, ArrowLeft, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./prop.css";

export default function Properties3() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("list"); // "list", "add", "edit"
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(12);
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
      "Rent": false
    },
    description: "",
    image: null
  });
  const [editPropertyId, setEditPropertyId] = useState(null);
  const navigate = useNavigate();
  const notificationsRef = useRef(null);
  const userDropdownRef = useRef(null);

  useEffect(() => {
    fetchProperties();
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close notifications dropdown if clicked outside
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      // Close user dropdown if clicked outside
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

  const fetchProperties = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      setTimeout(() => {
        // Mock data for demonstration
        const mockProperties = Array(10).fill(null).map((_, index) => ({
          id: `prop-${index + 1}`,
          title: "Diamond Family Home",
          street: "374, Johnson Ave",
          area: "Ajah",
          state: "Lagos",
          status: "Available",
          price: 12000000,
          currency: "₦",
          image: "/images/image-3.png"
        }));
        
        setProperties(mockProperties);
        setLoading(false);
      }, 500);
    } catch (error) {
      toast.error("Error fetching properties!");
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

  const handleDeleteNotification = (id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const toggleUserDropdown = () => {
    setShowUserDropdown((prev) => !prev);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === "checkbox") {
      setPropertyForm(prev => ({
        ...prev,
        amenities: {
          ...prev.amenities,
          [name]: checked
        }
      }));
    } else {
      setPropertyForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setPropertyForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProperty = () => {
    setView("add");
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
      bedrooms: 0,
      bathrooms: 0,
      toilets: 0,
      parking: 0,
      amenities: {
        "24Hrs Power supply": false,
        "Rent": false
      },
      description: "",
      image: null
    });
  };

  const handleEditProperty = (property) => {
    setView("edit");
    setEditPropertyId(property.id);
    // In a real app, you would fetch the full property details here
    setPropertyForm({
      title: property.title,
      street: property.street,
      area: property.area,
      state: property.state,
      status: property.status,
      type: "Apartment",
      category: "Residential",
      currency: property.currency,
      price: property.price,
      paymentFrequency: "Monthly",
      bedrooms: 3,
      bathrooms: 2,
      toilets: 3,
      parking: 1,
      amenities: {
        "24Hrs Power supply": true,
        "Rent": false
      },
      description: "Beautiful family home in a serene environment",
      image: property.image
    });
  };

  const handleDeleteProperty = (propertyId) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this property?</p>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <button
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            onClick={() => {
              setProperties((prev) => prev.filter((property) => property.id !== propertyId));
              toast.dismiss(); // Close the toast
              toast.success("Property deleted successfully!");
            }}
          >
            Yes
          </button>
          <button
            style={{
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
            onClick={() => toast.dismiss()} // Close the toast
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false, // Keep the toast open until the user interacts
      }
    );
  };

  const handleShareProperty = (property) => {
    // Simulate sharing functionality
    navigator.clipboard.writeText(`Share link for ${property.title}`).then(() => {
      toast.success(`Share link for "${property.title}" copied to clipboard!`);
    }).catch(() => {
      toast.error("Failed to copy the share link to clipboard.");
    });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (!propertyForm.title || !propertyForm.price) {
      toast.error("Please fill in all required fields!");
      return;
    }

    if (view === "add") {
      const newProperty = {
        id: `prop-${Date.now()}`,
        ...propertyForm,
        status: "Available",
      };
      setProperties((prev) => [newProperty, ...prev]);
      toast.success("Property added successfully!");
    } else if (view === "edit" && editPropertyId) {
      setProperties((prev) =>
        prev.map((property) =>
          property.id === editPropertyId ? { ...propertyForm } : property
        )
      );
      toast.success("Property updated successfully!");
    }

    setView("list");
  };

  const handlePublish = (e) => {
    e.preventDefault();
    handleSaveChanges(e);
    // Additional publishing logic would go here
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // In a real app, this would trigger a new API call with page parameter
  };

  const formatCurrency = (amount, currency = "₦") => {
    return `${currency}${amount.toLocaleString()}`;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPropertyForm((prev) => ({
          ...prev,
          image: reader.result, // Set the image preview
        }));
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  // Empty state view
  const renderEmptyState = () => {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <img src="/images/Empty-State.png" alt="No properties" />
        </div>
        <h3>You have not listed any property yet!</h3>
        <button className="add-property-btn" onClick={handleAddProperty}>
          Add Property <ArrowRight size={16} />
        </button>
      </div>
    );
  };

  // Property form
  const renderPropertyForm = () => {
    return (
      <div className="property-form-container">
        <h3>{view === "add" ? "Add Property" : "Edit Property"}</h3>
        
        <form className="property-form" onSubmit={handleSaveChanges}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter property title"
              value={propertyForm.title}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="street">Street/Road Address</label>
              <input
                type="text"
                id="street"
                name="street"
                placeholder="346 Avenue"
                value={propertyForm.street}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="area">Area</label>
              <input
                type="text"
                id="area"
                name="area"
                placeholder="Ajah"
                value={propertyForm.area}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                placeholder="Lagos"
                value={propertyForm.state}
                onChange={handleInputChange}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <div className="select-wrapper">
                <select
                  id="status"
                  name="status"
                  value={propertyForm.status}
                  onChange={handleInputChange}
                >
                  <option value="">Select Status</option>
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                  <option value="Rented">Rented</option>
                </select>
                <ChevronDown size={16} className="select-icon" />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <div className="select-wrapper">
                <select
                  id="type"
                  name="type"
                  value={propertyForm.type}
                  onChange={handleInputChange}
                >
                  <option value="">Select Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="House">House</option>
                  <option value="Land">Land</option>
                  <option value="Commercial">Commercial</option>
                </select>
                <ChevronDown size={16} className="select-icon" />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <div className="select-wrapper">
                <select
                  id="category"
                  name="category"
                  value={propertyForm.category}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                </select>
                <ChevronDown size={16} className="select-icon" />
              </div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="currency">Currency</label>
              <div className="select-wrapper">
                <select
                  id="currency"
                  name="currency"
                  value={propertyForm.currency}
                  onChange={handleInputChange}
                >
                  <option value="choose">choose</option>
                  <option value="₦">₦ (Naira)</option>
                  <option value="$">$ (USD)</option>
                  <option value="€">€ (Euro)</option>
                </select>
                <ChevronDown size={16} className="select-icon" />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="0,000"
                value={propertyForm.price}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="paymentFrequency">Payment Frequency</label>
              <div className="select-wrapper">
                <select
                  id="paymentFrequency"
                  name="paymentFrequency"
                  value={propertyForm.paymentFrequency}
                  onChange={handleInputChange}
                >
                  <option value="choose">choose</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                  <option value="Once">Once</option>
                </select>
                <ChevronDown size={16} className="select-icon" />
              </div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="bedrooms">Bedroom</label>
              <div className="select-wrapper">
                <select
                  id="bedrooms"
                  name="bedrooms"
                  value={propertyForm.bedrooms}
                  onChange={handleInputChange}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
                <ChevronDown size={16} className="select-icon" />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="bathrooms">Bathroom</label>
              <div className="select-wrapper">
                <select
                  id="bathrooms"
                  name="bathrooms"
                  value={propertyForm.bathrooms}
                  onChange={handleInputChange}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
                <ChevronDown size={16} className="select-icon" />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="toilets">Toilet</label>
              <div className="select-wrapper">
                <select
                  id="toilets"
                  name="toilets"
                  value={propertyForm.toilets}
                  onChange={handleInputChange}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
                <ChevronDown size={16} className="select-icon" />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="parking">Parking</label>
              <div className="select-wrapper">
                <select
                  id="parking"
                  name="parking"
                  value={propertyForm.parking}
                  onChange={handleInputChange}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5+</option>
                </select>
                <ChevronDown size={16} className="select-icon" />
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <label>Other Amenities</label>
            <div className="amenities-grid">
              {["24Hrs Power supply", "Rent", "24Hrs Power supply", "24Hrs Power supply", 
                "24Hrs Power supply", "Rent", "24Hrs Power supply", "24Hrs Power supply",
                "24Hrs Power supply", "Rent", "24Hrs Power supply", "24Hrs Power supply"].map((amenity, index) => (
                <div className="amenity-item" key={`${amenity}-${index}`}>
                  <input
                    type="checkbox"
                    id={`amenity-${index}`}
                    name={amenity}
                    checked={propertyForm.amenities[amenity] || false}
                    onChange={handleInputChange}
                  />
                  <label htmlFor={`amenity-${index}`}>{amenity}</label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter Description"
              value={propertyForm.description}
              onChange={handleInputChange}
              rows={6}
            ></textarea>
          </div>
          
          <div className="form-group">
            <label>Image</label>
            <div className="image-upload-box" onClick={() => document.getElementById("image-upload").click()}>
              {propertyForm.image ? (
                <div className="preview-image">
                  <img src={propertyForm.image} alt="Property" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the file input click
                      setPropertyForm((prev) => ({ ...prev, image: null }));
                    }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">
                    <Upload size={24} />
                  </div>
                  <p>Click to upload.</p>
                  <p className="text-sm">png/jpg/jpeg</p>
                </div>
              )}
              <input
                type="file"
                id="image-upload"
                className="hidden-upload"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageUpload}
              />
            </div>
          </div>
          
          <div className="form-actions">
            <button type="submit" className="save-btn">
              Save Changes <ArrowRight size={16} />
            </button>
            <button type="button" className="publish-btn" onClick={handlePublish}>
              Save and Publish <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Property list view
  const renderPropertyList = () => {
    return (
      <div className="property-list-container">
        <div className="list-header">
          <h3>All Properties</h3>
          <div className="page-info">Showing {(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, properties.length)} of {properties.length}</div>
          <div className="list-actions">
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <Search size={18} />
            </div>
            <div className="sort-dropdown">
              <span>Sort by</span>
              <ChevronDown size={16} />
            </div>
            <button className="add-property-btn" onClick={handleAddProperty}>
              Add Property <ArrowRight size={16} />
            </button>
          </div>
        </div>
        
        <div className="property-list">
          {properties.map((property) => (
            <div className="property-card3" key={property.id}>
              <div className="property-image3">
                <img src="/images/image.png" alt={property.title} />
              </div>
              
              <div className="property-details3">
                <h3 className="property-title3">{property.title}</h3>
                <div className="property-location3">
                  {property.street}, {property.area} {property.state}
                </div>
                <div className="property-price">
                  {formatCurrency(property.price, property.currency)}
                </div>
              </div>
              
              <div className="property-status">
                <span className={`status-badge ${property.status.toLowerCase()}`}>
                  {property.status}
                </span>
              </div>
              
              <div className="property-actions3">
                <button className="action-btn share-btn" onClick={() => handleShareProperty(property)}>
                  <Share size={18} />
                  <span>Share</span>
                </button>
                
                <button className="action-btn edit-btn" onClick={() => handleEditProperty(property)}>
                  <Edit size={18} />
                  <span>Edit</span>
                </button>
                
                <button className="action-btn delete-btn" onClick={() => handleDeleteProperty(property.id)}>
                  <Trash2 size={18} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pagination">
          <button 
            className="pagination-arrow" 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeft size={16} />
          </button>
          
          {[...Array(Math.min(5, totalPages)).keys()].map(page => (
            <button 
              key={page + 1}
              className={`pagination-number ${currentPage === page + 1 ? 'active' : ''}`}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          ))}
          
          {totalPages > 5 && <span className="pagination-ellipsis">...</span>}
          
          {totalPages > 5 && (
            <button 
              className="pagination-number"
              onClick={() => handlePageChange(totalPages)}
            >
              {totalPages}
            </button>
          )}
          
          <button 
            className="pagination-arrow"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Toast Container */}
      <ToastContainer />

      {/* Sidebar */}
      <div className="sidebar">
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
    </div>
  );
}