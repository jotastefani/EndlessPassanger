import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { auth } from '@/services/firebase-config';

export async function registerUser(
  email: string,
  password: string
) {
  try {
    const response =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    return response.user;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function loginUser(
  email: string,
  password: string
) {
  try {
    const response =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    return response.user;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
}