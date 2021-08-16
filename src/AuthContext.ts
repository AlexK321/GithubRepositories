import { createContext, Dispatch, SetStateAction } from 'react';

interface IInitialState {
  isLoggedIn: Boolean | string;
  user: any;// eslint-disable-line
  clientId: string;
  redirectUri: string;
  clientSecret: string;
  proxyUrl: string;
}

export interface IAuthContext {
  authState: IInitialState;
  setAuthState: Dispatch<SetStateAction<IInitialState>>;
}

export const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') || false,
  user: JSON.parse(localStorage.getItem('user') || '{}'),
  clientId: process.env.REACT_APP_CLIENT_ID || '',
  redirectUri: process.env.REACT_APP_REDIRECT_URI || '',
  clientSecret: process.env.REACT_APP_CLIENT_SECRET || '',
  proxyUrl: process.env.REACT_APP_PROXY_URL || '',
};

const AuthContext = createContext<IAuthContext>({
  authState: initialState,
  setAuthState: () => null,
});

export default AuthContext;
