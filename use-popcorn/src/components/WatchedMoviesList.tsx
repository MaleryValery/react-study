import { WatchedMovieType } from '../utils/types';
import WatchedMovie from './WatchedMovie';

type WatchedProps = {
  watched: WatchedMovieType[];
  onDeleteMovie: (movie: WatchedMovieType) => void;
};

function WatchedMoviesList({ watched, onDeleteMovie }: WatchedProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          onDeleteMovie={onDeleteMovie}
          key={movie.imdbID}
          movie={movie}
        />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
