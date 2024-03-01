
import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true); 

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = () => !!user;


  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
  };
};

