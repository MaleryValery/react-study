import { ReactNode, useEffect, useState } from 'react';
import { BASE_URL, CitiesContext } from './CitiesContext';
import { ICity } from '../types';

const CitiesProvider = ({ children }: { children: ReactNode }) => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        setCities(data);
      } catch (err) {
        console.log('cannot load');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};
export default CitiesProvider;
