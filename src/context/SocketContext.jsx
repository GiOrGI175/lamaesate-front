import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { curentUser } = useContext(AuthContext);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io('https://lamaesate-back.onrender.com'));
  }, []);

  useEffect(() => {
    curentUser && socket?.emit('newUser', curentUser.id);
  }, [curentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
