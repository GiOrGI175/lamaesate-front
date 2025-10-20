import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [curentUser, setCurentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  );

  const updateUser = (data) => {
    setCurentUser(data);
  };

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(curentUser));
  }, [curentUser]);

  return (
    <AuthContext.Provider value={{ curentUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
