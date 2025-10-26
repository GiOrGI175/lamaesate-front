import { useContext, useEffect, useState } from 'react';
import './chat.scss';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../utils/apiRequest';
import { format } from 'timeago.js';

const Chat = ({ chats }) => {
  const [chat, setChat] = useState(null);

  const { curentUser } = useContext(AuthContext);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest('/chats/' + id);
      console.log(res.data, 'res.data');

      setChat({ ...res.data, receiver });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(chat, 'setChat');
  }, [chat, setChat]);

  return (
    <div className='chat'>
      <div className='messages'>
        <h1>Messages</h1>
        {chats?.map((item) => (
          <div
            className='message'
            key={item.id}
            style={{
              backgroundColor: item.seenBy.includes(curentUser.id)
                ? 'white'
                : '#fecd514e',
            }}
            onClick={() => handleOpenChat(item.id, item.receiver)}
          >
            <img
              src={item.receiver.avatar || '/noavatar.webp'}
              alt='User Icon'
            />
            <span>{item.receiver.username}</span>
            <p>{item.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className='chatBox'>
          <div className='top'>
            <div className='user'>
              <img
                src={chat.receiver.avatar || '/noavatar.webp'}
                alt='user icon'
              />
              {chat?.receiver?.username}
            </div>
            <span className='close' onClick={() => setChat(false)}>
              X
            </span>
          </div>
          <div className='center'>
            {chat?.messages.map((item) => {
              console.log(item, 'item');
              return (
                <div
                  className='chatMessage'
                  key={item.id}
                  style={{
                    alignSelf:
                      item.userId === curentUser.id ? 'flex-end' : 'flex-start',
                    textAlign: item.userId === curentUser.id ? 'right' : 'left',
                  }}
                >
                  <p>{item.text}</p>
                  <span>{format(item.createdAt)}</span>
                </div>
              );
            })}

            {/* <div className='chatMessage own'>
              <p>Lorem ipsum dolor sit amet consectetur</p>
              <span>1 hour ago</span>
            </div> */}
          </div>
          <div className='bottom'>
            <textarea></textarea>
            <button>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
