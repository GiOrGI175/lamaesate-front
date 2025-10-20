import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import './layout.scss';
const RequireAuth = () => {
  const { curentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!curentUser) {
      <Navigate to='/login' />;
    }
  }, [curentUser]);

  return (
    curentUser && (
      <div className='layout'>
        <div className='navbar'>
          <Navbar />
        </div>
        <div className='content'>
          <Outlet />
        </div>
      </div>
    )
  );
};

export default RequireAuth;
