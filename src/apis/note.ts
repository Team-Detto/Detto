import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from 'apis/firebaseService';

// 받은 쪽지함 목록 조회
export const getInboxNotes = async () => {
  const q = query(collection(firestore, 'inbox'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// 보낸 쪽지함 목록 조회
export const getOutboxNotes = async () => {
  const q = query(collection(firestore, 'outbox'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
