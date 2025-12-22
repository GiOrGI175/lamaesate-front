import apiRequest from './apiRequest';
import { getStoredToken } from '../lib/tokenStore';

export const singlePageLoader = async ({ params }) => {
  try {
    const res = await apiRequest.get('/posts/' + params.id);
    return res.data; // დაბრუნდება post object
  } catch (error) {
    console.error('Single page loader error:', error);
    throw error;
  }
};

export const listPageLoader = async ({ request }) => {
  const query = request.url.split('?')[1] || '';

  try {
    const res = await apiRequest.get('/posts?' + query);
    // დაბრუნდება Promise რომელიც resolve-დება axios response-ით
    return { postResponse: res }; // არა res.data!
  } catch (error) {
    console.error('List page loader error:', error);
    return { postResponse: { data: [] } };
  }
};

export const PostsLoader = async ({ request }) => {
  const query = request.url.split('?')[1] || '';

  try {
    const res = await apiRequest.get('/posts?' + query);
    // HomePage-ისთვის უშუალოდ data-ს დააბრუნებს
    return { postResponse: res.data };
  } catch (error) {
    console.error('Posts loader error:', error);
    return { postResponse: [] };
  }
};

export const profilePageLoader = async () => {
  const token = getStoredToken();

  if (!token) {
    return {
      postResponse: { data: { userPosts: [], savedPosts: [] } },
      chatResponse: { data: [] },
    };
  }

  try {
    // აბრუნებს Promise-ებს, არა resolved data-ს
    const postPromise = apiRequest.get('/users/profilePosts');
    const chatPromise = apiRequest.get('/chats');

    return {
      postResponse: postPromise, // Promise
      chatResponse: chatPromise, // Promise
    };
  } catch (error) {
    console.error('Profile loader error:', error);

    if (error.response?.status === 401) {
      localStorage.removeItem('auth-token');
      window.location.href = '/login';
    }

    return {
      postResponse: { data: { userPosts: [], savedPosts: [] } },
      chatResponse: { data: [] },
    };
  }
};
