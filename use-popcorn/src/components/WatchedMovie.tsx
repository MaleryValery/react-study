import { WatchedMovieType } from '../utils/types';

type WatchedMovieProp = {
  movie: WatchedMovieType;
  onDeleteMovie: (movie: WatchedMovieType) => void;
};

function WatchedMovie({ movie, onDeleteMovie }: WatchedMovieProp) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          type="button"
          className="btn-delete"
          onClick={() => onDeleteMovie(movie)}
        >
          ➕
        </button>
      </div>
    </li>
  );
}

export default WatchedMovie;
