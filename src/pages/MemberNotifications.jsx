import React from 'react';
import { useData } from '../context/DataContext';
import { Card } from '../components/UI';

const MemberNotifications = () => {
  const { notifications } = useData();

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Society Updates & Notices</h1>
      </div>

      <div className="notifications-list mt-4">
          {notifications.slice().reverse().map(notif => (
              <Card key={notif.id} className="notification-card mb-4 border-l-4 border-primary">
                  <div className="flex-between mb-2">
                      <h3 className="notif-title">{notif.title}</h3>
                      <span className="text-sm text-gray">{notif.date}</span>
                  </div>
                  <p className="text-gray">{notif.message}</p>
              </Card>
          ))}
          {notifications.length === 0 && (
              <p className="text-center text-gray mt-8">No notifications available.</p>
          )}
      </div>
    </div>
  );
};

export default MemberNotifications;
