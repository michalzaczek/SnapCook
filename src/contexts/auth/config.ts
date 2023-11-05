import { FirebaseOptions, initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyAARy99lrxox2WCIrfNchNos4yhkQVw6dM',
  authDomain: 'snapcook-5db3f.firebaseapp.com',
  projectId: 'snapcook-5db3f',
  storageBucket: 'snapcook-5db3f.appspot.com',
  messagingSenderId: '641931645938',
  appId: '1:641931645938:web:543f3355b84cb1a106d16b',
  measurementId: 'G-YQDKQNT3CE',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.useDeviceLanguage();

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
