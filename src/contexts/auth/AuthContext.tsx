import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { AuthContextProps, AuthProviderProps } from './authTypes';
import { authReducer, initialAuthState } from './authReducer';
import { onAuthStateChanged, User } from '@firebase/auth';
import { auth, db } from '../../firebase/config';
import { collection, query, where, getDocs } from '@firebase/firestore';

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const updateSubscriptionStatus = async (userId: string) => {
    try {
      const subscriptionsRef = collection(db, 'users', userId, 'subscriptions');
      const q = query(subscriptionsRef, where('status', '==', 'active'));
      const querySnapshot = await getDocs(q);

      let isActive = false;
      querySnapshot.forEach((doc) => {
        if (doc.data().status === 'active') {
          isActive = true;
        }
      });

      dispatch({
        type: 'SET_PREMIUM_STATUS',
        payload: isActive,
      });
    } catch (error) {
      console.error('Error updating subscription status:', error);
      dispatch({
        type: 'FAILURE',
        payload: 'Failed to update subscription status',
      });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: User | null) => {
      dispatch({ type: 'LOADING' });

      if (!currentUser) {
        dispatch({ type: 'LOADED' });
        return;
      }

      await updateSubscriptionStatus(currentUser.uid);

      dispatch({ type: 'LOGIN_SUCCESS', payload: currentUser });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch, updateSubscriptionStatus }}>
      {children}
    </AuthContext.Provider>
  );
};
