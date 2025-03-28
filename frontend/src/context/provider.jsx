import {  useState,useCallback } from "react";
import { AuthContext } from "./context";


// Authentication Provider Component

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Method to set user details with extensive logging
  const setUserDetails = useCallback((userData) => {
    console.log('SetUserDetails called with:', userData);
    try {
      setUser(userData);
      setIsAuthenticated(true);
      console.log('User details set successfully');
    } catch (error) {
      console.error('Error in setUserDetails:', error);
      throw error;
    }
  }, []);



  // Logout function
  const logout = useCallback(() => {
    console.log('Logout called');
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('jwt');
  }, []);

  // Authentication state
  const authState = {
    isAuthenticated,
    user,
    logout,
    setUserDetails
  };

  console.log('AuthProvider rendering with state:', authState);

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  );
}


