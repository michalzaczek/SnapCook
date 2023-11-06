import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

export { db };
