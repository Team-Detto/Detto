import { getDoc, doc } from 'firebase/firestore';
import { firestore } from './firebaseService';

// 정보 조회
export const findWithCollectionName = async (
  collectionName: string,
  pid: string, //프로젝트 id
) => {
  const docRef = doc(firestore, collectionName, pid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};
