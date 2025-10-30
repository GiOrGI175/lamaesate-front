// import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
// import Chat from '../../components/chat/Chat';
// import List from '../../components/list/List';
// import apiRequest from '../../utils/apiRequest';
// import './profilePage.scss';
// import { Suspense, useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';
// import Loader from '../../components/loader/Loader';
// import { motion } from 'framer-motion';

// const ProfilePage = () => {
//   const { postResponse, chatResponse } = useLoaderData();

//   console.log(postResponse.data, 'postResponse');
//   console.log(chatResponse.data, 'chatResponse');

//   const { curentUser, updateUser } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await apiRequest.post('/auth/logout');
//       updateUser(null);
//       navigate('/');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   };

//   return (
//     <div className='profilePage'>
//       <div className='details'>
//         <motion.div
//           initial={{ opacity: 0, y: -100 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.5, type: 'spring', stiffness: 120 }}
//           className='wrapper'
//         >
//           <div className='title'>
//             <h1>User Information</h1>
//             <Link to='/profile/update'>
//               <button>Update Profile</button>
//             </Link>
//           </div>

//           <div className='info'>
//             <span>
//               Avatar:
//               <img
//                 src={curentUser.avatar || '/noavatar.webp'}
//                 alt='user icon'
//               />
//             </span>
//             <span>
//               Username: <b>{curentUser.username}</b>
//             </span>
//             <span>
//               Email: <b>{curentUser.email}</b>
//             </span>
//             <button onClick={handleLogout}>Logout</button>
//           </div>

//           <div className='title'>
//             <h1>My List</h1>
//             <Link to='/add'>
//               <button>Create New Post</button>
//             </Link>
//           </div>

//           <Suspense fallback={<Loader />}>
//             <Await
//               resolve={postResponse}
//               errorElement={<p>Error loading posts!</p>}
//             >
//               {(resolved) => {
//                 const data = resolved?.data ?? resolved;
//                 console.log('Posts data:', data);

//                 return <List posts={data?.userPosts || []} />;
//               }}
//             </Await>
//           </Suspense>

//           <div className='title'>
//             <h1>Saved List</h1>
//           </div>

//           <Suspense fallback={<Loader />}>
//             <Await
//               resolve={postResponse}
//               errorElement={<p>Error loading saved posts!</p>}
//             >
//               {(resolved) => {
//                 const data = resolved?.data ?? resolved;

//                 return <List posts={data?.savedPosts || []} />;
//               }}
//             </Await>
//           </Suspense>
//         </motion.div>
//       </div>

//       <div className='chatContainer'>
//         <div className='wrapper'>
//           <Suspense fallback={<Loader />}>
//             <Await
//               resolve={chatResponse}
//               errorElement={<p>Error loading chats!</p>}
//             >
//               {(resolved) => {
//                 const data = resolved?.data ?? resolved;
//                 console.log('Chat data:', data);

//                 return <Chat chats={data || []} />;
//               }}
//             </Await>
//           </Suspense>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

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
  const data = useLoaderData();
  const { curentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post('/auth/logout');
      updateUser(null);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className='profilePage'>
      {/* ✅ ერთი დიდი Suspense მთელი გვერდისთვის */}
      <Suspense fallback={<Loader />}>
        <Await
          resolve={Promise.all([data.postResponse, data.chatResponse])}
          errorElement={<p>Error loading profile data!</p>}
        >
          {([postResolved, chatResolved]) => {
            const postData = postResolved?.data ?? postResolved;
            const chatData = chatResolved?.data ?? chatResolved;

            console.log('Posts data:', postData);
            console.log('Chat data:', chatData);

            return (
              <>
                <div className='details'>
                  <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 1.5,
                      type: 'spring',
                      stiffness: 120,
                    }}
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

                    <List posts={postData?.userPosts || []} />

                    <div className='title'>
                      <h1>Saved List</h1>
                    </div>

                    <List posts={postData?.savedPosts || []} />
                  </motion.div>
                </div>

                <div className='chatContainer'>
                  <div className='wrapper'>
                    <Chat chats={chatData || []} />
                  </div>
                </div>
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};

export default ProfilePage;
