import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Card } from '../components/UI';
import { FileText, AlertTriangle, Bell } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass }) => (
  <Card className="stat-card">
    <div className="stat-content">
      <div className="stat-text">
        <h3>{title}</h3>
        <p className="stat-value">{value}</p>
      </div>
      <div className={`stat-icon ${colorClass}`}>
        <Icon size={24} />
      </div>
    </div>
  </Card>
);

const MemberDashboard = () => {
    const { user } = useAuth();
    const { maintenance, complaints, notifications } = useData();
    
    // Filter data for current member's flat
    const myMaintenance = maintenance.filter(m => m.flatNumber === user.flatNumber);
    const myComplaints = complaints.filter(c => c.flatNumber === user.flatNumber);

    const pendingBillsCount = myMaintenance.filter(m => m.status === 'Pending').length;
    const openComplaintsCount = myComplaints.filter(c => c.status === 'Open').length;
    const recentNotifCount = notifications.slice(-3).length; // Just show a number for recent

    return (
        <div className="dashboard-page">
            <h1 className="page-title">Welcome, {user.name} (Flat: {user.flatNumber})</h1>
            
            <div className="stats-grid">
                <StatCard 
                    title="Pending Bills" 
                    value={pendingBillsCount} 
                    icon={FileText} 
                    colorClass="text-orange" 
                />
                <StatCard 
                    title="Open Complaints" 
                    value={openComplaintsCount} 
                    icon={AlertTriangle} 
                    colorClass="text-red" 
                />
                <StatCard 
                    title="Recent Notices" 
                    value={recentNotifCount} 
                    icon={Bell} 
                    colorClass="text-blue" 
                />
            </div>

            <div className="dashboard-sections">
                <Card className="dashboard-section recent-activity">
                    <div className="flex-between">
                         <h2>Latest Notifications</h2>
                    </div>
                    {notifications.slice(-3).reverse().map(n => (
                        <div key={n.id} className="activity-item" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '0.5rem' }}>
                            <div className="activity-details">
                                <span className="activity-title text-md">{n.title}</span>
                                <span className="activity-date text-sm text-gray">{n.date}</span>
                                <p className="text-gray text-sm mt-2">{n.message}</p>
                            </div>
                        </div>
                    ))}
                    {notifications.length === 0 && <p className="text-gray">No new notifications.</p>}
                </Card>
            </div>
        </div>
    );
};

export default MemberDashboard;
