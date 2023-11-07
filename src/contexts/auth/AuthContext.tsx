// AuthContext.tsx
import React, { createContext, useReducer, useContext } from 'react';
import { UserState, AuthAction } from './authTypes';
import { authReducer, initialAuthState } from './authReducer';

// Define the shape of the context
interface AuthContextProps {
  state: UserState;
  dispatch: React.Dispatch<AuthAction>;
}

// Create the context
export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

// Create a custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Define the AuthProvider component
export const AuthProvider: React.FC = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
