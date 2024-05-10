import { createContext, useContext } from 'react';
import { IUser } from '../types';

interface IAuthValues {
  user: IUser | null;
  isAuth: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}
const initValues: IAuthValues = {
  user: null,
  isAuth: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<IAuthValues>(initValues);

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('Auth context was used outside of Auth provider');

  return context;
}

export { AuthContext, useAuth };
