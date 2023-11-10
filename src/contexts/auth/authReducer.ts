import { UserState, AuthAction } from './authTypes';

// Define the initial state for authentication
export const initialAuthState: UserState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  subscriptionStatus: 'none',
  error: null,
};

// Define the reducer function
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
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        subscriptionStatus: 'none',
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
    case 'SET_SUBSCRIPTION_STATUS':
      return {
        ...state,
        subscriptionStatus: action.payload,
        loading: false,
        error: null,
      };
    case 'FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
