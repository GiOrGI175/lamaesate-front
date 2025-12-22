import { useState } from 'react';
import './searchBar.scss';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const types = ['buy', 'rent'];

const searchVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, type: 'spring', stiffness: 120 },
  },
};

function SearchBar() {
  const [query, setQuery] = useState({
    type: 'buy',
    city: '',
    minPrice: '',
    maxPrice: '',
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildQuery = () => {
    const params = new URLSearchParams();

    if (query.type) params.set('type', query.type);
    if (query.city.trim()) params.set('city', query.city.trim());
    if (query.minPrice !== '' && Number(query.minPrice) > 0)
      params.set('minPrice', query.minPrice);
    if (query.maxPrice !== '' && Number(query.maxPrice) > 0)
      params.set('maxPrice', query.maxPrice);

    return params.toString();
  };

  return (
    <motion.div
      variants={searchVariants}
      initial='hidden'
      animate='visible'
      className='searchBar'
    >
      <div className='type'>
        {types.map((type) => (
          <button
            key={type}
            type='button'
            onClick={() => switchType(type)}
            className={query.type === type ? 'active' : ''}
          >
            {type}
          </button>
        ))}
      </div>

      <form>
        <input
          type='text'
          name='city'
          placeholder='City'
          value={query.city}
          onChange={handleChange}
        />
        <input
          type='number'
          name='minPrice'
          placeholder='Min Price'
          value={query.minPrice}
          onChange={handleChange}
        />
        <input
          type='number'
          name='maxPrice'
          placeholder='Max Price'
          value={query.maxPrice}
          onChange={handleChange}
        />

        <Link to={`/list?${buildQuery()}`}>
          <button type='button'>
            <img src='/search.png' alt='search' />
          </button>
        </Link>
      </form>
    </motion.div>
  );
}

export default SearchBar;
