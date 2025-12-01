import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

/**
 * Primary Firebase Configuration (Portfolio Project)
 * 
 * Used for Authentication and Firestore.
 * Loads configuration from environment variables for security.
 * Never commit the .env file to version control!
 * 
 * Required environment variables:
 * - VITE_FIREBASE_API_KEY
 * - VITE_FIREBASE_AUTH_DOMAIN
 * - VITE_FIREBASE_PROJECT_ID
 * - VITE_FIREBASE_STORAGE_BUCKET
 * - VITE_FIREBASE_MESSAGING_SENDER_ID
 * - VITE_FIREBASE_APP_ID
 * - VITE_FIREBASE_MEASUREMENT_ID
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

/**
 * Secondary Firebase Configuration (Alpha Project)
 * 
 * Used exclusively for Cloud Storage.
 * This allows us to use Storage from a different Firebase project
 * while keeping Auth and Firestore from the primary project.
 */
const storageConfig = {
  apiKey: "AIzaSyDSzLIj14wC_7AO5i4osL1sxRLdUUKIS2M",
  authDomain: "alpha-276ed.firebaseapp.com",
  projectId: "alpha-276ed",
  storageBucket: "alpha-276ed.appspot.com",
  messagingSenderId: "644870471106",
  appId: "1:644870471106:android:c2e4ae1cfcc7ddc2d42a5b",
  databaseURL: "https://alpha-276ed-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize primary Firebase app (for Auth & Firestore)
const app = initializeApp(firebaseConfig);

// Initialize secondary Firebase app (for Storage only)
const storageApp = initializeApp(storageConfig, 'storage');

// Initialize and export Firebase services
export const db = getFirestore(app);           // Firestore from primary project
export const auth = getAuth(app);              // Auth from primary project
export const storage = getStorage(storageApp); // Storage from Alpha project

export default app;
