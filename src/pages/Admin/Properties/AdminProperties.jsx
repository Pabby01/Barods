import { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';
import AddProperty from './components/AddProperty';
import EditProperty from './components/EditProperty';
import EmptyState from './components/EmptyState';
import AdminLayout from '../components/AdminLayout';
import './AdminProperties.css';

const AdminProperties = () => {
  const [view, setView] = useState('list'); // list, add, edit, details
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem('AdminToken');
      const response = await axios.get('https://barods-global.onrender.com/api/v1/admin/properties', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setProperties(response.data.properties);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleAddProperty = () => {
    setView('add');
  };

  const handleEditProperty = (property) => {
    setSelectedProperty(property);
    setView('edit');
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setView('details');
  };

  const renderContent = () => {
    if (loading) {
      return <div className="loading">Loading...</div>;
    }

    if (properties.length === 0 && view === 'list') {
      return <EmptyState onAdd={handleAddProperty} />;
    }

    switch (view) {
      case 'list':
        return (
          <PropertyList
            properties={properties}
            onEdit={handleEditProperty}
            onView={handleViewDetails}
          />
        );
      case 'add':
        return <AddProperty onClose={() => setView('list')} onSuccess={fetchProperties} />;
      case 'edit':
        return (
          <EditProperty
            property={selectedProperty}
            onClose={() => setView('list')}
            onSuccess={fetchProperties}
          />
        );
      case 'details':
        return (
          <PropertyDetails
            property={selectedProperty}
            onClose={() => setView('list')}
            onEdit={handleEditProperty}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="admin-properties">
        <header className="properties-header">
          <h1>Properties</h1>
          <div className="header-actions">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {view === 'list' && (
              <button className="add-property-btn" onClick={handleAddProperty}>
                <Plus size={20} />
                Add Property
              </button>
            )}
          </div>
        </header>

        <main className="properties-content">
          {renderContent()}
        </main>
      </div>
    </AdminLayout>
  );
};

export default AdminProperties;