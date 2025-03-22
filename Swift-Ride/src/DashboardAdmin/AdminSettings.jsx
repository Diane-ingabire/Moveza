import React, { useState, useEffect } from 'react';
import './AdminStyles/adminsettings.css';

const AdminSettings = () => {
  // State for profile settings
  const [profileData, setProfileData] = useState({
    companyName: 'Kigali Express Ltd',
    ownerName: 'Jean-Pierre Habimana',
    email: 'operations@kigaliexpress.rw',
    phone: '+250 782 123 456',
    address: 'KN 5 Rd, Kigali, Rwanda',
    logo: 'https://example.com/logo.png', // Placeholder
    website: 'www.kigaliexpress.rw'
  });

  // State for notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: true,
    bookingNotifications: true,
    reportNotifications: true,
    marketingEmails: false
  });

  // State for system settings
  const [systemSettings, setSystemSettings] = useState({
    language: 'english',
    currency: 'RWF',
    timezone: 'Africa/Kigali',
    dateFormat: 'DD/MM/YYYY',
    autoLogout: 30, // minutes
    maxSeatsPerBooking: 5
  });

  // State for payment settings
  const [paymentSettings, setPaymentSettings] = useState({
    mobileMoneyEnabled: true,
    cardPaymentsEnabled: true,
    bankTransferEnabled: false,
    serviceFee: 3.5, // percentage
    instantRefundsEnabled: true,
    paymentProviders: ['MTN Mobile Money', 'Airtel Money', 'Visa', 'Mastercard']
  });

  // State for security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    passwordExpiry: 90, // days
    loginAttempts: 5,
    requireStrongPasswords: true
  });

  // State to track which settings panel is active
  const [activePanel, setActivePanel] = useState('profile');
  
  // State for form submission and feedback
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);

  // Handle changes to profile data
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle changes to notification settings (toggle switches)
  const handleNotificationToggle = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Handle changes to system settings
  const handleSystemChange = (e) => {
    const { name, value } = e.target;
    setSystemSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle changes to payment settings
  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPaymentSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle changes to security settings
  const handleSecurityChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSecuritySettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Simulate save settings
  const saveSettings = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    setSaveError(false);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      
      // Success 90% of the time for demo purposes
      if (Math.random() > 0.1) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        setSaveError(true);
        setTimeout(() => setSaveError(false), 3000);
      }
    }, 1000);
  };

  // Handle file upload for company logo
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you would upload this file to your server
      // Here we just create a local object URL
      const objectUrl = URL.createObjectURL(file);
      setProfileData(prev => ({
        ...prev,
        logo: objectUrl
      }));
    }
  };

  return (
    <div className="admin-settings-container">
      <div className="settings-header">
        <h1>Admin Settings</h1>
        <p>Configure your SwiftRide admin dashboard and company preferences</p>
      </div>

      <div className="settings-content">
        <div className="settings-sidebar">
          <ul>
            <li 
              className={activePanel === 'profile' ? 'active' : ''} 
              onClick={() => setActivePanel('profile')}
            >
              Company Profile
            </li>
            <li 
              className={activePanel === 'notifications' ? 'active' : ''} 
              onClick={() => setActivePanel('notifications')}
            >
              Notifications
            </li>
            <li 
              className={activePanel === 'system' ? 'active' : ''} 
              onClick={() => setActivePanel('system')}
            >
              System Preferences
            </li>
            <li 
              className={activePanel === 'payment' ? 'active' : ''} 
              onClick={() => setActivePanel('payment')}
            >
              Payment Settings
            </li>
            <li 
              className={activePanel === 'security' ? 'active' : ''} 
              onClick={() => setActivePanel('security')}
            >
              Security
            </li>
          </ul>
        </div>

        <div className="settings-panel">
          {/* Feedback messages */}
          {isSaving && (
            <div className="settings-message saving">
              <div className="spinner-small"></div>
              <span>Saving changes...</span>
            </div>
          )}
          
          {saveSuccess && (
            <div className="settings-message success">
              <span>✓</span> Settings saved successfully
            </div>
          )}
          
          {saveError && (
            <div className="settings-message error">
              <span>✕</span> Error saving settings. Please try again.
            </div>
          )}

          {/* Profile Settings Panel */}
          {activePanel === 'profile' && (
            <div className="panel-content">
              <h2>Company Profile</h2>
              <p>Manage your company information displayed to customers</p>
              
              <div className="logo-upload-section">
                <div className="current-logo">
                  <img 
                    src={profileData.logo || '/placeholder-logo.png'} 
                    alt="Company logo" 
                    className="company-logo"
                  />
                </div>
                <div className="logo-upload-controls">
                  <h3>Company Logo</h3>
                  <p>Recommended size: 200x200px. Max size: 1MB</p>
                  <input 
                    type="file" 
                    id="logo-upload" 
                    accept="image/*" 
                    onChange={handleLogoUpload}
                    className="file-input"
                  />
                  <label htmlFor="logo-upload" className="file-input-label">
                    Choose New Logo
                  </label>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Company Name</label>
                  <input 
                    type="text" 
                    name="companyName" 
                    value={profileData.companyName} 
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group">
                  <label>Owner/Manager Name</label>
                  <input 
                    type="text" 
                    name="ownerName" 
                    value={profileData.ownerName} 
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={profileData.email} 
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={profileData.phone} 
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Business Address</label>
                  <input 
                    type="text" 
                    name="address" 
                    value={profileData.address} 
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="form-group">
                  <label>Website (Optional)</label>
                  <input 
                    type="text" 
                    name="website" 
                    value={profileData.website} 
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notification Settings Panel */}
          {activePanel === 'notifications' && (
            <div className="panel-content">
              <h2>Notification Settings</h2>
              <p>Configure how you receive alerts and notifications</p>
              
              <div className="notification-grid">
                <div className="toggle-group">
                  <div className="toggle-label">
                    <h3>Email Alerts</h3>
                    <p>Receive important notifications via email</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.emailAlerts} 
                      onChange={() => handleNotificationToggle('emailAlerts')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-group">
                  <div className="toggle-label">
                    <h3>SMS Alerts</h3>
                    <p>Receive important notifications via SMS</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.smsAlerts} 
                      onChange={() => handleNotificationToggle('smsAlerts')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-group">
                  <div className="toggle-label">
                    <h3>Booking Notifications</h3>
                    <p>Get notified for new bookings and cancellations</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.bookingNotifications} 
                      onChange={() => handleNotificationToggle('bookingNotifications')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-group">
                  <div className="toggle-label">
                    <h3>Report Notifications</h3>
                    <p>Receive weekly and monthly report summaries</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.reportNotifications} 
                      onChange={() => handleNotificationToggle('reportNotifications')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-group">
                  <div className="toggle-label">
                    <h3>Marketing Emails</h3>
                    <p>Receive updates about new features and promotions</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.marketingEmails} 
                      onChange={() => handleNotificationToggle('marketingEmails')}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* System Settings Panel */}
          {activePanel === 'system' && (
            <div className="panel-content">
              <h2>System Preferences</h2>
              <p>Configure language, timezone and default settings</p>
              
              <div className="form-grid">
                <div className="form-group">
                  <label>Language</label>
                  <select 
                    name="language" 
                    value={systemSettings.language} 
                    onChange={handleSystemChange}
                  >
                    <option value="english">English</option>
                    <option value="french">French</option>
                    <option value="kinyarwanda">Kinyarwanda</option>
                    <option value="swahili">Swahili</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Currency</label>
                  <select 
                    name="currency" 
                    value={systemSettings.currency} 
                    onChange={handleSystemChange}
                  >
                    <option value="RWF">Rwandan Franc (RWF)</option>
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Timezone</label>
                  <select 
                    name="timezone" 
                    value={systemSettings.timezone} 
                    onChange={handleSystemChange}
                  >
                    <option value="Africa/Kigali">Africa/Kigali (EAT)</option>
                    <option value="UTC">UTC</option>
                    <option value="Europe/London">Europe/London (GMT)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Date Format</label>
                  <select 
                    name="dateFormat" 
                    value={systemSettings.dateFormat} 
                    onChange={handleSystemChange}
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Auto Logout (minutes)</label>
                  <input 
                    type="number" 
                    name="autoLogout" 
                    value={systemSettings.autoLogout} 
                    onChange={handleSystemChange}
                    min="5"
                    max="120"
                  />
                </div>

                <div className="form-group">
                  <label>Max Seats Per Booking</label>
                  <input 
                    type="number" 
                    name="maxSeatsPerBooking" 
                    value={systemSettings.maxSeatsPerBooking} 
                    onChange={handleSystemChange}
                    min="1"
                    max="10"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Payment Settings Panel */}
          {activePanel === 'payment' && (
            <div className="panel-content">
              <h2>Payment Settings</h2>
              <p>Configure payment methods and transaction fees</p>
              
              <div className="toggle-section">
                <h3>Payment Methods</h3>
                
                <div className="toggle-group">
                  <div className="toggle-label">
                    <h4>Mobile Money</h4>
                    <p>Accept payments via MTN and Airtel Money</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      name="mobileMoneyEnabled"
                      checked={paymentSettings.mobileMoneyEnabled} 
                      onChange={handlePaymentChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-group">
                  <div className="toggle-label">
                    <h4>Card Payments</h4>
                    <p>Accept Visa and Mastercard payments</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      name="cardPaymentsEnabled"
                      checked={paymentSettings.cardPaymentsEnabled} 
                      onChange={handlePaymentChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="toggle-group">
                  <div className="toggle-label">
                    <h4>Bank Transfer</h4>
                    <p>Allow manual bank transfer for bookings</p>
                  </div>
                  <label className="toggle-switch">
                    <input 
                      type="checkbox" 
                      name="bankTransferEnabled"
                      checked={paymentSettings.bankTransferEnabled} 
                      onChange={handlePaymentChange}
                    />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Service Fee (%)</label>
                  <input 
                    type="number" 
                    name="serviceFee" 
                    value={paymentSettings.serviceFee} 
                    onChange={handlePaymentChange}
                    step="0.1"
                    min="0"
                    max="20"
                  />
                </div>
              </div>

              <div className="toggle-group">
                <div className="toggle-label">
                  <h4>Instant Refunds</h4>
                  <p>Allow automatic refunds for cancelled bookings</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    name="instantRefundsEnabled"
                    checked={paymentSettings.instantRefundsEnabled} 
                    onChange={handlePaymentChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          )}

          {/* Security Settings Panel */}
          {activePanel === 'security' && (
            <div className="panel-content">
              <h2>Security Settings</h2>
              <p>Configure account security and authentication options</p>
              
              <div className="toggle-group">
                <div className="toggle-label">
                  <h3>Two-Factor Authentication</h3>
                  <p>Require SMS code in addition to password</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    name="twoFactorEnabled"
                    checked={securitySettings.twoFactorEnabled} 
                    onChange={handleSecurityChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Password Expiry (days)</label>
                  <input 
                    type="number" 
                    name="passwordExpiry" 
                    value={securitySettings.passwordExpiry} 
                    onChange={handleSecurityChange}
                    min="0"
                    max="365"
                  />
                  <small>Set to 0 for no expiry</small>
                </div>

                <div className="form-group">
                  <label>Max Login Attempts</label>
                  <input 
                    type="number" 
                    name="loginAttempts" 
                    value={securitySettings.loginAttempts} 
                    onChange={handleSecurityChange}
                    min="3"
                    max="10"
                  />
                </div>
              </div>

              <div className="toggle-group">
                <div className="toggle-label">
                  <h3>Strong Passwords Required</h3>
                  <p>Enforce passwords with at least 8 characters, numbers and symbols</p>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    name="requireStrongPasswords"
                    checked={securitySettings.requireStrongPasswords} 
                    onChange={handleSecurityChange}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="security-actions">
                <button className="action-button">Change Admin Password</button>
                <button className="action-button">Manage Staff Access</button>
                <button className="action-button danger">Force Logout All Users</button>
              </div>
            </div>
          )}

          <div className="settings-footer">
            <button className="cancel-btn">Cancel</button>
            <button className="save-btn" onClick={saveSettings} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;