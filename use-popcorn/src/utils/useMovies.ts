import { useCallback, useEffect, useState } from 'react';
import { MovieType, SearchResponse } from './types';
import { API_KEY } from './consts';

export function useMovies(query: string, fn?: () => void) {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const closeDetailedSection = useCallback(() => {
    fn?.();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    closeDetailedSection();
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
  }, [query, closeDetailedSection]);

  return { movies, error, isLoading };
}
