import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { firestore } from 'apis/firebaseService';

/**
 * uid를 이용해 받은 쪽지 목록 조회
 * @param params useQuery Params
 * @returns 사용자가 받은 쪽지를 시간 내림차순으로 정렬한 배열
 */
export const getInboxNotes = async (params: any) => {
  const [_, uid] = params.queryKey;
  const docRef = collection(firestore, `notes`);
  const q = query(
    docRef,
    where('receiverUid', '==', uid),
    orderBy('date', 'desc'),
  );
  const querySnapshot = await getDocs(q);
  const docs = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return docs;
};

/**
 * uid를 이용해 보낸 쪽지 목록 조회
 * @param params useQuery Params
 * @returns 사용자가 보낸 쪽지를 시간 내림차순으로 정렬한 배열
 */
export const getOutboxNotes = async (params: any) => {
  const [_, uid] = params.queryKey;
  const docRef = collection(firestore, `notes`);
  const q = query(
    docRef,
    where('senderUid', '==', uid),
    orderBy('date', 'desc'),
  );
  const querySnapshot = await getDocs(q);
  const docs = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return docs;
};
