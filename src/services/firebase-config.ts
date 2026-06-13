import AsyncStorage from '@react-native-async-storage/async-storage';

import { getApps, initializeApp } from 'firebase/app';

import {
  getFirestore,
} from 'firebase/firestore';

import {
  getAuth,
  initializeAuth,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSy...oMHY",

  authDomain:
    "endpass-v1.firebaseapp.com",

  projectId:
    "endpass-v1",

  storageBucket:
    "endpass-v1.firebasestorage.app",

  messagingSenderId:
    "509921238446",

  appId:
    "1:509921238446:web:5232060d443741c3bc7c3f",
};

const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

export const db =
  getFirestore(app);

export const auth =
  getApps().length === 1
    ? initializeAuth(app, {
        persistence:
          AsyncStorage as any,
      })
    : getAuth(app);

export default app;
