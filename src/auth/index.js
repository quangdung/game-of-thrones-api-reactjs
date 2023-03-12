import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  // Harcoded valid user
  const handleLogin = (username, password) => {
    const validUser = {
      username: 'user',
      password: 'password',
    };

    if (username === validUser.username && password === validUser.password) {
      setUser(validUser);
      localStorage.setItem('user', JSON.stringify(validUser));
    }
    else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
