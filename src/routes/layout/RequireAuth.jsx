import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import './layout.scss';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const RequireAuth = () => {
  const { curentUser } = useContext(AuthContext);

  return !curentUser ? (
    <Navigate to='/login' />
  ) : (
    <div className='layout'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='content'>
        <Outlet />
      </div>
    </div>
  );
};

export default RequireAuth;
