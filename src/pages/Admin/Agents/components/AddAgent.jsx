import { useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import toast from 'react-hot-toast';
import './AddAgent.css';

const AddAgent = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
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

      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key]) {
          formDataToSend.append('image', formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await axios.post(
        'https://barods-global.onrender.com/api/v1/admin/agents',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        toast.success('Agent added successfully!');
        onSuccess();
        onClose();
      }
    } catch (error) {
      console.error('Error adding agent:', error);
      toast.error(error.response?.data?.message || 'Failed to add agent');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-agent">
      <header className="form-header">
        <button className="back-button" onClick={onClose}>
          <ArrowLeft size={20} />
          Back
        </button>
        <h3>Add Agent</h3>
      </header>

      <form onSubmit={handleSubmit} className="agent-form">
        <div className="form-grid">
          <div className="form-field">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label>Profile Image</label>
            <div className="image-upload-box">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
              <div className="upload-placeholder">
                <Upload size={24} />
                <span>Click to upload</span>
                <span className="file-types">jpg/png/pdf, 5MB</span>
              </div>
            </div>
          </div>
        </div>

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
            {loading ? 'Adding...' : 'Add Agent'}
          </button>
        </div>
      </form>
    </div>
  );
};

AddAgent.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default AddAgent;