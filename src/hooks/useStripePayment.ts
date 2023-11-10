import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import { doc, collection, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useStripePayment = () => {
  const { state } = useContext(AuthContext);
  const currentUser = state.user;
  const [error, setError] = useState<Error | null>(null);

  const redirectToCheckout = async (priceId: string) => {
    if (!currentUser || !currentUser.uid) {
      setError(new Error('User is not authenticated'));
      return;
    }

    const checkoutSessionRef = doc(
      collection(db, 'users', currentUser.uid, 'checkout_sessions')
    );

    setDoc(checkoutSessionRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }).catch((err) => {
      setError(new Error('Failed to create checkout session'));
    });

    const unsubscribe = onSnapshot(
      checkoutSessionRef,
      (snap) => {
        const data = snap.data();
        if (data?.error) {
          unsubscribe();
          setError(new Error(`An error occurred: ${data.error.message}`));
        } else if (data?.url) {
          unsubscribe();
          window.location.href = data.url; // Redirect to Stripe
        }
      },
      (err) => {
        unsubscribe();
        setError(new Error('An error occurred while listening to the session'));
      }
    );
  };

  return { redirectToCheckout, error };
};
