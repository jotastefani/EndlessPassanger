import {
    addDoc,
    collection,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from 'firebase/firestore';

import { db } from '@/services/firebase-config';

export async function sendMessage(
  chatId: string,
  userId: string,
  text: string
) {
  try {
    await addDoc(
      collection(
        db,
        'chats',
        chatId,
        'messages'
      ),
      {
        text,

        userId,

        createdAt:
          serverTimestamp(),
      }
    );

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
}

export function listenMessages(
  chatId: string,
  callback: any
) {
  const q = query(
    collection(
      db,
      'chats',
      chatId,
      'messages'
    ),

    orderBy(
      'createdAt',
      'asc'
    )
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const messages =
        snapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );

      callback(messages);
    }
  );
}