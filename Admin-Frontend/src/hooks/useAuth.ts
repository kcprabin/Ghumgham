import { useState, useCallback, useMemo } from 'react';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem('authToken')
  );

  const user = useMemo(() => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }, []);

  const login = useCallback((email: string, password: string) => {
    // This is called after the token is already stored in LoginPage
    // Just ensure the logged in state is set
    if (localStorage.getItem('authToken')) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }, []);

  return { isLoggedIn, user, login, logout };
};
