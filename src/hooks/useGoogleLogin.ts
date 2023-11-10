import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useContext } from 'react';
import { auth } from '../firebase/config';
import { AuthContext } from '../contexts/auth/AuthContext';

// Define your hook
export const useGoogleLogin = () => {
  const { dispatch } = useContext(AuthContext);

  const googleLogin = async () => {
    dispatch({ type: 'LOADING' });

    const provider = new GoogleAuthProvider();
    try {
      // Start the sign-in process with a popup.
      const result = await signInWithPopup(auth, provider);
      // Google Access Token which can be used to access the Google API.
      //   const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;

      // Here subscription status if needed.
      // const subscriptionStatus = (await user.getIdTokenResult()).claims.subscriptionStatus || 'none';

      // Dispatch login success action
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: user,
        // subscription status:
        // subscriptionStatus: subscriptionStatus,
      });

      // additional logic to handle after a successful login
    } catch (error) {
      // Handle Errors
      console.error('Error during Google sign-in', error);
    }
  };

  return googleLogin;
};
