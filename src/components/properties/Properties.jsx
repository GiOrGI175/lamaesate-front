import './properties.scss';
import { Link } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay } from 'swiper/modules';
import React, { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import Loader from '../loader/Loader';
import SwiperItem from '../swiperItem/SwiperItem';
import ChildLoader from '../loader/ChildLoader';

const Properties = ({ postResponse }) => {
  // if (!postResponse) return null;

  return (
    <section>
      <div>
        <span className='SectionTitle'>Your Future Home Awaits!</span>
        <h2 className='heading'>Find Your Dream Here</h2>
        <div className='settings'>
          <h5 className='info'>
            <span>Showing 1-9</span>
            <span className='showingInfo'> out of 3k properties</span>
          </h5>
          <Link to={'/'}>
            <Settings size={20} />
          </Link>
        </div>

        <Suspense fallback={<ChildLoader />}>
          <Await
            resolve={postResponse}
            errorElement={<p>Error loading posts!</p>}
          >
            {(resolved) => {
              const posts = resolved?.data ?? resolved;

              return (
                <Swiper
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    600: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    1124: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                    1300: {
                      slidesPerView: 4,
                      spaceBetween: 30,
                    },
                  }}
                  modules={[Autoplay]}
                  className='mySwiper'
                >
                  {posts.slice(-10).map((item, index) => (
                    <SwiperSlide key={index}>
                      <SwiperItem item={item} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </section>
  );
};

export default Properties;
