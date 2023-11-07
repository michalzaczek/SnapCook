import { UserState, AuthAction } from './authTypes';

// Define the initial state for authentication
export const initialAuthState: UserState = {
  isAuthenticated: false,
  loading: true,
  user: null,
  subscriptionStatus: 'none',
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
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        subscriptionStatus: 'none',
      };
    case 'LOAD_USER':
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case 'SET_SUBSCRIPTION_STATUS':
      return {
        ...state,
        subscriptionStatus: action.payload,
      };
    default:
      return state;
  }
};
