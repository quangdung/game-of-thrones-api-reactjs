import React, { createContext, useState, useEffect, FC, useMemo } from 'react';

import { User, AuthContextType } from '../global/interfaces';

interface PropsType {
  children: JSX.Element
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: FC<PropsType> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  // Harcoded valid user
  const handleLogin = (username: string, password: string) => {
    const validUser: User = {
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

  const authContextValue = useMemo(() => ({ user, handleLogin, handleLogout }), [user]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

