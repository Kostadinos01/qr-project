import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebaseConfig';
import { getStorage } from 'firebase/storage';

const app = initializeApp(getFirebaseConfig);

export const storage = getStorage(app);