import { useEffect, useState } from 'react';
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

import { MovieType, SearchResponse, WatchedMovieType } from '../utils/types';
import { API_KEY } from '../utils/consts';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [watched, setWatched] = useState<WatchedMovieType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState('');

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

  useEffect(() => {
    const controller = new AbortController();
    async function fetchMovie() {
      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }
      try {
        setError('');
        setIsLoading(true);

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error('something went wrong =(');
        const data: SearchResponse = await res.json();

        if (data.Response === 'False') throw new Error('Nothing is found');
        setMovies(() => data.Search);
      } catch (e: unknown) {
        if (e instanceof Error && e.name !== 'AbortError') {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();

    return () => {
      controller.abort();
    };
  }, [query]);

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
