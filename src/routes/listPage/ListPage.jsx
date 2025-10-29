import React, { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import Card from '../../components/card/Card';
import Filter from '../../components/filter/Filter';
import Map from '../../components/map/Map';
import './listPage.scss';
import 'leaflet/dist/leaflet.css';
import Loader from '../../components/loader/Loader';
import { motion, useInView } from 'framer-motion';

const ListPage = () => {
  const { postResponse } = useLoaderData();

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={postResponse} errorElement={<p>Error loading posts!</p>}>
        {(resolved) => {
          const posts = resolved?.data ?? resolved;

          return (
            <div className='listPage'>
              <div className='listContainer'>
                <div className='wrapper'>
                  <Filter />
                  {posts.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                      }}
                    >
                      <Card item={item} />
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className='mapContainer'>
                <Map items={posts} />
              </div>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default ListPage;
