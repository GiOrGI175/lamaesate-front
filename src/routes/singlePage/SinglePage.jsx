import Slider from '../../components/slider/Slider';
import { singlePostData, userData } from '../../lib/dummydata';
import './singlePage.scss';
import Map from '../../components/map/Map';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../utils/apiRequest';

const SinglePage = () => {
  const post = useLoaderData();
  console.log(post);
  const [saved, setSaved] = useState(post.isSaved);
  const { curentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(curentUser, 'currentUser');

  const handleSave = async () => {
    if (!curentUser) {
      navigate('/login');
    }
    setSaved((prev) => !prev);
    try {
      await apiRequest.post('/users/save', { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className='singlePage'>
      <div className='details'>
        <div className='wrapper'>
          <Slider images={post.images} />
          <div className='info'>
            <div className='top'>
              <div className='post'>
                <h1>{post.title}</h1>
                <div className='address'>
                  <img src='/pin.png' alt='' />
                  <span>{post.address}</span>
                </div>
                <div className='price'>$ {post.price}</div>
              </div>
              <div className='user'>
                <img src={post.user.avatar} alt='user' />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div className='bottom'>{post.postDetails.desc}</div>
          </div>
        </div>
      </div>
      <div className='features'>
        <div className='wrapper'>
          <p className='title'>General</p>
          <div className='listVertical'>
            <div className='feature'>
              <img src='/utility.png' alt='utility' />
              <div className='featureText'>
                <span>Utilities</span>
                <p>{post.postDetails.utilities}</p>
              </div>
            </div>
            <div className='feature'>
              <img src='/pet.png' alt='pet' />
              <div className='featureText'>
                <span>Pet Policy</span>
                <p>{post.postDetails.income}</p>
              </div>
            </div>
            <div className='feature'>
              <img src='/fee.png' alt='fee' />
              <div className='featureText'>
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <p className='title'>Sizes</p>
          <div className='sizes'>
            <div className='size'>
              <img src='/size.png' alt='size' />
              <span>{post.postDetails.size} sqft</span>
            </div>
            <div className='size'>
              <img src='/bed.png' alt='bed' />
              <span>{post.bedroom} beds</span>
            </div>
            <div className='size'>
              <img src='/bath.png' alt='bath' />
              <span>{post.bathroom} bathrooms</span>
            </div>
          </div>
          <p className='title'>Nearby Places</p>
          <div className='listHorizontal'>
            <div className='feature'>
              <img src='/school.png' alt='school icon' />
              <div className='featureText'>
                <span>School</span>
                <p>{post.postDetails.school}m away</p>
              </div>
            </div>
            <div className='feature'>
              <img src='/pet.png' alt='pet icon' />
              <div className='featureText'>
                <span>Bus Stop</span>
                <p>{post.postDetails.bus}m away</p>
              </div>
            </div>
            <div className='feature'>
              <img src='/fee.png' alt='fee icon' />
              <div className='featureText'>
                <span>Restaurant</span>
                <p>{post.postDetails.Restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className='title'>Location</p>
          <div className='mapContainer'>
            <Map items={[post]} />
          </div>
          <div className='buttons'>
            <button>
              <img src='/chat.png' alt='chat icon' />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? '#fece51' : 'white',
              }}
            >
              <img src='/save.png' alt='save icon' />
              {saved ? 'Place saved' : 'Save the Place'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
