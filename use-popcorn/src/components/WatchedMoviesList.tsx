import { WatchedMovieType } from '../types';
import WatchedMovie from './WatchedMovie';

type WatchedProps = {
  watched: WatchedMovieType[];
};

function WatchedMoviesList({ watched }: WatchedProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

export default WatchedMoviesList;
