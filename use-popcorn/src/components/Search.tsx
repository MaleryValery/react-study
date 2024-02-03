import { Dispatch, SetStateAction } from 'react';

type SearchProps = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};

function Search({ query, setQuery }: SearchProps) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
