import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { AuthContextProps, AuthProviderProps } from './authTypes';
import { authReducer, initialAuthState } from './authReducer';
import { onAuthStateChanged, User } from '@firebase/auth';
import { auth } from '../../firebase/config';

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: User | null) => {
      dispatch({ type: 'LOADING' });

      if (!currentUser) {
        dispatch({ type: 'LOADED' });
        return;
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: currentUser });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
