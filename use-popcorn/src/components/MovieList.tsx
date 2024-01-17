import Movie from './Movie';
import { MovieType } from '../types';

type MovieListProps = {
  movieList: MovieType[];
};

function MovieList({ movieList }: MovieListProps) {
  return (
    <ul className="list">
      {movieList?.map((movie) => <Movie key={movie.imdbID} movie={movie} />)}
    </ul>
  );
}

export default MovieList;
