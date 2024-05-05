import { ReactNode, useEffect, useState } from 'react';
import { BASE_URL, CitiesContext } from './CitiesContext';
import { ICity } from '../types';

const CitiesProvider = ({ children }: { children: ReactNode }) => {
  const [cities, setCities] = useState<ICity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentCity, setCurrentCity] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
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

  const getCity = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (err) {
      console.log((err as Error).message, 'cannot load');
    } finally {
      setIsLoading(false);
    }
  };

  const createCity = async (newCity: Omit<ICity, 'id'>) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setCities((prevData) => [...prevData, data]);
    } catch (err) {
      console.log((err as Error).message, 'cannot load');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCity = async (cityId: string) => {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: 'DELETE',
      });
      setCities((prevData) => prevData.filter((city) => city.id !== cityId));
    } catch (error) {
      console.log((error as Error).message, 'cannot load');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity: getCity,
        createCity: createCity,
        deleteCity: deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};
export default CitiesProvider;
