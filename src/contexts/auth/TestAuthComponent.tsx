// TestAuthComponent.tsx
import React from 'react';
import { useAuth } from './AuthContext';

const TestAuthComponent: React.FC = () => {
  const { state, dispatch } = useAuth();

  // Function to simulate login
  const handleLogin = () => {
    // Dispatch a login success action with dummy user data
    dispatch({ type: 'LOGIN_SUCCESS', payload: { name: 'Test User' } });
  };

  // Function to simulate logout
  const handleLogout = () => {
    // Dispatch a logout action
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div>
      <h2>Test Auth Component</h2>
      <p>Is Authenticated: {state.isAuthenticated ? 'Yes' : 'No'}</p>
      <p>User: {state.user ? state.user.name : 'No User'}</p>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TestAuthComponent;
