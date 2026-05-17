import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from 'firebase/firestore';

import { db } from '@/services/firebase-config';

export async function addFavorite(
  userId: string,
  eventId: string
) {
  try {
    await addDoc(
      collection(db, 'favorites'),
      {
        userId,
        eventId,
      }
    );

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
}

export async function getFavorites(
  userId: string
) {
  try {
    const q = query(
      collection(db, 'favorites'),
      where('userId', '==', userId)
    );

    const snapshot =
      await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.log(error);

    return [];
  }
}

export async function removeFavorite(
  favoriteId: string
) {
  try {
    await deleteDoc(
      doc(
        db,
        'favorites',
        favoriteId
      )
    );

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
}