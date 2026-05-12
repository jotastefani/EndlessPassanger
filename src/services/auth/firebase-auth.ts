import {
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '@/services/firebase-config';

export async function registerUser(
  email: string,
  password: string
) {
  return await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function loginUser(
  email: string,
  password: string
) {
  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
}

export async function logoutUser() {
  return await firebaseSignOut(auth);
}