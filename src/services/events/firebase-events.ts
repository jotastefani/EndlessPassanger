import {
    addDoc,
    collection,
    getDocs,
    type DocumentData,
    type QueryDocumentSnapshot,
} from 'firebase/firestore';

import { db } from '@/services/firebase-config';

import type { Event } from '@/types/event';

const eventFromSnapshot = (
  doc: QueryDocumentSnapshot<DocumentData>,
): Event => {
  const data = doc.data();

  return {
    id: doc.id,
    title: data.title,
    description: data.description,
    image: data.image,
    category: data.category,
    genre: data.genre,
    artist: data.artist,
    ticketLink: data.ticketLink,
    type: data.type,
    latitude: data.latitude,
    longitude: data.longitude,
    date: data.date,
    createdBy: data.createdBy,
    interestedCount: data.interestedCount,
  };
};

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

    const events = snapshot.docs.map(eventFromSnapshot);

    return events;
  } catch (error) {
    console.log(error);

    return [];
  }
}
