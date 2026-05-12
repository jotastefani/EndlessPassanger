import {
    addDoc,
    collection,
    getDocs,
} from 'firebase/firestore';

import { db } from '@/services/firebase-config';

export async function createEvent(
  eventData: any
) {
  try {
    const docRef =
      await addDoc(
        collection(db, 'events'),
        eventData
      );

    return docRef.id;
  } catch (error) {
    console.log(error);

    return null;
  }
}

export async function getEvents() {
  try {
    const snapshot =
      await getDocs(
        collection(db, 'events')
      );

    const events =
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

    return events;
  } catch (error) {
    console.log(error);

    return [];
  }
}