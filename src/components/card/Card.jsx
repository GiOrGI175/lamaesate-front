import { Link } from 'react-router-dom';
import './card.scss';

const Card = ({ item }) => {
  return (
    <div className='card'>
      <Link to={`/${item.id}`} className='imageContianer'>
        <img src={item.img} alt='rooms foto' />
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
            <div className='icon'>
              <img src='/save.png' alt='save' />
            </div>
            <div className='icon'>
              <img src='/chat.png' alt='save' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
