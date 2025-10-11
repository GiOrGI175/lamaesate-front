import { useState } from 'react';
import './searchBar.scss';

const types = ['buy', 'rent'];

const SearchBar = () => {
  const [query, setQuery] = useState({
    type: 'buy',
    location: '',
    minPrice: 0,
    maxPriceL: 0,
  });

  const switchType = (val) => {
    setQuery((pv) => ({ ...pv, type: val }));
  };
  return (
    <div className='SearchBar'>
      <div className='type'>
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? 'active' : ''}
          >
            {type}
          </button>
        ))}
      </div>
      <form action=''>
        <input type='text' name='location' placeholder='city location' />
        <input
          type='number'
          name='minPrice'
          min={0}
          max={10000000}
          placeholder='Min Price'
        />
        <input
          type='number'
          name='maxPrice'
          min={0}
          max={10000000}
          placeholder='Max Price'
        />

        <button>
          <img src='/search.png' alt='serach' />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
