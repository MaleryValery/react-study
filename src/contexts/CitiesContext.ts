import { createContext, useContext } from 'react';
import { ICity } from '../types';

const BASE_URL = 'http://localhost:9000/cities';
interface IinitValues {
  cities: ICity[];
  isLoading: boolean;
}
const initValues = {
  cities: [],
  isLoading: false,
};

const CitiesContext = createContext<IinitValues>(initValues);

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) throw new Error('Cities context is used outside of CitiesProvider');
  return context;
}

export { useCities, CitiesContext, BASE_URL };
