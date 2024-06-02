import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          placeholder="search order #"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="text-sx focuse:ring w-28 rounded-full bg-yellow-100 px-4 py-2 transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring-yellow-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
        />
      </label>
    </form>
  );
}

export default SearchOrder;
