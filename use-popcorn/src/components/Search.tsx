import { Dispatch, SetStateAction, useRef } from 'react';
import { useKeybordKey } from '../utils/useKeybordKey';

type SearchProps = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};

function Search({ query, setQuery }: SearchProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handlerSearchInput() {
    if (document.activeElement === inputRef.current) return;
    if (inputRef) inputRef.current?.focus();
    setQuery('');
    inputRef.current?.focus();
  }

  useKeybordKey('Enter', handlerSearchInput);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      ref={inputRef}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
