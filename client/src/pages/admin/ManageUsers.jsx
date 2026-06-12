import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import Loader from '../../components/Loader';
import Alert from '../../components/Alert';
import { FaTrash, FaUserShield, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './AdminPages.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const { data } = await axiosInstance.get('/admin/users');
      setUsers(data.users);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete user "${name}"? This cannot be undone.`)) {
      try {
        await axiosInstance.delete(`/admin/users/${id}`);
        toast.success(`User ${name} deleted`);
        fetchUsers();
      } catch (err) {
        toast.error(err.response?.data?.message || 'Delete failed');
      }
    }
  };

  const formatDate = (d) => new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

  if (loading) return <Loader />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Manage Users</h2>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{users.length} registered users</span>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border-color)' }} />
                  ) : (
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                      <FaUser />
                    </div>
                  )}
                </td>
                <td style={{ fontWeight: 600 }}>{user.name}</td>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === 'admin' ? 'badge-info' : 'badge-success'}`}>
                    {user.role === 'admin' ? <><FaUserShield /> Admin</> : 'User'}
                  </span>
                </td>
                <td style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{formatDate(user.createdAt)}</td>
                <td>
                  {user.role !== 'admin' ? (
                    <button onClick={() => handleDelete(user._id, user.name)} className="btn btn-danger" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>
                      <FaTrash />
                    </button>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Protected</span>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan={6} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No users found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
