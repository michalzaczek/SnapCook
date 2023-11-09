import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth/AuthContext';
import { doc, collection, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

export const useStripePayment = () => {
  const { state } = useContext(AuthContext);
  const currentUser = state.user;
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const redirectToCheckout = async (priceId: string) => {
    if (!currentUser || !currentUser.uid) {
      setError(new Error('User is not authenticated'));
      return;
    }

    const checkoutSessionRef = doc(
      collection(db, 'customers', currentUser.uid, 'checkout_sessions')
    );

    setDoc(checkoutSessionRef, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    }).catch((err) => {
      console.error('Error creating checkout session:', err);
      setError(new Error('Failed to create checkout session'));
    });

    const unsubscribe = onSnapshot(
      checkoutSessionRef,
      (snap) => {
        const data = snap.data();
        console.log('Snapshot data:', data); // Debugging line
        if (data?.error) {
          console.error('Error from snapshot:', data.error); // Debugging line
          unsubscribe();
          setError(new Error(`An error occurred: ${data.error.message}`));
        } else if (data?.url) {
          console.log('Redirecting to:', data.url); // Debugging line
          unsubscribe();
          navigate(data.url);
        }
      },
      (err) => {
        console.error('Error listening to checkout session:', err); // Debugging line
        unsubscribe();
        setError(new Error('An error occurred while listening to the session'));
      }
    );
  };

  return { redirectToCheckout, error };
};
