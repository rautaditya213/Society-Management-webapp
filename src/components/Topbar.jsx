import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from 'lucide-react';

const Topbar = () => {
  const { user } = useAuth();
  
  return (
    <header className="topbar">
      <div className="topbar-search">
        {/* Placeholder for future global search if needed */}
      </div>
      <div className="topbar-profile">
        <div className="profile-info">
          <span className="profile-name">{user?.name}</span>
          <span className="profile-role">
            {user?.role === 'admin' ? 'Administrator' : `Flat: ${user?.flatNumber}`}
          </span>
        </div>
        <div className="profile-avatar">
          <User size={20} />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
