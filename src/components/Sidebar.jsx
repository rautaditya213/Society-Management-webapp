import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home, Users, CheckSquare, AlertTriangle, Bell, LogOut, FileText } from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  
  const adminLinks = [
    { to: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/flats', icon: <Users size={20} />, label: 'Flats' },
    { to: '/maintenance', icon: <CheckSquare size={20} />, label: 'Maintenance' },
    { to: '/complaints', icon: <AlertTriangle size={20} />, label: 'Complaints' },
    { to: '/notifications', icon: <Bell size={20} />, label: 'Notifications' },
  ];

  const memberLinks = [
    { to: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/maintenance', icon: <FileText size={20} />, label: 'Maintenance Bills' },
    { to: '/complaints', icon: <AlertTriangle size={20} />, label: 'My Complaints' },
    { to: '/notifications', icon: <Bell size={20} />, label: 'Notifications' },
  ];

  const links = user?.role === 'admin' ? adminLinks : memberLinks;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Society Sync</h2>
      </div>
      
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            end={link.to === '/'}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-link logout-btn" onClick={logout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
