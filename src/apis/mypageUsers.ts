import { firestore } from './firebaseService';
import { doc, getDoc } from 'firebase/firestore';

// 유저 프로필 기본정보 조회
export const getUserInfoData = async (params: any) => {
  const [_, uid] = params.queryKey;

  const docRef = doc(firestore, 'user', `${uid}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
};
