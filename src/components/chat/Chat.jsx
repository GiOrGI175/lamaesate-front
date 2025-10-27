import { useContext, useEffect, useRef, useState } from 'react';
import './chat.scss';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../utils/apiRequest';
import { format } from 'timeago.js';
import { SocketContext } from '../../context/SocketContext';
import { useNotifactionSore } from '../../lib/notificationSore';

const Chat = ({ chats }) => {
  const [chat, setChat] = useState(null);

  const { curentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const messageEndRef = useRef();

  const decrease = useNotifactionSore((state) => state.decrease);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest('/chats/' + id);
      console.log(res.data, 'res.data');

      if (res.data.seenBy.includes(curentUser.id)) {
        decrease();
      }

      setChat({ ...res.data, receiver });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get('text');

    if (!text) return;
    try {
      const res = await apiRequest.post('/messages/' + chat.id, { text });

      setChat((pv) => ({ ...pv, messages: [...pv.messages, res.data] }));

      e.target.reset();

      socket.emit('sendMessage', {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!chat || !socket) return;

    const read = async () => {
      try {
        await apiRequest.put('/chats/read/' + chat.id);
      } catch (err) {
        console.log(err);
      }
    };

    const handleGetMessage = (data) => {
      console.log('Received message:', data);

      if (chat.id === data.chatId) {
        setChat((prev) => ({
          ...prev,
          messages: [...prev.messages, data],
        }));
        read();
      }
    };

    socket.on('getMessage', handleGetMessage);

    return () => {
      socket.off('getMessage', handleGetMessage);
    };
  }, [socket, chat]);

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
            <span className='close' onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className='center'>
            {chat?.messages.map((item) => {
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
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className='bottom'>
            <textarea name='text'></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
