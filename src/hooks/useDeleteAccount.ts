import { useState, useContext } from 'react';
import { getAuth, deleteUser, User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { AuthContext } from '../contexts/auth/AuthContext';

export const useDeleteAccount = () => {
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState<FirebaseError | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deleteAccount = async () => {
    const auth = getAuth();
    const user: User | null = auth.currentUser;

    if (user) {
      setIsDeleting(true);
      try {
        await deleteUser(user);
        dispatch({ type: 'LOGOUT' });
      } catch (error) {
        setError(error as FirebaseError);
      } finally {
        setIsDeleting(false);
      }
    } else {
      setError({
        code: 'auth/no-current-user',
        message: 'No authenticated user found.',
      } as FirebaseError);
    }
  };

  return { deleteAccount, isDeleting, error };
};
