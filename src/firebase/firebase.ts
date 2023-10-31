import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
} from 'firebase/firestore';
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { getFirebaseConfig } from './firebaseConfig';

const app = initializeApp(getFirebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Function to create a user document in Firestore
const createUserDocument = async (user: User | null) => {
  if (!user) return;

  const userDocRef = doc(db, 'users', user.uid);
  const userData = {
    email: user.email,
    // Add other user-specific data as needed
  };

  await setDoc(userDocRef, userData, { merge: true });
};

export const signInUser = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  createUserDocument(userCredential.user);

  return userCredential;
};

export const registerUser = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  createUserDocument(userCredential.user);

  return userCredential;
};

export const userStateListener = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, (user) => {
    createUserDocument(user);
    callback(user);
  });
};

export const SignOutUser = async () => await signOut(auth);
