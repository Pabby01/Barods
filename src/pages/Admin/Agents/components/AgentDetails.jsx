import { ArrowLeft } from 'lucide-react';
import PropTypes from 'prop-types';
import './AgentDetails.css';

const AgentDetails = ({ agent, onClose }) => {
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
            src={agent.image || '/default-avatar.png'} 
            alt={agent.name} 
            className="agent-image"
          />
          <div className="agent-header">
            <h3>{agent.name}</h3>
            <span className={`status-badge ${agent.verified ? 'verified' : 'unverified'}`}>
              {agent.verified ? 'Verified' : 'Unverified'}
            </span>
          </div>
        </div>

        <div className="info-grid">
          <div className="info-item">
            <span className="label">Agent ID</span>
            <span>{agent.agentId}</span>
          </div>
          <div className="info-item">
            <span className="label">Email</span>
            <span>{agent.email}</span>
          </div>
          <div className="info-item">
            <span className="label">Phone</span>
            <span>{agent.phone}</span>
          </div>
          <div className="info-item">
            <span className="label">Join Date</span>
            <span>{new Date(agent.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{agent.totalListings || 0}</span>
            <span className="stat-label">Total Listings</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{agent.completedDeals || 0}</span>
            <span className="stat-label">Completed Deals</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">
              {agent.conversionRate ? `${agent.conversionRate}%` : '0%'}
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