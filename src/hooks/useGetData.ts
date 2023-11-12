import { useState, useEffect } from 'react';
import { collection, getDocs, FirestoreError } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useGetData = (collectionName: string) => {
  const [data, setData] = useState<object[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    let isMounted = true;

    const getData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const collectionData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (isMounted) {
          setData(collectionData);
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

    getData();

    // Cleanup function setting flag isMounted to false
    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
};
