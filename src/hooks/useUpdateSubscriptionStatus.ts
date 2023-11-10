import { useContext } from 'react';
import { db } from '../firebase/config'; // Adjust as necessary
import { collection, query, where, getDocs } from 'firebase/firestore';
import { AuthContext } from '../contexts/auth/AuthContext';

export const useUpdateSubscriptionStatus = () => {
  const { dispatch } = useContext(AuthContext);

  const updateSubscriptionStatus = async (userId: string) => {
    try {
      const subscriptionsRef = collection(db, 'users', userId, 'subscriptions');
      const q = query(subscriptionsRef, where('status', '==', 'active'));
      const querySnapshot = await getDocs(q);

      let isActive = false;
      querySnapshot.forEach((doc) => {
        // If any subscription document has a status of 'active'
        if (doc.data().status === 'active') {
          isActive = true;
        }
      });

      // Update the subscription status based on the query result
      dispatch({
        type: 'SET_PREMIUM_STATUS',
        payload: isActive ? true : false,
      });
    } catch (error) {
      console.error('Error updating subscription status:', error);
      dispatch({
        type: 'FAILURE',
        payload: 'Failed to update subscription status',
      });
    }
  };

  return updateSubscriptionStatus;
};
