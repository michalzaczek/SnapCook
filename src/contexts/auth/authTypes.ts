import { User } from 'firebase/auth';
import { Dispatch, ReactNode } from 'react';

// Define the shape of the user state
export interface UserState {
  isAuthenticated: boolean;
  isPremium: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Define the actions types
export type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_USER'; payload: User }
  | { type: 'SET_PREMIUM_STATUS'; payload: boolean }
  | { type: 'LOADING' }
  | { type: 'FAILURE'; payload: string | null };

// Define the shape of the context
export interface AuthContextProps {
  state: UserState;
  dispatch: Dispatch<AuthAction>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
