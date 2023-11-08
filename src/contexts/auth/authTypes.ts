import { ReactNode } from 'react';

// Define the shape of the user state
export interface UserState {
  isAuthenticated: boolean;
  loading: boolean;
  user: any;
  subscriptionStatus: 'none' | 'pending' | 'active';
}

// Define the actions types
export type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: any }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_USER'; payload: any }
  | { type: 'SET_SUBSCRIPTION_STATUS'; payload: 'none' | 'pending' | 'active' };

// Define the shape of the context
export interface AuthContextProps {
  state: UserState;
  dispatch: React.Dispatch<AuthAction>;
}

export interface AuthProviderProps {
  children: ReactNode;
}