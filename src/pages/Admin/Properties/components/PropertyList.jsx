import { useState } from 'react';
import { MoreVertical, Eye, Edit, Trash2 } from 'lucide-react';
import PropTypes from 'prop-types';
import './PropertyList.css';

const PropertyList = ({ properties, onEdit, onView }) => {
  const [selectedId, setSelectedId] = useState(null);

  const toggleActions = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  return (
    <div className="property-list-container2">
      <div className="property-list-header">
        <div className="list-stats">
          All Properties ({properties.length})
        </div>
      </div>

      <table className="property-table">
        <thead>
          <tr>
            <th>Property ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Status</th>
            <th>Agent</th>
            <th>Date Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property._id}>
              <td>{property.propertyId}</td>
              <td>{property.title}</td>
              <td>{property.category}</td>
              <td>
                <span className={`status-badge ${property.status.toLowerCase()}`}>
                  {property.status}
                </span>
              </td>
              <td>{property.agent}</td>
              <td>{new Date(property.createdAt).toLocaleDateString()}</td>
              <td>
                <div className="actions-container">
                  <button 
                    className="action-toggle"
                    onClick={() => toggleActions(property._id)}
                  >
                    <MoreVertical size={16} />
                  </button>
                  {selectedId === property._id && (
                    <div className="actions-dropdown">
                      <button onClick={() => onView(property)}>
                        <Eye size={16} />
                        View Details
                      </button>
                      <button onClick={() => onEdit(property)}>
                        <Edit size={16} />
                        Edit
                      </button>
                      <button className="delete">
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
PropertyList.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      propertyId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      agent: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

export default PropertyList;