import usersData from '../data/users.json';
import flatsData from '../data/flats.json';
import maintenanceData from '../data/maintenance.json';
import complaintsData from '../data/complaints.json';
import notificationsData from '../data/notifications.json';

// Initialize localStorage with dummy data if empty
export const initializeData = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(usersData));
  }
  if (!localStorage.getItem('flats')) {
    localStorage.setItem('flats', JSON.stringify(flatsData));
  }
  if (!localStorage.getItem('maintenance')) {
    localStorage.setItem('maintenance', JSON.stringify(maintenanceData));
  }
  if (!localStorage.getItem('complaints')) {
    localStorage.setItem('complaints', JSON.stringify(complaintsData));
  }
  if (!localStorage.getItem('notifications')) {
    localStorage.setItem('notifications', JSON.stringify(notificationsData));
  }
};

// Generic Getter and Setter methods
export const getData = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// --- Users ---
export const getUsers = () => getData('users');
export const getUserByUsername = (username) => {
  const users = getUsers();
  // Member uses flatNumber, Admin uses username (both are mapped to the 'username' field in json for login)
  return users.find((u) => u.username === username || u.flatNumber === username);
};

// --- Flats ---
export const getFlats = () => getData('flats');
export const getFlatByNumber = (flatNumber) => getFlats().find(f => f.number === flatNumber);

// --- Maintenance ---
export const getMaintenanceBills = () => getData('maintenance');
export const getMaintenanceBillsByFlat = (flatNumber) => {
  return getMaintenanceBills().filter(b => b.flatNumber === flatNumber);
};

// --- Complaints ---
export const getComplaints = () => getData('complaints');
export const getComplaintsByFlat = (flatNumber) => {
  return getComplaints().filter(c => c.flatNumber === flatNumber);
};

// --- Notifications ---
export const getNotifications = () => getData('notifications');
