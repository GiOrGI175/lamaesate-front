import apiRequest from './apiRequest';
import { getStoredToken } from '../lib/tokenStore';

export const singlePageLoader = async ({ params }) => {
  const res = await apiRequest.get('/posts/' + params.id);
  return res.data;
};

export const listPageLoader = async ({ request }) => {
  const query = request.url.split('?')[1] || '';
  const postResponse = await apiRequest.get('/posts?' + query);
  return { postResponse };
};

export const PostsLoader = async ({ request }) => {
  const query = request.url.split('?')[1] || '';

  try {
    const postResponse = await apiRequest.get('/posts?' + query);
    return { postResponse };
  } catch (error) {
    console.error('Posts loader error:', error);
    return { postResponse: { data: [] } };
  }
};

export const profilePageLoader = async () => {
  const token = getStoredToken(); // <-- შეიცვალა

  if (!token) {
    return {
      postResponse: { data: { userPosts: [], savedPosts: [] } },
      chatResponse: { data: [] },
    };
  }

  try {
    const [postResult, chatResult] = await Promise.all([
      apiRequest.get('/users/profilePosts'),
      apiRequest.get('/chats'),
    ]);

    return {
      postResponse: postResult,
      chatResponse: chatResult,
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
