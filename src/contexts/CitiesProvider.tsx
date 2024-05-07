import { ReactNode, useEffect, useReducer } from 'react';
import { BASE_URL, CitiesContext } from './CitiesContext';
import { ICity } from '../types';

interface IinitState {
  cities: ICity[];
  isLoading: boolean;
  currentCity: ICity | null;
  error: string;
}
const initValues: IinitState = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: '',
};

type Actionstype =
  | { type: 'loading' }
  | { type: 'cities/loaded'; payload: ICity[] }
  | { type: 'city/loaded'; payload: ICity }
  | { type: 'cities/created'; payload: ICity[] }
  | { type: 'cities/deleted'; payload: string }
  | { type: 'city/added'; payload: ICity }
  | { type: 'rejected'; payload: string };

const reducer = (state: IinitState, action: Actionstype): IinitState => {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload };
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload };
    case 'city/added':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case 'cities/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: null,
      };
    case 'rejected':
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error('Action is not defined');
  }
};

const CitiesProvider = ({ children }: { children: ReactNode }) => {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initValues
  );

  useEffect(() => {
    const fetchCities = async () => {
      try {
        dispatch({ type: 'loading' });
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (err) {
        dispatch({ type: 'rejected', payload: (err as Error).message });
      }
    };
    fetchCities();
  }, []);

  const getCity = async (id: string) => {
    console.log('🚀 ~ getCity ~ id === currentCity?.id:', id, currentCity?.id);
    if (id === currentCity?.id) return;
    try {
      dispatch({ type: 'loading' });
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      dispatch({ type: 'city/loaded', payload: data });
    } catch (err) {
      dispatch({ type: 'rejected', payload: (err as Error).message });
    }
  };

  const createCity = async (newCity: Omit<ICity, 'id'>) => {
    try {
      dispatch({ type: 'loading' });
      const response = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch({ type: 'city/added', payload: data });
    } catch (err) {
      dispatch({ type: 'rejected', payload: (err as Error).message });
    }
  };

  const deleteCity = async (cityId: string) => {
    try {
      dispatch({ type: 'loading' });
      await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'cities/deleted', payload: cityId });
    } catch (err) {
      dispatch({ type: 'rejected', payload: (err as Error).message });
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
