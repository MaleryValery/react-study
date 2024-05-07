import { ReactNode, useReducer } from 'react';
import { IUser } from '../types';
import { AuthContext } from './AuthContext';

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

interface IAuthState {
  user: IUser | null;
  isAuth: boolean;
}
const initState = {
  user: null,
  isAuth: false,
};

type Actions =
  | { type: 'login'; payload: IUser }
  | { type: 'logout'; payload: IUser | null };

const reducer = (state: IAuthState, action: Actions): IAuthState => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuth: true };
    case 'logout':
      return { ...state, user: null, isAuth: false };
    default:
      throw new Error('Action is not defined');
  }
};
function AuthProvider({ children }: { children: ReactNode }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initState);

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: 'login', payload: FAKE_USER });
    }
  }

  function logout() {}
  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
