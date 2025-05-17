/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import './EditProperty.css';

const EditProperty = ({ property, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: property?.title || '',
    street: property?.street || '',
    area: property?.area || '',
    state: property?.state || '',
    status: property?.status || '',
    type: property?.type || '',
    category: property?.category || '',
    currency: property?.currency || 'NGN',
    price: property?.price || '',
    paymentFrequency: property?.paymentFrequency || '',
    bedrooms: property?.bedrooms || '',
    bathrooms: property?.bathrooms || '',
    toilets: property?.toilets || '',
    parking: property?.parking || false,
    description: property?.description || '',
    images: property?.images || [],
    amenities: property?.amenities || {
      powerSupply: false,
      waterSupply: false,
      security: false,
      internet: false,
      furnished: false,
      swimmingPool: false,
      gym: false,
    }
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAmenityChange = (name) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [name]: !prev.amenities[name]
      }
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const totalImages = formData.images.length + imageFiles.length;
    const newFiles = files.slice(0, 5 - totalImages);
    
    newFiles.forEach(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Each image must be less than 5MB');
        return;
      }
    });

    setImageFiles(prev => [...prev, ...newFiles]);

    // Create preview URLs
    const newUrls = newFiles.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newUrls]
    }));
  };

  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      const removedImage = formData.images[index];
      setRemovedImages(prev => [...prev, removedImage]);
    } else {
      URL.revokeObjectURL(formData.images[index]);
      setImageFiles(prev => prev.filter((_, i) => i !== index));
    }

    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('AdminToken');
      const formDataToSend = new FormData();

      // Append all text data
      Object.keys(formData).forEach(key => {
        if (key !== 'images' && key !== 'amenities') {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Append amenities as JSON string
      formDataToSend.append('amenities', JSON.stringify(formData.amenities));

      // Append new image files
      imageFiles.forEach(file => {
        formDataToSend.append('newImages', file);
      });

      // Append removed image URLs
      formDataToSend.append('removedImages', JSON.stringify(removedImages));

      const response = await axios.put(
        `https://barods-global.onrender.com/api/v1/admin/properties/${property._id}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        toast.success('Property updated successfully!');
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error(error.response?.data?.message || 'Failed to update property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-property">
      <header className="form-header">
        <button className="back-button" onClick={onClose}>
          <ArrowLeft size={20} />
          Back
        </button>
        <h2>Edit Property</h2>
      </header>

      <form onSubmit={handleSubmit} className="property-form">
        {/* Form fields are identical to AddProperty component */}
        {/* Just ensure all fields are pre-filled with property data */}
        
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-button"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Property'}
          </button>
        </div>
      </form>
    </div>
  );
};
EditProperty.propTypes = {
  property: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string,
    street: PropTypes.string,
    area: PropTypes.string,
    state: PropTypes.string,
    status: PropTypes.string,
    type: PropTypes.string,
    category: PropTypes.string,
    currency: PropTypes.string,
    price: PropTypes.string,
    paymentFrequency: PropTypes.string,
    bedrooms: PropTypes.string,
    bathrooms: PropTypes.string,
    toilets: PropTypes.string,
    parking: PropTypes.bool,
    description: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    amenities: PropTypes.object
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default EditProperty;