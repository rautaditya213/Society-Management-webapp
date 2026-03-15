import React from 'react';
import { useData } from '../context/DataContext';
import { Card } from '../components/UI';
import { Home, AlertTriangle, FileText, CheckCircle } from 'lucide-react';

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

const AdminDashboard = () => {
    const { flats, maintenance, complaints } = useData();
    
    const occupiedFlats = flats.filter(f => f.status === 'Occupied').length;
    const pendingMaintenance = maintenance.filter(m => m.status === 'Pending').length;
    const openComplaints = complaints.filter(c => c.status === 'Open').length;
    const totalMaintenanceCollected = maintenance
        .filter(m => m.status === 'Paid')
        .reduce((sum, current) => sum + current.amount, 0);

    return (
        <div className="dashboard-page">
            <h1 className="page-title">Admin Dashboard</h1>
            
            <div className="stats-grid">
                <StatCard 
                    title="Occupied Flats" 
                    value={`${occupiedFlats} / ${flats.length}`} 
                    icon={Home} 
                    colorClass="text-blue" 
                />
                <StatCard 
                    title="Pending Payments" 
                    value={pendingMaintenance} 
                    icon={FileText} 
                    colorClass="text-orange" 
                />
                <StatCard 
                    title="Total Collected" 
                    value={`₹${totalMaintenanceCollected}`} 
                    icon={CheckCircle} 
                    colorClass="text-green" 
                />
                <StatCard 
                    title="Open Complaints" 
                    value={openComplaints} 
                    icon={AlertTriangle} 
                    colorClass="text-red" 
                />
            </div>

            <div className="dashboard-sections">
                <Card className="dashboard-section recent-activity">
                    <h2>Recent Complaints</h2>
                    {complaints.slice(-3).reverse().map(c => (
                        <div key={c.id} className="activity-item">
                            <div className="activity-details">
                                <span className="activity-title">{c.title} ({c.flatNumber})</span>
                                <span className="activity-date">{c.date}</span>
                            </div>
                            <span className={`badge badge-${c.status.toLowerCase()}`}>{c.status}</span>
                        </div>
                    ))}
                    {complaints.length === 0 && <p className="text-gray">No complaints recorded yet.</p>}
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;
