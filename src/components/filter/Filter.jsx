import { useSearchParams } from 'react-router-dom';
import './filter.scss';
import { useState } from 'react';
import { animate, motion } from 'framer-motion';

const Filter = () => {
  const [searchParams, setSerchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get('type') || '',
    city: searchParams.get('city') || '',
    property: searchParams.get('Property') || '',
    minPrice: searchParams.get('minPrice') || 0,
    maxPrice: searchParams.get('maxPrice') || 1000000,
    bedroom: searchParams.get('bedroom') || 1,
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSerchParams(query);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, type: 'spring', stiffness: 120 }}
      className='filter'
    >
      <h1>
        Search reults for <b>{searchParams.get('city')}</b>
      </h1>
      <div className='top'>
        <div className='item'>
          <label htmlFor='city'>Location</label>
          <input
            type='text'
            id='city'
            name='city'
            placeholder='City Location'
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>

      <div className='bottom'>
        <div className='item'>
          <label htmlFor='type'>type</label>
          <select
            name='type'
            id='type'
            onChange={handleChange}
            defaultValue={query.type}
          >
            <option value=''>any</option>
            <option value='buy'>Buy</option>
            <option value='rent'>Rent</option>
          </select>
        </div>
        <div className='item'>
          <label htmlFor='property'>Property</label>
          <select
            name='property'
            id='property'
            onChange={handleChange}
            defaultValue={query.property}
          >
            <option value=''>any</option>
            <option value='apartament'>Apartament</option>
            <option value='house'>House</option>
            <option value='condo'>Condo</option>
            <option value='land'>land</option>
          </select>
        </div>
        <div className='item'>
          <label htmlFor='minPrice'>Min Price</label>
          <input
            type='number'
            id='minPrice'
            name='minPrice'
            placeholder='any'
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>
        <div className='item'>
          <label htmlFor='maxPrice'>Max Price</label>
          <input
            type='number'
            id='maxPrice'
            name='maxPrice'
            placeholder='any'
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>
        <div className='item'>
          <label htmlFor='bedroom'>bedroom</label>
          <input type='text' id='bedroom' name='bedroom' placeholder='any' />
        </div>
        <button onClick={handleFilter}>
          <img src='/search.png' alt='search' />
        </button>
      </div>
    </motion.div>
  );
};

export default Filter;
