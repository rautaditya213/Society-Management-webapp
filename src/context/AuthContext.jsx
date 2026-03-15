import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUserByUsername, initializeData } from '../utils/localStorage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize dummy data on first load
    initializeData();

    // Check if user is already logged in
    const loggedInUser = localStorage.getItem('currentUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);

  const login = (username, password) => {
    const foundUser = getUserByUsername(username);
    
    if (foundUser && foundUser.password === password) {
      // Don't store password in local storage state for security simulation
      const { password, ...userWithoutPassword } = foundUser;
      
      setUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
