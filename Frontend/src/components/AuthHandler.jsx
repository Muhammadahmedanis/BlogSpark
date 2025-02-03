import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const AuthHandler = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      // Update localStorage when user changes
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      // Clear user from localStorage when logged out
      localStorage.removeItem("user");
    }

    if (token) {
      // Update localStorage when token changes
      localStorage.setItem("token", token);
    } else {
      // Clear token from localStorage when logged out
      localStorage.removeItem("token");
    }
  }, [user, token]); // Dependency array to monitor changes

  // Render children components
  return <>{children}</>;
};