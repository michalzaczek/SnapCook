import { useState, useEffect } from 'react';
import { collection, getDocs, FirestoreError } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useGetPaymentHistory = (uid: string | undefined) => {
  const [paymentHistory, setPaymentHistory] = useState<
    { amount_received: number; created: Date; currency: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPaymentHistory = async () => {
      try {
        const paymentsRef = collection(db, `users/${uid}/payments`);
        const querySnapshot = await getDocs(paymentsRef);
        const paymentsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            amount_received: data.amount_received,
            created: new Date(data.created * 1000), // 'created' is a Unix timestamp
            currency: data.currency,
          };
        });

        if (isMounted) {
          setPaymentHistory(paymentsData);
        }
      } catch (e) {
        if (isMounted) {
          setError(e as FirestoreError);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPaymentHistory();

    return () => {
      isMounted = false;
    };
  }, [uid]);

  return { paymentHistory, loading, error };
};
