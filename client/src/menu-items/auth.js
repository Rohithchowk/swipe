// AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Function to check if the user is admin
    const checkIsAdmin = () => {
      // Get the user role from localStorage
      const role = localStorage.getItem('role');
      console.log('User role:', role);

      // Update the user role state
      setUserRole(role);
    };

    // Call the function initially
    checkIsAdmin();

    // Subscribe to changes in localStorage
    window.addEventListener('storage', checkIsAdmin);

    // Cleanup function to unsubscribe from changes
    return () => {
      window.removeEventListener('storage', checkIsAdmin);
    };
  }, []); // Run only on component mount and unmount

  return <AuthContext.Provider value={{ userRole }}>{children}</AuthContext.Provider>;
};

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);
