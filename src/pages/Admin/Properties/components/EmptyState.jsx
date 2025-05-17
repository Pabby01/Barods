import { Building, Plus } from 'lucide-react';
import PropTypes from 'prop-types';
import './EmptyState.css';

const EmptyState = ({ onAdd }) => {
  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <div className="icon-wrapper">
          <Building size={48} />
        </div>
        <h3>No Properties Listed Yet</h3>
        <p>Get started by adding your first property listing</p>
        <button className="add-first-property" onClick={onAdd}>
          <Plus size={20} />
          Add Property
        </button>
      </div>
    </div>
  );
};
EmptyState.propTypes = {
  onAdd: PropTypes.func.isRequired
};

export default EmptyState;