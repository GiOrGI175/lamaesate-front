import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { HomePage } from '../home/HomePage';
import './layout.scss';
import Footer from '../../components/footer/Footer';

const Layout = () => {
  return (
    <div className='layout'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='content'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
