import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from 'apis/firebaseService';

export const getNotifications = async () => {
  // TODO: 실시간 알림 받기 (onSnapshot)
  const q = query(collection(firestore, 'notifications'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
