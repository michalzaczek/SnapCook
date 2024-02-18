import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyAPCqJ9V4o-PwhSc7Cy76xSSbhKGNoAA5c',
  authDomain: 'snapcook-test.firebaseapp.com',
  projectId: 'snapcook-test',
  storageBucket: 'snapcook-test.appspot.com',
  messagingSenderId: '623003766714',
  appId: '1:623003766714:web:39e27ea9fa0bbfb5085783',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

if (import.meta.env.MODE === 'development') {
  connectAuthEmulator(auth, 'http://192.168.100.11:5003');
  connectFirestoreEmulator(db, '192.168.100.11', 5004);
}

export { db, auth, app, functions };
