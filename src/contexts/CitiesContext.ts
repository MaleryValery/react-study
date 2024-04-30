import { createContext, useContext } from 'react';
import { ICity } from '../types';

const BASE_URL = 'http://localhost:9000';
interface IinitValues {
  cities: ICity[] | null;
  isLoading: boolean;
  currentCity: ICity | null;
  getCity: (id: string) => Promise<void>;
}
const initValues = {
  cities: null,
  isLoading: false,
  currentCity: null,
  getCity: async () => {},
};

const CitiesContext = createContext<IinitValues>(initValues);

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error('Cities context is used outside of CitiesProvider');
  return context;
}

export { useCities, CitiesContext, BASE_URL };
