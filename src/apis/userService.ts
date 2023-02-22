import { Dispatch } from 'react';
import { firestore } from './firebaseService';
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  limit,
} from 'firebase/firestore';

/**
 * 파이어베이스 users 컬렉션에서 모든 사용자의 정보를 조회
 * @returns 모든 사용자의 정보를 담은 배열
 */

export const firebaseAllUsersRequest = async () => {
  const q = query(collection(firestore, 'users'), limit(20));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data());
};

// 내 프로젝트 관심 조회
export const firebaseFindMyInterestRequest = async (
  uid: string,
  setLikedProjects: Dispatch<React.SetStateAction<string[]>>,
) => {
  const docRef = doc(firestore, 'myprojects', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setLikedProjects(docSnap.data().likedProjects);
  }
};
