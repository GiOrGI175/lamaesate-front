import { div, path } from 'motion/react-client';
import Navbar from './components/navbar/Navbar';
import { HomePage } from './routes/home/HomePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ListPage from './routes/listPage/ListPage';
import Layout from './routes/layout/Layout';
import SinglePage from './routes/singlePage/SinglePage';
import ProfilePage from './routes/profilePage/ProfilePage';
import Login from './routes/login/Login';
import Register from './routes/register/Register';
import RequireAuth from './routes/layout/RequireAuth';
import ProfileUpdatePage from './routes/profileUpdatePage/ProfileUpdatePage';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/list',
          element: <ListPage />,
        },
        {
          path: '/:id',
          element: <SinglePage />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
      ],
    },
    {
      path: '/',
      element: <RequireAuth />,
      children: [
        {
          path: '/profile',
          element: <ProfilePage />,
        },
        {
          path: '/profile/update',
          element: <ProfileUpdatePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
