import apiRequest from './apiRequest';

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest('/posts/' + params.id);

  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split('?')[1];

  const postPromise = apiRequest('/posts?' + query);

  return { postResponse: postPromise };
};

export const PostsLoader = async ({ request, params }) => {
  const query = request.url.split('?')[1];

  const postPromise = apiRequest('/posts?' + query);

  return { postResponse: postPromise };
};

export const profilePageLoader = async () => {
  const token = useTokenStore.getState().token;

  if (!token) {
    return {
      postResponse: { data: { userPosts: [], savedPosts: [] } },
      chatResponse: { data: [] },
    };
  }

  try {
    const [postResult, chatResult] = await Promise.all([
      apiRequest('/users/profilePosts'),
      apiRequest('/chats'),
    ]);

    return {
      postResponse: postResult,
      chatResponse: chatResult,
    };
  } catch (error) {
    console.error('LOADER ERROR:', error);

    if (error.response?.status === 401) {
      useTokenStore.getState().clearToken();
    }

    throw error;
  }
};
