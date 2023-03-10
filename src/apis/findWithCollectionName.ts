import { getDoc, doc } from 'firebase/firestore';
import { firestore } from './firebaseService';

// 단일 정보 조회
export const findWithCollectionName = async (
  collectionName?: any,
  pid?: string, //프로젝트 id
) => {
  if (pid === undefined) return null;
  else {
    const docRef = doc(firestore, collectionName, pid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  }
};
