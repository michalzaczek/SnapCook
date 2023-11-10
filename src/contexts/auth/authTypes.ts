import { User } from 'firebase/auth';
import { ReactNode } from 'react';

// Define the shape of the user state
export interface UserState {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  subscriptionStatus: 'none' | 'pending' | 'active';
  error: string | null;
}

// Define the actions types
export type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'LOAD_USER'; payload: User }
  | { type: 'SET_SUBSCRIPTION_STATUS'; payload: 'none' | 'pending' | 'active' }
  | { type: 'LOADING' }
  | { type: 'FAILURE'; payload: string | null };

// Define the shape of the context
export interface AuthContextProps {
  state: UserState;
  dispatch: React.Dispatch<AuthAction>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
