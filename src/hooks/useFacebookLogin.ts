import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { useContext } from 'react';
import { auth } from '../firebase/config';
import { AuthContext } from '../contexts/auth/AuthContext';

export const useFacebookLogin = () => {
  const { dispatch, updateSubscriptionStatus } = useContext(AuthContext);

  const facebookLogin = async () => {
    dispatch({ type: 'LOADING' });

    const provider = new FacebookAuthProvider();

    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      await updateSubscriptionStatus(user.uid);

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      });
    } catch (error) {
      dispatch({
        type: 'FAILURE',
        payload: `Error during Facebook sign-in: ${error}`,
      });
    }
  };

  return facebookLogin;
};
