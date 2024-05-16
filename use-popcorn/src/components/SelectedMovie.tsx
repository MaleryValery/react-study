import { useEffect, useRef, useState } from 'react';
import { API_KEY } from '../utils/consts';
import { MovieDetails, WatchedMovieType } from '../utils/types';
import StarRating from './StarRating';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { useKeybordKey } from '../utils/useKeybordKey';

type SelectedIdProps = {
  selectedId: string;
  watchedList: WatchedMovieType[];
  onCloseMovie: () => void;
  onAddWatchedMovie: (movie: WatchedMovieType) => void;
};

function SelectedMovie({
  selectedId,
  onCloseMovie,
  onAddWatchedMovie,
  watchedList,
}: SelectedIdProps) {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);

  const countRef = useRef(0);

  useKeybordKey('Escape', onCloseMovie);

  useEffect(() => {
    if (rating) {
      countRef.current += 1;
    }
  }, [rating]);

  useEffect(() => {
    if (!movie?.Title) return;

    document.title = `MOVIE: ${movie.Title}`;

    // eslint-disable-next-line consistent-return
    return () => {
      document.title = 'use Popcorn';
    };
  }, [movie]);

  useEffect(() => {
    async function getMoviedetails() {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`
        );

        if (!res.ok) throw new Error('cannot fetch');
        const data: MovieDetails = await res.json();
        setMovie(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    getMoviedetails();
  }, [selectedId]);

  const handleAddMovie = (newMovie: MovieDetails | null) => {
    if (!newMovie) return;
    const newWatchedMovie: WatchedMovieType = {
      imdbRating: Number(newMovie.imdbRating),
      title: newMovie.Title,
      year: newMovie.Year,
      runtime: Number(newMovie.Runtime.split(' ').at(0)),
      imdbID: newMovie.imdbID,
      poster: newMovie.Poster,
      userRating: rating,
      countRatingDecisions: countRef.current,
    };

    onAddWatchedMovie(newWatchedMovie);
    onCloseMovie();
  };

  const isWatched = watchedList.find(
    (movieEl) => movieEl.imdbID === movie?.imdbID
  );

  return (
    <div className="details">
      {isLoading && Boolean(!error) && <Loader />}
      {!isLoading && Boolean(error) && <ErrorMessage message={error} />}
      {!isLoading && Boolean(!error) && (
        <>
          <button type="button" className="btn-back" onClick={onCloseMovie}>
            ⬅
          </button>
          <header>
            <img src={movie?.Poster} alt={`poster of movie ${movie?.Title}`} />
            <div className="details-overview">
              <h2>{movie?.Title}</h2>
              <p>
                {movie?.Released} &bull; {movie?.Runtime}
              </p>
              <p>{movie?.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie?.imdbRating}IMDB rating
              </p>
            </div>
          </header>
          <section>
            {isWatched ? (
              <div className="rating">
                <span>
                  {' '}
                  your rating {'⭐️'.repeat(isWatched.userRating || 0)}
                </span>
              </div>
            ) : (
              <div className="rating">
                <StarRating onSetRating={setRating} />
                {rating > 0 && (
                  <button
                    type="button"
                    className="btn-add"
                    onClick={() => handleAddMovie(movie ?? null)}
                  >
                    add to list
                  </button>
                )}
              </div>
            )}
            <p>
              <em>{movie?.Plot}</em>
            </p>
            <p>Starring {movie?.Actors}</p>
            <p>Directing {movie?.Director}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default SelectedMovie;
