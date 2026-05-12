import {
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore';

import { db } from '@/services/firebase-config';

export async function createUserProfile(
  uid: string,
  data: any
) {
  try {
    await setDoc(
      doc(db, 'users', uid),
      data
    );

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
}

export async function getUserProfile(
  uid: string
) {
  try {
    const snapshot = await getDoc(
      doc(db, 'users', uid)
    );

    if (!snapshot.exists()) {
      return null;
    }

    return snapshot.data();
  } catch (error) {
    console.log(error);

    return null;
  }
}