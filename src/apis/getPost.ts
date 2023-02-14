import { getDoc, doc } from 'firebase/firestore';
import { firestore } from 'apis/firebaseService';

// 프로젝트 상세 조회
export const viewProject = async (params: any) => {
  const docRef = doc(firestore, 'post', params.id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

// user 정보 조회
export const findUser = async (uid: string) => {
  const docRef = doc(firestore, 'user', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
