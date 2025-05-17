/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef, useCallback } from "react";
import { Bell, Search, ChevronDown, User, Share, Edit, Trash2, ArrowRight, ArrowLeft, Upload, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast"; // Replace react-toastify with react-hot-toast
import axios from "axios";
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
  const notificationsRef = useRef(null);
  const userDropdownRef = useRef(null);
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
  
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });
  const [editPropertyId, setEditPropertyId] = useState(null);
  const [errors, setErrors] = useState({}); // State to track field-specific errors
  const [agentData, setAgentData] = useState({
    name: "",
    email: "",
    image: null,
    id: null
  });
  const navigate = useNavigate();

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        toast.error("Session expired. Please log in again.");
        navigate("/become-agent");
        return;
      }
      
      const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.GET_PROPERTIES}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if response.data exists and has the expected structure
      if (response.data && response.data.properties) {
        setProperties(response.data.properties);
        setFilteredProperties(response.data.properties);
      } else {
        setProperties([]);
        setFilteredProperties([]);
        console.log("No properties found in response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("Failed to load properties");
      setProperties([]);
      setFilteredProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.removeItem("Token");
    toast.success("Logged out successfully!");
    navigate("/become-agent"); // Changed from /login to /become-agent to match the rest of the app
  }, [navigate]);

  const API_BASE_URL = "https://barods-global.onrender.com/api/v1/agent";
  const ENDPOINTS = {
    GET_PROPERTIES: "/getproperties",
    CREATE_PROPERTY: "/postproperties",
    UPDATE_PROPERTY: "/editProperties", // Make sure this matches exactly
    DELETE_PROPERTY: "/deleteproperty"
  };

  const fetchAgentDataCallback = useCallback(async () => {
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
        setUserName(fullName || "User");
      } else {
        throw new Error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching agent data:", error);
      toast.error("Failed to load profile data");
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  }, [handleLogout]);

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (!token) {
      navigate("/become-agent");
      return;
    }

    fetchAgentDataCallback();
    fetchProperties();
    // Remove fetchNotifications() since we're not using it yet

    return () => {
      // Cleanup toasts when component unmounts
      toast.dismiss();
    };
  }, [fetchAgentDataCallback, navigate]);

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

  const renderEmptyState = () => (
    <div className="empty-state">
      <p>No properties available. Add a new property to get started.</p>
      <button className="mix" onClick={() => setView("add")}>Add Property</button>
    </div>
  );

  const renderPropertyList = () => {
    if (!Array.isArray(properties) || properties.length === 0) {
      return renderEmptyState();
    }

    return (
      <div className="property-list2">
        {properties.map((property) => (
          <div key={property._id || Math.random()} className="property-item">
            <div className="property-image2">
              <img
                src={property.Image?.[0] || "/images/default-property.jpg"}
                alt={property.Title || 'Property'}
                onError={(e) => {
                  e.target.src = "/images/default-property.jpg";
                }}
              />
            </div>
            <div className="property-details2">
              <h3>{property.Title || 'Untitled Property'}</h3>
              <p>{property.Description || 'No description available'}</p>
              <p className="property-price">
                {formatCurrency(property.Price?.$numberDecimal || property.Price || 0)}
              </p>
              <span className={`property-status ${(property.Status || '').toLowerCase()}`}>
                {property.Status || 'Status Unknown'}
              </span>
            </div>
            <div className="property-actions">
              <button
                className="btn-icon edit"
                onClick={() => handleEdit(property)}
                title="Edit property"
              >
                <Edit size={18} />
              </button>
              <button
                className="btn-icon delete"
                onClick={() => handleDelete(property._id)}
                title="Delete property"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleEdit = (property) => {
    setEditPropertyId(property._id);
    setPropertyForm({
      title: property.Title || "",
      street: property.StreetAddress || "",
      area: property.Area || "",
      state: property.State || "",
      status: property.Status || "",
      type: property.Type || "",
      category: property.Category || "",
      currency: property.Currency || "",
      price: property.Price?.$numberDecimal || property.Price || "",
      bedrooms: property.Bedroom || "",
      bathrooms: property.Bathroom || "",
      toilets: property.Toilet || "",
      parking: property.parking || "",
      description: property.Description || "",
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
        toast.error("Authentication token is missing");
        return;
      }

      const isConfirmed = window.confirm(
        "Are you sure you want to delete this property?"
      );
      
      if (!isConfirmed) return;

      const loadingToastId = toast.loading("Deleting property...");

      const response = await axios.delete(
        `${API_BASE_URL}${ENDPOINTS.DELETE_PROPERTY}/${propertyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.dismiss(loadingToastId);

      if (response.status === 200) {
        // Update local state
        setProperties(prev => prev.filter(p => p._id !== propertyId));
        setFilteredProperties(prev => prev.filter(p => p._id !== propertyId));
        toast.success("Property deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error(
        error.response?.data?.message || 
        "Failed to delete property"
      );
    }
  };

  const handleImageUpload = (e) => {
    try {
      const files = Array.from(e.target.files);
      
      // Validate files
      const validFiles = files.filter(file => {
        const isValidType = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type);
        const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
        
        if (!isValidType) {
          toast.error(`${file.name} is not a supported image type`);
        }
        if (!isValidSize) {
          toast.error(`${file.name} is too large (max 5MB)`);
        }
        
        return isValidType && isValidSize;
      });

      if (validFiles.length > 0) {
        setPropertyForm(prev => ({
          ...prev,
          images: [...validFiles]
        }));
        toast.success(`${validFiles.length} image(s) selected`);
      }
    } catch (error) {
      console.error('Error handling image upload:', error);
      toast.error('Error uploading images');
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
          <option value="Available">Available</option>
          <option value="Leased">Leased</option>
          <option value="Sold">Sold</option>
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
          <option value="For sale">For sale</option>
          <option value="For Rent">For Rent</option>
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
          <option value="NGN">NGN</option>
          <option value="USD">USD</option>
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
        setUserName(fullName || "User"); // Update the existing userName state
      } else {
        throw new Error("Failed to fetch profile data");
      }
    } catch (error) {
      console.error("Error fetching agent data:", error);
      toast.error("Failed to load profile data");
      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const loadingToastId = toast.loading("Creating property...");

    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        toast.dismiss(loadingToastId);
        toast.error("Authentication token is missing");
        return;
      }

      // Validate form before submission
      if (!validateForm()) {
        toast.dismiss(loadingToastId);
        toast.error("Please fill in all required fields");
        return;
      }

      const formData = new FormData();

      // Match the exact field names from the API documentation
      formData.append("Title", propertyForm.title.trim());
      formData.append("StreetAddress", propertyForm.street.trim());
      formData.append("Area", propertyForm.area.trim());
      formData.append("Currency", propertyForm.currency || "NGN"); // Default to NGN
      formData.append("Price", propertyForm.price.toString());
      formData.append("Bedroom", propertyForm.bedrooms.toString());
      formData.append("Bathroom", propertyForm.bathrooms.toString());
      formData.append("State", propertyForm.state.trim());
      formData.append("Status", propertyForm.status || "Available"); // Default to Available
      formData.append("Type", propertyForm.type);
      formData.append("Category", propertyForm.category);
      formData.append("Toilet", propertyForm.toilets.toString());
      formData.append("parking", propertyForm.parking.toString());
      formData.append("Description", propertyForm.description.trim());
      formData.append("Amenities", "water,others"); // Default amenities as shown in API example

      // Handle images - make sure they're Files
      if (propertyForm.images?.length > 0) {
        propertyForm.images.forEach((image, index) => {
          if (image instanceof File) {
            formData.append("image", image);
          }
        });
      }

      // Debug log formData contents
      console.log('Form Data Contents:');
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${typeof pair[1] === 'object' ? 'File' : pair[1]}`);
      }

      const response = await axios({
        method: 'post',
        url: `${API_BASE_URL}/postproperties`,
        data: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          // Let browser set the Content-Type for FormData
        },
        // Add timeout and validation
        timeout: 15000,
        validateStatus: (status) => {
          return status >= 200 && status < 300;
        }
      });

      toast.dismiss(loadingToastId);

      if (response.data) {
        toast.success("Property created successfully!");
        
        // Reset form
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

        // Refresh properties list
        await fetchProperties();
        
        // Return to list view
        setView("list");
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      console.error("Error creating property:", error);
      console.log("Error details:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers
      });

      let errorMessage = "Failed to create property";
      if (error.response?.data?.msg) {
        errorMessage = error.response.data.msg;
      } else if (error.response?.status === 500) {
        errorMessage = "Server error - please try again later";
      }

      toast.error(errorMessage);
    }
  };

  const validateForm = () => {
    const errors = {};
    
    // Required fields from API documentation
    const requiredFields = {
      title: "Title",
      street: "Street Address",
      area: "Area",
      state: "State",
      status: "Status",
      type: "Type",
      category: "Category",
      price: "Price",
      bedrooms: "Bedroom",
      bathrooms: "Bathroom",
      toilets: "Toilet",
      parking: "Parking",
      description: "Description"
    };

    Object.entries(requiredFields).forEach(([field, label]) => {
      const value = propertyForm[field]?.toString().trim();
      if (!value) {
        errors[field] = `${label} is required`;
      }
    });

    // Validate numeric fields
    const numericFields = ['price', 'bedrooms', 'bathrooms', 'toilets', 'parking'];
    numericFields.forEach(field => {
      const value = Number(propertyForm[field]);
      if (isNaN(value) || value < 0) {
        errors[field] = `Please enter a valid number for ${field}`;
      }
    });

    // Validate images
    if (!propertyForm.images || propertyForm.images.length === 0) {
      errors.images = "At least one image is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatCurrency = (amount, currency = "NGN") => {
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
            <h3 className="page-title">Properties</h3>
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
            <div className="notification-wrapper" ref={notificationsRef}>
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
                            <Trash2 size={16} />
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