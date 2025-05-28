import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import PropTypes from 'prop-types';
import axios from 'axios';
import toast from 'react-hot-toast';
import './AgentDetails.css';

const AgentDetails = ({ agent, onClose }) => {
  const [agentDetails, setAgentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('AdminToken');
        
        if (!agent || !agent._id) {
          throw new Error('Agent ID is missing');
        }
        
        const response = await axios.get(
          `https://barods-global.onrender.com/api/v1/admin/agent/${agent._id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (response.data.success) {
          setAgentDetails(response.data.agent);
        } else {
          throw new Error(response.data.message || 'Failed to fetch agent details');
        }
      } catch (error) {
        console.error('Error fetching agent details:', error);
        setError(error.message || 'Failed to fetch agent details');
        toast.error(error.response?.data?.message || 'Failed to fetch agent details');
      } finally {
        setLoading(false);
      }
    };

    fetchAgentDetails();
  }, [agent]);

  if (loading) {
    return (
      <div className="agent-details">
        <header className="details-header">
          <button className="back-button" onClick={onClose}>
            <ArrowLeft size={20} />
            Back
          </button>
          <h2>Agent Details</h2>
        </header>
        <div className="loading-container">
          <div className="loading">Loading agent details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="agent-details">
        <header className="details-header">
          <button className="back-button" onClick={onClose}>
            <ArrowLeft size={20} />
            Back
          </button>
          <h2>Agent Details</h2>
        </header>
        <div className="error-container">
          <div className="error">Error: {error}</div>
          <button className="retry-button" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Use the fetched agent details, falling back to the prop if needed
  const displayAgent = agentDetails || agent;

  return (
    <div className="agent-details">
      <header className="details-header">
        <button className="back-button" onClick={onClose}>
          <ArrowLeft size={20} />
          Back
        </button>
        <h2>Agent Details</h2>
      </header>

      <div className="agent-info">
        <div className="agent-profile">
          <img 
            src={displayAgent.image || '/default-avatar.png'} 
            alt={displayAgent.name} 
            className="agent-image"
          />
          <div className="agent-header">
            <h3>{displayAgent.name}</h3>
            <span className={`status-badge ${displayAgent.verified ? 'verified' : 'unverified'}`}>
              {displayAgent.verified ? 'Verified' : 'Unverified'}
            </span>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <span className="label">Agent ID</span>
            <span>{displayAgent.agentId}</span>
          </div>
          <div className="info-item">
            <span className="label">Email</span>
            <span>{displayAgent.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Phone</span>
            <span>{displayAgent.phone}</span>
          </div>
          <div className="info-item">
            <span className="label">Join Date</span>
            <span>{new Date(displayAgent.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{displayAgent.totalListings || 0}</span>
            <span className="stat-label">Total Listings</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{displayAgent.completedDeals || 0}</span>
            <span className="stat-label">Completed Deals</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              {displayAgent.conversionRate ? `${displayAgent.conversionRate}%` : '0%'}
            </span>
            <span className="stat-label">Conversion Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

AgentDetails.propTypes = {
  agent: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AgentDetails;