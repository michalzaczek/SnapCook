import { UserState, AuthAction } from './authTypes';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/config';

export const initialAuthState: UserState = {
  isAuthenticated: false,
  isPremium: false,
  user: null,
  loading: true,
  error: null,
};

export const authReducer = (
  state: UserState,
  action: AuthAction
): UserState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        error: null,
      };
    case 'LOGOUT':
      signOut(auth);
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isPremium: false,
        loading: false,
        error: null,
      };
    case 'LOAD_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case 'SET_PREMIUM_STATUS':
      return {
        ...state,
        isPremium: action.payload,
        loading: false,
        error: null,
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'LOADED':
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};
