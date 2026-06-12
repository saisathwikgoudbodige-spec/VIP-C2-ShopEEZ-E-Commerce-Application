import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../redux/slices/authSlice';
import axiosInstance from '../api/axiosInstance';
import Alert from '../components/Alert';
import Loader from '../components/Loader';
import { FaUser, FaSave, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateVal, setStateVal] = useState('');
  const [pincode, setPincode] = useState('');
  const [country, setCountry] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNew, setConfirmNew] = useState('');
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || '');
      setPhone(userInfo.phone || '');
      const addr = userInfo.address || {};
      setStreet(addr.street || '');
      setCity(addr.city || '');
      setStateVal(addr.state || '');
      setPincode(addr.pincode || '');
      setCountry(addr.country || '');
    }
  }, [userInfo]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    dispatch(updateProfile({
      name,
      phone,
      address: { street, city, state: stateVal, pincode, country }
    }));
    toast.success('Profile updated successfully!');
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmNew) {
      toast.error('Please fill all password fields');
      return;
    }
    if (newPassword !== confirmNew) {
      toast.error('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setPwLoading(true);
    try {
      const { data } = await axiosInstance.put('/auth/change-password', { currentPassword, newPassword });
      if (data.success) {
        toast.success('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNew('');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setPwLoading(false);
    }
  };

  if (!userInfo) return <Loader />;

  return (
    <div className="profile-page">
      <h2 className="page-title">My Profile</h2>

      <div className="profile-layout">
        {/* Avatar Card */}
        <div className="profile-avatar-card glass-card">
          <div className="avatar-wrapper">
            {userInfo.avatar ? (
              <img src={userInfo.avatar} alt={userInfo.name} className="profile-avatar-img" />
            ) : (
              <div className="profile-avatar-placeholder">
                <FaUser />
              </div>
            )}
          </div>
          <h3>{userInfo.name}</h3>
          <p>{userInfo.email}</p>
          <span className={`role-badge ${userInfo.role === 'admin' ? 'admin-role' : 'user-role'}`}>
            {userInfo.role === 'admin' ? '⚡ Admin' : '👤 Customer'}
          </span>
        </div>

        {/* Edit Profile Form */}
        <div className="profile-forms">
          <div className="glass-card profile-form-card">
            <h3><FaUser /> Personal Information</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <form onSubmit={handleProfileSave} className="profile-form">
              <div className="form-row-grid">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <h4 className="subsection-title">Delivery Address</h4>
              <div className="form-group">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="123 Main St"
                />
              </div>
              <div className="form-row-grid">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input type="text" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">State</label>
                  <input type="text" className="form-control" value={stateVal} onChange={(e) => setStateVal(e.target.value)} />
                </div>
              </div>
              <div className="form-row-grid">
                <div className="form-group">
                  <label className="form-label">Pincode</label>
                  <input type="text" className="form-control" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <input type="text" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} />
                </div>
              </div>

              <button type="submit" disabled={loading} className="btn btn-primary">
                <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Change Password */}
          <div className="glass-card profile-form-card">
            <h3><FaLock /> Change Password</h3>
            <form onSubmit={handlePasswordChange} className="profile-form">
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmNew}
                  onChange={(e) => setConfirmNew(e.target.value)}
                  placeholder="Repeat new password"
                />
              </div>
              <button type="submit" disabled={pwLoading} className="btn btn-secondary">
                <FaLock /> {pwLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
