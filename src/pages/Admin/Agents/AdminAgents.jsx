import { useState, useEffect } from 'react';
import { Search, Plus, Check, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from '../components/AdminLayout';
import AddAgent from './components/AddAgent';
import AgentDetails from './components/AgentDetails';
import './AdminAgents.css';

const AdminAgents = () => {
  const [view, setView] = useState('list'); // list, add, details
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);

  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem('AdminToken');
      const response = await axios.get('https://barods-global.onrender.com/api/v1/admin/all/agents', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setAgents(response.data.agents);
      }
    } catch (error) {
      console.error('Error fetching agents:', error);
      toast.error('Failed to load agents');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleVerifyAgent = async (agentId, isVerified) => {
    try {
      const token = localStorage.getItem('AdminToken');
      await axios.put(
        `https://barods-global.onrender.com/api/v1/admin/agents/${agentId}/verify`,
        { verified: isVerified },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Agent ${isVerified ? 'verified' : 'unverified'} successfully`);
      fetchAgents();
    } catch (error) {
      console.error('Error updating agent status:', error);
      toast.error('Failed to update agent status');
    }
  };

  const handleBlockAgent = async (agentId, isBlocked) => {
    try {
      const token = localStorage.getItem('AdminToken');
      await axios.put(
        `https://barods-global.onrender.com/api/v1/admin/agents/${agentId}/block`,
        { blocked: isBlocked },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Agent ${isBlocked ? 'blocked' : 'unblocked'} successfully`);
      fetchAgents();
    } catch (error) {
      console.error('Error updating agent status:', error);
      toast.error('Failed to update agent status');
    }
  };

  return (
    <AdminLayout>
      <div className="admin-agents">
        <header className="agents-header">
          <h1>Agents</h1>
          <div className="header-actions">
            <div className="search-bar">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="add-agent-btn" onClick={() => setView('add')}>
              <Plus size={20} />
              Add Agent
            </button>
          </div>
        </header>

        <main className="agents-content">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : view === 'list' ? (
            <div className="agents-list">
              <table>
                <thead>
                  <tr>
                    <th>Agent ID</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Total Listing</th>
                    <th>Completed Deals</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.map((agent) => (
                    <tr key={agent._id}>
                      <td>{agent.agentId}</td>
                      <td className="agent-name">
                        <img src={agent.image || '/default-avatar.png'} alt={agent.name} />
                        <span>{agent.name}</span>
                      </td>
                      <td>{agent.phone}</td>
                      <td>
                        <span className={`status-badge ${agent.verified ? 'verified' : 'unverified'}`}>
                          {agent.verified ? 'Verified' : 'Unverified'}
                        </span>
                      </td>
                      <td>{agent.totalListings || 0}</td>
                      <td>{agent.completedDeals || 0}</td>
                      <td>{new Date(agent.lastLogin).toLocaleDateString()}</td>
                      <td>
                        <div className="actions">
                          <button 
                            className="view-btn"
                            onClick={() => {
                              setSelectedAgent(agent);
                              setView('details');
                            }}
                          >
                            View
                          </button>
                          {agent.verified ? (
                            <button
                              className="unverify-btn"
                              onClick={() => handleVerifyAgent(agent._id, false)}
                            >
                              <X size={16} />
                              Unverify
                            </button>
                          ) : (
                            <button
                              className="verify-btn"
                              onClick={() => handleVerifyAgent(agent._id, true)}
                            >
                              <Check size={16} />
                              Verify
                            </button>
                          )}
                          <button
                            className={`block-btn ${agent.blocked ? 'unblock' : ''}`}
                            onClick={() => handleBlockAgent(agent._id, !agent.blocked)}
                          >
                            {agent.blocked ? 'Unblock' : 'Block'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : view === 'add' ? (
            <AddAgent onClose={() => setView('list')} onSuccess={fetchAgents} />
          ) : (
            <AgentDetails agent={selectedAgent} onClose={() => setView('list')} />
          )}
        </main>
      </div>
    </AdminLayout>
  );
};

export default AdminAgents;