// TestAuthComponent.tsx
import React, { useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useGoogleLogin } from '../../hooks/useGoogleLogin';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../../firebase/config';

const TestAuthComponent: React.FC = () => {
  const { state, dispatch } = useAuth();
  const googleLogin = useGoogleLogin();

  // Function to simulate logout
  const handleLogout = () => {
    // Dispatch a logout action
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    const testFunction = httpsCallable(functions, 'testFunction');

    testFunction()
      .then((result) => {
        console.log('Result from testFunction:', result);
      })
      .catch((err) => {
        console.error('Error calling testFunction:', err);
      });
  }, []);

  return (
    <div>
      <h2>Test Auth Component</h2>
      <p>Is Authenticated: {state.isAuthenticated ? 'Yes' : 'No'}</p>
      <p>User: {state.user ? state.user.displayName : 'No User'}</p>
      <button onClick={googleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TestAuthComponent;
function setData(data: unknown) {
  throw new Error('Function not implemented.');
}
