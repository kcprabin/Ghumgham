import { useState, useCallback } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem('isLoggedIn') === 'true'
  );

  const login = useCallback((email: string, password: string) => {
    // Placeholder login logic
    if (email && password) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  }, []);

  return { isLoggedIn, login, logout };
};
