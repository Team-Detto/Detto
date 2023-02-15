import { firestore } from 'apis/firebaseService';
import { doc, updateDoc } from 'firebase/firestore';
import { getUserInfoData } from 'apis/mypageUsers';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from 'hooks';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';

const useNote = (receiverUid: string) => {
  const [note, setNote] = useState({
    title: '',
    content: '',
  });

  const sender = useAuth();
  const { data: receiver } = useQuery({
    queryKey: ['user', receiverUid],
    queryFn: getUserInfoData,
  });

  /**
   * @description 쪽지를 보낼 때, inbox, outbox에 각각 쪽지를 저장하는 함수
   * @returns Promise<[]>
   */
  const updateNoteCollection = () => {
    if (!receiver) return;
    const noteId = uuid();
    const date = Date.now();

    return Promise.all([
      updateDoc(doc(firestore, `inbox/${receiver.uid}`), {
        [noteId]: {
          uid: sender.uid,
          displayName: receiver.displayName,
          photoURL: receiver.photoURL,
          date,
          title: note.title,
          content: note.content,
          isRead: false,
        },
      }),
      updateDoc(doc(firestore, `outbox/${sender.uid}`), {
        [noteId]: {
          uid: receiver.uid,
          displayName: sender.displayName,
          photoURL: sender.photoURL,
          date,
          title: note.title,
          content: note.content,
          isRead: false,
        },
      }),
    ]);
  };

  return { updateNoteCollection, receiver, note, setNote };
};

export default useNote;
