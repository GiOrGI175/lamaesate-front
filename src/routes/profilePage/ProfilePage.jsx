import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import Chat from '../../components/chat/Chat';
import List from '../../components/list/List';
import apiRequest from '../../utils/apiRequest';
import './profilePage.scss';
import { Suspense, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../components/loader/Loader';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { postResponse, chatResponse } = useLoaderData();

  console.log(postResponse, 'postResponse');

  const { curentUser, updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post('/auth/logout');
      updateUser(null);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='profilePage'>
      <div className='details'>
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, type: 'spring', stiffness: 120 }}
          className='wrapper'
        >
          <div className='title'>
            <h1>User Information</h1>
            <Link to='/profile/update'>
              <button>Update Profile</button>
            </Link>
          </div>
          <div className='info'>
            <span>
              Avatar:
              <img
                src={curentUser.avatar || '/noavatar.webp'}
                alt='user icon'
              />
            </span>
            <span>
              Username: <b>{curentUser.username}</b>
            </span>
            <span>
              Email: <b>{curentUser.email}</b>
            </span>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className='title'>
            <h1>My List</h1>
            <Link to='/add'>
              <button>Create New Post</button>
            </Link>
          </div>
          <Suspense fallback={<Loader />}>
            <Await
              resolve={postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(resolved) => {
                const data = resolved?.data ?? resolved;

                return <List posts={data.userPosts} />;
              }}
            </Await>
          </Suspense>
          <div className='title'>
            <h1>Saved List</h1>
          </div>
          <Suspense fallback={<Loader />}>
            <Await
              resolve={postResponse}
              errorElement={<p>Error loading posts!</p>}
            >
              {(resolved) => {
                const data = resolved?.data ?? resolved;

                return <List posts={data.savedPosts} />;
              }}
            </Await>
          </Suspense>
        </motion.div>
      </div>
      <div className='chatContainer'>
        <div className='wrapper'>
          <Suspense fallback={<Loader />}>
            <Await
              resolve={chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(resolved) => {
                const data = resolved?.data ?? resolved;
                console.log(data, 'data');

                return <Chat chats={data} />;
              }}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
