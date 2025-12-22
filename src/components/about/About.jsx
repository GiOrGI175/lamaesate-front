import './about.scss';

import { FaDesktop, FaArrowsAltV } from 'react-icons/fa';

import {
  FaEnvelope,
  FaInbox,
  FaList,
  FaMap,
  FaMapMarkedAlt,
  FaUser,
} from 'react-icons/fa';

const About = () => {
  return (
    <section className='AboutSection'>
      <div className='Container1'>
        <div className='ImgContainer'>
          <div className='imgBox'>
            <img src='/home1.jpg' alt='' />
            <span>San Francisco</span>
          </div>
        </div>
        <div className='textContainer'>
          <h2>Empowering You to Find Your Dream Home, Effortessly</h2>
          <p className='subTitle'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            maiores saepe qui non sint optio, officia quas. Optio iure
            laudantium assumenda eligendi asperiores excepturi blanditiis, velit
            voluptatem nemo delectus? Aperiam!
          </p>
          <div className='minTextContainer'>
            <div className='miniTextContainer'>
              <FaDesktop />
              <p>Virtual property tours and viewings</p>
            </div>
            <div className='miniTextContainer'>
              <FaArrowsAltV />
              <p>Real-time market price updates</p>
            </div>
            <div className='miniTextContainer'>
              <FaMap />
              <p>interactive floor plans and maps</p>
            </div>
            <div className='miniTextContainer'>
              <FaMapMarkedAlt />
              <p>Accesss to off-market properties</p>
            </div>
            <div className='miniTextContainer'>
              <FaEnvelope />
              <p>Direct messageing with agenst and owners</p>
            </div>
          </div>
        </div>
      </div>

      <div className='Container2'>
        <div className='textContainer'>
          <h2>Simplilifying Your Real Estate Journey Every Step of the Way</h2>
          <p className='subTitle'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
            maiores saepe qui non sint optio, officia quas. Optio iure
            laudantium assumenda eligendi asperiores excepturi blanditiis, velit
            voluptatem nemo delectus? Aperiam!
          </p>
          <div className='minTextContainer'>
            <div className='miniTextContainer'>
              <FaDesktop />
              <p>Virtual property tours and viewings</p>
            </div>
            <div className='miniTextContainer'>
              <FaArrowsAltV />
              <p>Real-time market price updates</p>
            </div>
            <div className='miniTextContainer'>
              <FaMap />
              <p>interactive floor plans and maps</p>
            </div>
            <div className='miniTextContainer'>
              <FaMapMarkedAlt />
              <p>Accesss to off-market properties</p>
            </div>
            <div className='miniTextContainer'>
              <FaEnvelope />
              <p>Direct messageing with agenst and owners</p>
            </div>
          </div>
        </div>
        <div className='ImgContainer'>
          <div className='imgBox'>
            <img src='/home2.jpg' alt='' />
            <span>San Francisco</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
