// TestAuthComponent.tsx
import React from 'react';
import { useAuth } from './AuthContext';
import { useGoogleLogin } from '../../hooks/useGoogleLogin';

const TestAuthComponent: React.FC = () => {
  const { state, dispatch } = useAuth();
  const googleLogin = useGoogleLogin();

  // Function to simulate logout
  const handleLogout = () => {
    // Dispatch a logout action
    dispatch({ type: 'LOGOUT' });
  };

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
