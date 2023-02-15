import { doc, getDoc } from 'firebase/firestore';
import { firestore } from 'apis/firebaseService';

/**
 * uid를 이용해 받은 쪽지함 목록 조회
 * @param params useQuery Params
 * @returns 사용자의 받은 쪽지함 배열
 */
export const getInboxNotes = async (params: any) => {
  const [_, uid] = params.queryKey;
  const docSnap = await getDoc(doc(firestore, `inbox/${uid}`));
  if (!docSnap.exists()) return null;
  return Object.values(docSnap.data());
};

/**
 * uid를 이용해 보낸 쪽지함 목록 조회
 * @param params useQuery Params
 * @returns 사용자의 보낸 쪽지함 배열
 */
export const getOutboxNotes = async (params: any) => {
  const [_, uid] = params.queryKey;
  const docSnap = await getDoc(doc(firestore, `outbox/${uid}`));
  if (!docSnap.exists()) return undefined;
  return Object.values(docSnap.data());
};
