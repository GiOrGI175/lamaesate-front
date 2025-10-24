import { Suspense } from 'react';
import { useLoaderData, Await } from 'react-router-dom';
import Card from '../../components/card/Card';
import Filter from '../../components/filter/Filter';
import Map from '../../components/map/Map';
import './listPage.scss';
import 'leaflet/dist/leaflet.css';

const ListPage = () => {
  // ✅ Get the loader data from React Router
  const { postResponse } = useLoaderData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={postResponse} errorElement={<p>Error loading posts!</p>}>
        {(resolved) => {
          const posts = resolved?.data ?? resolved;

          return (
            <div className='listPage'>
              <div className='listContainer'>
                <div className='wrapper'>
                  <Filter />
                  {posts.map((item) => (
                    <Card key={item.id} item={item} />
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
