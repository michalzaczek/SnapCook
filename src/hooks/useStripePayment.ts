import { useContext } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import { doc, collection, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useStripePayment = () => {
  const { state, dispatch } = useContext(AuthContext);
  const currentUser = state.user;

  const redirectToCheckout = async (priceId: string) => {
    dispatch({ type: 'LOADING' });

    if (!currentUser || !currentUser.uid) {
      dispatch({ type: 'FAILURE', payload: 'User is not authenticated' });
      return;
    }

    try {
      const checkoutSessionRef = doc(
        collection(db, 'users', currentUser.uid, 'checkout_sessions')
      );

      await setDoc(checkoutSessionRef, {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });

      const unsubscribe = onSnapshot(
        checkoutSessionRef,
        (snap) => {
          const data = snap.data();
          if (data?.error) {
            unsubscribe();
            dispatch({ type: 'FAILURE', payload: data.error.message });
          } else if (data?.url) {
            unsubscribe();
            window.location.href = data.url; // Redirect to checkout
          }
        },
        (err) => {
          unsubscribe();
          dispatch({
            type: 'FAILURE',
            payload: 'An error occurred while listening to the session: ' + err,
          });
        }
      );
    } catch (err) {
      dispatch({
        type: 'FAILURE',
        payload: 'Failed to create checkout session',
      });
    }
  };

  return { redirectToCheckout };
};
