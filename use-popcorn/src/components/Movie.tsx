import { MovieType } from '../utils/types';

type MovieProp = {
  movie: MovieType;
  onSelectMovie: (id: string) => void;
};

function Movie({ movie, onSelectMovie }: MovieProp) {
  return (
    <li
      key={movie.imdbID}
      tabIndex={0}
      role="menuitem"
      onClick={() => onSelectMovie(movie.imdbID)}
      onKeyDown={() => {}}
    >
      <div>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </div>
    </li>
  );
}

export default Movie;
