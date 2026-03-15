import React, { createContext, useState, useEffect, useContext } from 'react';
import * as db from '../utils/localStorage';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  
  const [flats, setFlats] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load data initially
  const loadData = () => {
    setFlats(db.getFlats());
    setMaintenance(db.getMaintenanceBills());
    setComplaints(db.getComplaints());
    setNotifications(db.getNotifications());
  };

  useEffect(() => {
    loadData();
  }, [user]); // Reload if login state changes

  // =====================
  // Admin Operations
  // =====================
  const addMaintenanceBill = (billData) => {
    const newBill = {
      ...billData,
      id: `m${Date.now()}`,
      status: 'Pending'
    };
    const updated = [...maintenance, newBill];
    db.setData('maintenance', updated);
    setMaintenance(updated);
  };

  const resolveComplaint = (id) => {
    const updated = complaints.map(c => 
      c.id === id ? { ...c, status: 'Resolved' } : c
    );
    db.setData('complaints', updated);
    setComplaints(updated);
  };

  const addNotification = (notifData) => {
    const newNotif = {
      ...notifData,
      id: `n${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [...notifications, newNotif];
    db.setData('notifications', updated);
    setNotifications(updated);
  };
  
  const addFlat = (flatData) => {
      const newFlat = {
          ...flatData,
          id: `f${Date.now()}`
      };
      
      const updated = [...flats, newFlat];
      db.setData('flats', updated);
      setFlats(updated);
  }

  // =====================
  // Member Operations
  // =====================
  const payMaintenanceBill = (id) => {
    const updated = maintenance.map(b => 
      b.id === id ? { ...b, status: 'Paid' } : b
    );
    db.setData('maintenance', updated);
    setMaintenance(updated);
  };

  const raiseComplaint = (complaintData) => {
    const newComplaint = {
      ...complaintData,
      id: `c${Date.now()}`,
      flatNumber: user.flatNumber,
      status: 'Open',
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [...complaints, newComplaint];
    db.setData('complaints', updated);
    setComplaints(updated);
  };

  return (
    <DataContext.Provider value={{
      flats,
      maintenance,
      complaints,
      notifications,
      addMaintenanceBill,
      resolveComplaint,
      addNotification,
      payMaintenanceBill,
      raiseComplaint,
      addFlat,
      refreshData: loadData
    }}>
      {children}
    </DataContext.Provider>
  );
};
