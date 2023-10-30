import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  User,
  UserCredential,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider } from './config';
import { signInWithPopup } from 'firebase/auth';

interface IAuthContext {
  user: User | null;
  isLoading: boolean;
  logOut: () => Promise<void>;
  loginGoogle: () => Promise<UserCredential>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  // State to hold the current user and isLoading state
  const [user, setUser] = useState<User | null>(() => auth.currentUser);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Subscribing to auth state changes (login/logout)
    onAuthStateChanged(auth, (currentUser: User | null) => {
      // Setting the user state with the current user
      setUser(currentUser);

      // Setting isLoading to false once the user state is updated
      setIsLoading(false);
    });
  }, []);

  function loginGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  function logOut() {
    return signOut(auth);
  }

  const value = useMemo(
    () => ({
      user,
      isLoading,
      logOut,
      loginGoogle,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined)
    throw new Error('AuthContext was used outside of the AuthProvider');
  return context;
}

export { useAuth, AuthProvider };
