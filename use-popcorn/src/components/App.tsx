import { useState } from 'react';
import Nav from './Nav';
import Main from './Main';

import Search from './Search';
import Logo from './Logo';
import NumResults from './NumResults';

import ListBox from './ListBox';
import MovieList from './MovieList';
import WatchedSummary from './WatchedSummary';
import WatchedMoviesList from './WatchedMoviesList';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import SelectedMovie from './SelectedMovie';

import { WatchedMovieType } from '../utils/types';
import { LS_KEYS } from '../utils/consts';
import { useMovies } from '../utils/useMovies';
import { useLocalStorageState } from '../utils/useLocalStorage';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const { value: watched, setValue: setWatched } = useLocalStorageState(
    [],
    LS_KEYS.watched
  );

  const handleCloseMovie = () => {
    setSelectedId('');
  };

  const handleSelectMovie = (movieId: string) => {
    setSelectedId(selectedId === movieId ? '' : movieId);
  };

  const handleWatchedMovie = (movie: WatchedMovieType) => {
    setWatched((watchedList) => [...watchedList, movie]);
  };

  const handleDeleteWatched = (currentMovie: WatchedMovieType) => {
    setWatched((watchedList) =>
      watchedList.filter((movieEl) => movieEl.imdbID !== currentMovie.imdbID)
    );
  };

  const { movies, error, isLoading } = useMovies(query, handleCloseMovie);

  return (
    <>
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movieList={movies} />
      </Nav>
      <Main>
        <ListBox>
          {isLoading && !error && <Loader />}
          {!isLoading && !error && (
            <MovieList onSelectMovie={handleSelectMovie} movieList={movies} />
          )}
          {error && <ErrorMessage message={error} />}
        </ListBox>

        <ListBox>
          {selectedId ? (
            <SelectedMovie
              watchedList={watched}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatchedMovie={handleWatchedMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                onDeleteMovie={handleDeleteWatched}
                watched={watched}
              />
            </>
          )}
        </ListBox>
      </Main>
    </>
  );
}
