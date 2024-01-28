import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useContext } from 'react';
import { auth } from '../firebase/config';
import { AuthContext } from '../contexts/auth/AuthContext';

// Define your hook
export const useGoogleLogin = () => {
  const { dispatch, updateSubscriptionStatus } = useContext(AuthContext);

  const googleLogin = async () => {
    dispatch({ type: 'LOADING' });

    const provider = new GoogleAuthProvider();

    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      // Start the sign-in process with a popup.
      const result = await signInWithPopup(auth, provider);
      // Google Access Token which can be used to access the Google API.
      //   const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;

      await updateSubscriptionStatus(user.uid);

      // Dispatch login success action
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
      });

      // additional logic to handle after a successful login
    } catch (error) {
      // Handle Errors
      console.error('Error during Google sign-in', error);
    }
  };

  return googleLogin;
};
