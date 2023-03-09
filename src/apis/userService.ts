import { firestore } from './firebaseService';
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  limit,
  where,
} from 'firebase/firestore';

/**
 * 파이어베이스 users 컬렉션에서 활성화된 사용자의 정보를 조회
 * @returns 활성화된 사용자의 정보를 담은 배열
 */
export const firebaseRandomActiveUsersRequest = async () => {
  const q = query(
    collection(firestore, 'users'),
    where('isActive', '==', true),
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs
    .map((doc) => doc.data())
    .sort(() => Math.random() - 0.5);
};

// 내 프로젝트 관심 조회
export const firebaseFindMyInterestRequest = async (uid: string) => {
  const docRef = doc(firestore, 'myprojects', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().likedProjects;
  }
};
