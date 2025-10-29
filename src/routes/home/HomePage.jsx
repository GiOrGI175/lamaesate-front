import { useContext } from 'react';
import SearchBar from '../../components/searchBar/SearchBar';
import './homePage.scss';
import { AuthContext } from '../../context/AuthContext';
import BlurIn from '../../components/blur/BlurIn';
import StaggeredFade from '../../components/StaggeredFade/StaggeredFade';
import { motion } from 'framer-motion';

export const HomePage = () => {
  const { curentUser } = useContext(AuthContext);

  console.log(curentUser);

  const imageVariants = {
    hidden: {
      scale: 0.8,
    },
    visible: {
      scale: 1,
      transition: {
        duration: 1.5,
        repeat: 2,
        repeatType: 'reverse',
        type: 'spring',
        stiffness: 120,
        damping: 12,
      },
    },
  };

  const boxVariants = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        type: 'spring',
        stiffness: 120,
      },
    },
  };

  return (
    <div className='homePage'>
      <div className='textContainer'>
        <div className='wrapper'>
          <BlurIn title='Find Real Estate & Get your Dream Place' />
          <StaggeredFade
            text='Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            explicabo suscipit cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!'
          />
          <SearchBar />
          <motion.div
            variants={boxVariants}
            initial='hidden'
            animate='visible'
            className='boxes'
          >
            <div className='box'>
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className='box'>
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className='box'>
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </motion.div>
        </div>
      </div>
      <div className='imgContainer'>
        <motion.img
          src='/bg.png'
          alt='bg-img'
          variants={imageVariants}
          initial='hidden'
          animate='visible'
        />
      </div>
    </div>
  );
};
