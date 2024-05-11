import Movie from './Movie';
import { MovieType } from '../utils/types';

type MovieListProps = {
  movieList: MovieType[];
  onSelectMovie: (id: string) => void;
};

function MovieList({ movieList, onSelectMovie }: MovieListProps) {
  return (
    <ul className="list list-movies" role="menu">
      {movieList?.map((movie) => (
        <Movie onSelectMovie={onSelectMovie} key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}

export default MovieList;
