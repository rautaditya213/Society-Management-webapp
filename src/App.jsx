import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminFlats from './pages/AdminFlats';
import AdminMaintenance from './pages/AdminMaintenance';
import AdminComplaints from './pages/AdminComplaints';
import AdminNotifications from './pages/AdminNotifications';

import MemberDashboard from './pages/MemberDashboard';
import MemberMaintenance from './pages/MemberMaintenance';
import MemberComplaints from './pages/MemberComplaints';
import MemberNotifications from './pages/MemberNotifications';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                {/* Admin Specific Routes */}
                <Route path="flats" element={
                    <ProtectedRoute allowedRoles={['admin']}><AdminFlats /></ProtectedRoute>
                } />

                {/* Shared Role Routes (Component selected by user role) */}
                <Route path="maintenance" element={
                    <ProtectedRoute>
                        <RoleBasedRoute adminComponent={<AdminMaintenance />} memberComponent={<MemberMaintenance />} />
                    </ProtectedRoute>
                } />
                <Route path="complaints" element={
                    <ProtectedRoute>
                        <RoleBasedRoute adminComponent={<AdminComplaints />} memberComponent={<MemberComplaints />} />
                    </ProtectedRoute>
                } />
                <Route path="notifications" element={
                    <ProtectedRoute>
                        <RoleBasedRoute adminComponent={<AdminNotifications />} memberComponent={<MemberNotifications />} />
                    </ProtectedRoute>
                } />
                
                {/* Index Route Redirect */}
                <Route index element={<IndexRedirect />} />
            </Route>
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

// Component to dynamically redirect the root path based on role
import { useAuth } from './context/AuthContext';

const RoleBasedRoute = ({ adminComponent, memberComponent }) => {
    const { user } = useAuth();
    if (user?.role === 'admin') return adminComponent;
    return memberComponent;
};

const IndexRedirect = () => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/login" replace />;
    
    // We already use the same URL paths in the Sidebar based on roles to make it seamless
    // Map generic paths to specific components
    if (user.role === 'admin') {
        return <AdminDashboard />;
    } else {
        return <MemberDashboard />;
    }
}

export default App;
