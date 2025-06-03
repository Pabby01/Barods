import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import toast from 'react-hot-toast';
import './AddProperty.css';

const AddProperty = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    street: '',
    area: '',
    state: '',
    status: '',
    type: '',
    category: '',
    currency: '',
    price: '',
    paymentFrequency: '',
    bedrooms: '',
    bathrooms: '',
    toilets: '',
    amenities: {
      powerSupply: false,
      rent: false,
    },
    description: '',
    image: null
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [name]: checked
      }
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('AdminToken');
      const formDataToSend = new FormData();

      // Append all form data
      Object.keys(formData).forEach(key => {
        if (key === 'amenities') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (key === 'image' && formData[key]) {
          formDataToSend.append('image', formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        'https://barods-global.onrender.com/api/v1/admin/properties',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        toast.success('Property added successfully!');
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Error adding property:', error);
      toast.error(error.response?.data?.message || 'Failed to add property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-property-container">
      <header className="add-property-header">
        <button className="back-button" onClick={onClose}>
          <ArrowLeft size={20} />
        </button>
        <h3>Add Property</h3>
      </header>

      <form onSubmit={handleSubmit} className="add-property-form">
        <div className="form-row">
          <div className="form-field">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label>Street</label>
            <input
              type="text"
              name="street"
              placeholder="Enter Street"
              value={formData.street}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row three-columns">
          <div className="form-field">
            <label>Area</label>
            <select name="area" value={formData.area} onChange={handleChange}>
              <option value="">Area</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
              <option value="600">600</option>
              
              {/* Add area options */}
            </select>
          </div>

          <div className="form-field">
            <label>State</label>
            <select name="state" value={formData.state} onChange={handleChange}>
              <option value="">Select category</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Kano">Kano</option>
              <option value="Abuja">Abuja</option>
              <option value="Abuja">Abuja</option>
              <option value="Abuja">Abuja</option>  

              {/* Add state options */}
            </select>
          </div>
        </div>

        <div className="form-row three-columns">
          <div className="form-field">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="">Select Status</option>
              <option value="Available">Available</option>
              <option value="Sold">Sold</option>
              <option value="leased">Leased</option>

              {/* Add status options */}
            </select>
          </div>

          <div className="form-field">
            <label>Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Land">Land</option>
              <option value="Flat">Flat</option>
              {/* Add type options */}
            </select>
          </div>

          <div className="form-field">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              <option value="">Select category</option>
              <option value="for rent">For Rent</option>
              <option value="for sale">For Sale</option>
              {/* Add category options */}
            </select>
          </div>
        </div>

        <div className="form-row three-columns">
          <div className="form-field">
            <label>Currency</label>
            <select name="currency" value={formData.currency} onChange={handleChange}>
              <option value="">Select Status</option>
              <option value="USD">USD</option>
              <option value="NGN">NGN</option>
              {/* Add currency options */}
            </select>
          </div>

          <div className="form-field">
            <label>Price</label>
            <select name="price" value={formData.price} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="1000000">1000000</option>
              <option value="2000000">2000000</option>
              <option value="3000000">3000000</option>
              <option value="4000000">4000000</option>
              <option value="5000000">5000000</option>
              <option value="6000000">6000000</option>
              
              {/* Add price options */}
            </select>
          </div>

          <div className="form-field">
            <label>Payment Frequency</label>
            <select name="paymentFrequency" value={formData.paymentFrequency} onChange={handleChange}>
              <option value="">Select category</option>
              <option value="Per Annum">Per Annum</option>
              <option value="Per Month">Per Month</option>
              {/* Add payment frequency options */}
            </select>
          </div>
        </div>

        <div className="form-row three-columns">
          <div className="form-field">
            <label>Bedroom</label>
            <select name="bedrooms" value={formData.bedrooms} onChange={handleChange}>
              <option value="">Select Status</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              
              {/* Add bedroom options */}
            </select>
          </div>

          <div className="form-field">
            <label>Bathroom</label>
            <select name="bathrooms" value={formData.bathrooms} onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              {/* Add bathroom options */}
            </select>
          </div>

          <div className="form-field">
            <label>Toilet</label>
            <select name="toilets" value={formData.toilets} onChange={handleChange}>
              <option value="">Select category</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              {/* Add toilet options */}
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>Other Amenities</h3>
          <div className="amenities-grid">
            <label className="amenity-checkbox">
              <input
                type="checkbox"
                name="powerSupply"
                checked={formData.amenities.powerSupply}
                onChange={handleAmenityChange}
              />
              24Hrs Power supply
            </label>
            <label className="amenity-checkbox">
              <input
                type="checkbox"
                name="rent"
                checked={formData.amenities.rent}
                onChange={handleAmenityChange}
              />
              Rent
            </label>
            <label className="amenity-checkbox">
              <input
                type="checkbox"
                name="gym"
                checked={formData.amenities.gym}
                onChange={handleAmenityChange}
              />
              Gym
            </label>
            <label className="amenity-checkbox">
              <input
                type="checkbox"
                name="swimmingPool"
                checked={formData.amenities.swimmingPool}
                onChange={handleAmenityChange}
              />
              Swimming Pool
            </label>
            <label className="amenity-checkbox">
              <input
                type="checkbox"
                name="jacuzzi"
                checked={formData.amenities.jacuzzi}
                onChange={handleAmenityChange}
              />
              Jacuzzi
            </label>
            {/* Add more amenities checkboxes as needed */}
          </div>
        </div>

        <div className="form-field">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>Product Image</label>
          <div className="image-upload-box">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="file-input"
            />
            <div className="upload-placeholder">
              <span>Click to upload</span>
              <span className="file-types">jpg/png/pdf, 5MB</span>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Adding...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

AddProperty.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default AddProperty;