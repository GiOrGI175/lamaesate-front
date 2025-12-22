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
import NewPostPage from './routes/newPostPage/NewPostPage';
import {
  listPageLoader,
  PostsLoader,
  profilePageLoader,
  singlePageLoader,
} from './utils/loader';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  listPageLoader,
  PostsLoader,
  profilePageLoader,
  singlePageLoader,
} from './utils/loader';

const ErrorBoundary = () => {
  return <div>Something went wrong. Please try again.</div>;
};

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <HomePage />,
          loader: PostsLoader,
          errorElement: <ErrorBoundary />,
        },
        {
          path: 'list',
          element: <ListPage />,
          loader: listPageLoader,
          errorElement: <ErrorBoundary />,
        },
        {
          path: ':id',
          element: <SinglePage />,
          loader: singlePageLoader,
          errorElement: <ErrorBoundary />,
        },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
      ],
    },
    {
      element: <RequireAuth />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: '/profile',
          element: <ProfilePage />,
          loader: profilePageLoader,
          errorElement: <ErrorBoundary />,
        },
        { path: '/profile/update', element: <ProfileUpdatePage /> },
        { path: '/add', element: <NewPostPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
