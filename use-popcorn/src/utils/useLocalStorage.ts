import { useEffect, useState } from 'react';
import { WatchedMovieType } from './types';
import { LS_KEYS } from './consts';

export function useLocalStorageState(
  initValue: WatchedMovieType[],
  key: string
) {
  const saveWatchedMovies = (data: string) => {
    localStorage.setItem(LS_KEYS.watched, data);
  };

  const getLsData = (keyValue: string) => {
    const data = localStorage.getItem(keyValue);
    if (!data) return null;
    return data;
  };

  const [value, setValue] = useState<WatchedMovieType[]>(() => {
    const data = getLsData(key) ?? '';
    return data ? JSON.parse(data) : initValue;
  });

  useEffect(() => {
    saveWatchedMovies(JSON.stringify(value));
  }, [value]);

  return { value, setValue };
}
