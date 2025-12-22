import { Link, useNavigate } from 'react-router-dom';
import './card.scss';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../utils/apiRequest';

const Card = ({ item }) => {
  const [saved, setSaved] = useState(!!item.isSaved);
  const { curentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setSaved(!!item.isSaved);
  }, [item.isSaved]);

  const handleSave = async () => {
    if (!curentUser) return navigate('/login');

    setSaved((prev) => !prev);
    try {
      await apiRequest.post('/users/save', { postId: item.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  const handleMessage = async () => {
    if (!curentUser) return navigate('/login');

    try {
      await apiRequest.post('/chats', { receiverId: item.userId });
      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='card'>
      <Link to={`/${item.id}`} className='imageContianer'>
        <img src={item.images[0]} alt='rooms foto' />
      </Link>
      <div className='textContainer'>
        <h2 className='title'>
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className='address'>
          <img src='/pin.png' alt='pin icon' />
          <span>{item.address}</span>
        </p>
        <p className='price'>$ {item.price}</p>
        <div className='bottom'>
          <div className='features'>
            <div className='feature'>
              <img src='/bed.png' alt='bed icon' />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className='feature'>
              <img src='/bath.png' alt='bed icon' />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className='icons'>
            <div
              className='icon'
              onClick={handleSave}
              style={{
                backgroundColor: saved ? '#fece51' : 'white',
              }}
            >
              <img src='/save.png' alt='save' />
            </div>
            <div className='icon' onClick={handleMessage}>
              <img src='/chat.png' alt='save' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
