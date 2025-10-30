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

export const profilePageLoader = async () => {
  const postPromise = apiRequest('/users/profilePosts');
  const chatPromise = apiRequest('/chats');

  try {
    const postResult = await postPromise;
    const chatResult = await chatPromise;

    console.log('POST RESULT:', postResult);
    console.log('POST DATA:', postResult.data);
    console.log('CHAT RESULT:', chatResult);
    console.log('CHAT DATA:', chatResult.data);
  } catch (error) {
    console.error('LOADER ERROR:', error);
  }

  return {
    postResponse: postPromise,
    chatResponse: chatPromise,
  };
};
