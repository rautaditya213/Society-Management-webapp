import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Card, Button, Input } from '../components/UI';

const AdminNotifications = () => {
  const { notifications, addNotification } = useData();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', message: '' });

  const handlePublish = (e) => {
      e.preventDefault();
      addNotification(formData);
      setShowForm(false);
      setFormData({ title: '', message: '' });
  };

  return (
    <div className="page-container">
      <div className="page-header flex-between">
        <h1 className="page-title">Society Notifications</h1>
        <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'New Notification'}
        </Button>
      </div>

      {showForm && (
          <Card className="mt-4 mb-4 form-card">
              <h3>Publish Announcement</h3>
              <form onSubmit={handlePublish} className="flex-col gap-4 mt-2">
                  <Input 
                      label="Notice Title" 
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                  />
                  <div className="input-group">
                      <label>Message Content</label>
                      <textarea 
                          className="input-field" 
                          rows="4"
                          required
                          value={formData.message}
                          onChange={e => setFormData({...formData, message: e.target.value})}
                      />
                  </div>
                  <div>
                    <Button type="submit">Publish Notification</Button>
                  </div>
              </form>
          </Card>
      )}

      <div className="notifications-list mt-4">
          {notifications.slice().reverse().map(notif => (
              <Card key={notif.id} className="notification-card mb-4">
                  <div className="flex-between mb-2">
                      <h3 className="notif-title">{notif.title}</h3>
                      <span className="text-sm text-gray">{notif.date}</span>
                  </div>
                  <p className="text-gray">{notif.message}</p>
              </Card>
          ))}
          {notifications.length === 0 && <p className="text-center text-gray mt-8">No notifications published yet.</p>}
      </div>
    </div>
  );
};

export default AdminNotifications;
