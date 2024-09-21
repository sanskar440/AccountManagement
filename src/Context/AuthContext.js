import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = (userData) => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = (username, password) => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (loggedInUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
