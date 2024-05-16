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
        />
      </label>
    </form>
  );
}

export default SearchOrder;
