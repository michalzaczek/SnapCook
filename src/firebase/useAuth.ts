import { useState, useEffect } from 'react';
import { User, getAuth, onAuthStateChanged, Auth } from 'firebase/auth';

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const useAuth = (): AuthState => {
  // State to hold the current user and isLoading state
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Getting the Firebase auth instance
    const auth: Auth = getAuth();

    // Subscribing to auth state changes (login/logout)
    const unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
      // Setting the user state with the current user
      setUser(currentUser);

      // Setting isLoading to false once the user state is updated
      setIsLoading(false);
    });

    // Cleanup function to unsubscribe from the auth state changes when the component unmounts
    return () => unsubscribe();
  }, []);

  // Returning the user and isLoading state
  return { user, isLoading };
};

export default useAuth;
