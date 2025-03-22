import React, { useState, useEffect } from 'react';
import { Bell, Mail, X } from 'lucide-react';
import './AdminStyles/adminemails.css';

const AdminEmails = () => {
  const [showEmails, setShowEmails] = useState(false);
  const [emails, setEmails] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // This would typically be an API call to fetch emails
    // Using mock data for demonstration
    const mockEmails = [
      {
        id: 1,
        sender: 'John Doe',
        subject: 'Bus Schedule Question',
        message: 'I need information about the weekend schedule for Route 42.',
        time: '2 hours ago',
        read: false
      },
      {
        id: 2,
        sender: 'Mary Smith',
        subject: 'Refund Request',
        message: 'My trip was canceled due to weather. I would like to request a refund.',
        time: '3 hours ago',
        read: false
      },
      {
        id: 3,
        sender: 'Robert Johnson',
        subject: 'Booking Confirmation',
        message: 'Please confirm my booking for tomorrow at 9 AM.',
        time: '1 day ago',
        read: true
      },
      {
        id: 4,
        sender: 'SwiftRide System',
        subject: 'Daily Report',
        message: 'Your daily booking report is ready for review.',
        time: '1 day ago',
        read: true
      }
    ];

    setEmails(mockEmails);
    setUnreadCount(mockEmails.filter(email => !email.read).length);
  }, []);

  const toggleEmailDropdown = () => {
    setShowEmails(!showEmails);
  };

  const markAsRead = (id) => {
    const updatedEmails = emails.map(email => {
      if (email.id === id && !email.read) {
        return { ...email, read: true };
      }
      return email;
    });
    
    setEmails(updatedEmails);
    setUnreadCount(updatedEmails.filter(email => !email.read).length);
  };

  const handleEmailClick = (id) => {
    markAsRead(id);
    // Here you would typically navigate to a full email view
    // For now, just console log
    console.log(`Viewing email ${id}`);
  };

  return (
    <div className="admin-emails-container">
      <div className="email-icon" onClick={toggleEmailDropdown}>
        <Mail size={24} />
        {unreadCount > 0 && <span className="email-badge">{unreadCount}</span>}
      </div>

      {showEmails && (
        <div className="email-dropdown">
          <div className="email-header">
            <h3>Messages</h3>
            <button className="close-btn" onClick={toggleEmailDropdown}>
              <X size={18} />
            </button>
          </div>
          
          <div className="email-list">
            {emails.length > 0 ? (
              emails.map(email => (
                <div 
                  key={email.id} 
                  className={`email-item ${!email.read ? 'unread' : ''}`}
                  onClick={() => handleEmailClick(email.id)}
                >
                  <div className="email-info">
                    <div className="email-sender">{email.sender}</div>
                    <div className="email-subject">{email.subject}</div>
                    <div className="email-preview">{email.message}</div>
                    <div className="email-time">{email.time}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-emails">No messages found</div>
            )}
          </div>
          
          <div className="email-footer">
            <a href="/messages" className="view-all">View All Messages</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEmails;