import { initializeApp } from 'firebase/app';

import {
    getAuth,
} from 'firebase/auth';

import {
    getFirestore,
} from 'firebase/firestore';

import {
    getStorage,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB6TLAopX3aLNZ9IRj3BWgcV_jLI6joMHY",

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
  initializeApp(firebaseConfig);

export const auth =
  getAuth(app);

export const db =
  getFirestore(app);

export const storage =
  getStorage(app);