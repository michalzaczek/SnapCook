// AuthContext.tsx
import React, { createContext, useReducer, useContext } from 'react';
import { AuthContextProps, AuthProviderProps } from './authTypes';
import { authReducer, initialAuthState } from './authReducer';

// Create the context
export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

// Create a custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Define the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
