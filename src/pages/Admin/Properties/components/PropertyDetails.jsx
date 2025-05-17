import { ArrowLeft, Edit } from 'lucide-react';
import PropTypes from 'prop-types';
import './PropertyDetails.css';

const PropertyDetails = ({ property, onClose, onEdit }) => {
  return (
    <div className="property-details">
      <header className="details-header">
        <button className="back-button" onClick={onClose}>
          <ArrowLeft size={20} />
          Back
        </button>
        <button className="edit-button" onClick={() => onEdit(property)}>
          <Edit size={20} />
          Edit Property
        </button>
      </header>

      <div className="property-content">
        <div className="property-images">
          {property.images?.map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt={`Property ${index + 1}`} 
              className="property-image" 
            />
          ))}
        </div>

        <div className="property-info">
          <h1 className="property-title">{property.title}</h1>
          <p className="property-location">{property.street}, {property.area}, {property.state}</p>
          
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Status</span>
              <span className={`status-badge ${property.status.toLowerCase()}`}>
                {property.status}
              </span>
            </div>
            <div className="info-item">
              <span className="label">Type</span>
              <span>{property.type}</span>
            </div>
            <div className="info-item">
              <span className="label">Category</span>
              <span>{property.category}</span>
            </div>
            <div className="info-item">
              <span className="label">Price</span>
              <span className="price">₦{property.price.toLocaleString()}</span>
            </div>
          </div>

          <div className="property-features">
            <h2>Features</h2>
            <div className="features-grid">
              <div className="feature">
                <span className="label">Bedrooms</span>
                <span>{property.bedrooms}</span>
              </div>
              <div className="feature">
                <span className="label">Bathrooms</span>
                <span>{property.bathrooms}</span>
              </div>
              <div className="feature">
                <span className="label">Toilets</span>
                <span>{property.toilets}</span>
              </div>
              <div className="feature">
                <span className="label">Parking</span>
                <span>{property.parking ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>

          <div className="property-amenities">
            <h2>Amenities</h2>
            <div className="amenities-grid">
              {Object.entries(property.amenities || {}).map(([key, value]) => (
                value && (
                  <div key={key} className="amenity">
                    <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                )
              ))}
            </div>
          </div>

          <div className="property-description">
            <h2>Description</h2>
            <p>{property.description}</p>
          </div>

          <div className="agent-info">
            <h2>Listed By</h2>
            <div className="agent-details">
              <div className="agent-profile">
                <img src={property.agent?.image || '/default-avatar.png'} alt="Agent" />
                <div>
                  <h3>{property.agent?.name}</h3>
                  <p>{property.agent?.email}</p>
                  <p>{property.agent?.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
PropertyDetails.propTypes = {
  property: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired,
    street: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    toilets: PropTypes.number.isRequired,
    parking: PropTypes.bool.isRequired,
    amenities: PropTypes.object,
    description: PropTypes.string.isRequired,
    agent: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired
    })
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default PropertyDetails;