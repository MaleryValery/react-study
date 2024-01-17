import { MovieType } from '../types';

type NumResultsProps = {
  movieList: MovieType[];
};

function NumResults({ movieList }: NumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{movieList.length ? movieList.length : 0}</strong> results
    </p>
  );
}

export default NumResults;
