import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './config';
import useAuth from './useAuth';

const SampleComponent: React.FC = () => {
  const { user, isLoading } = useAuth();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <img
            src={user.photoURL || undefined}
            alt={user.displayName || undefined}
            width={50}
          />
        </div>
      ) : (
        <button onClick={signInWithGoogle} className='sign-in'>
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default SampleComponent;
