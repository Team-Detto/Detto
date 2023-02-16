import { Dispatch } from 'react';
import { firestore } from './firebaseService';
import { doc, getDoc } from 'firebase/firestore';

// // 내 프로젝트 관심 조회
export const firebaseFindMyInterestRequset = async (
  uid: string,
  setLikedProjects: Dispatch<React.SetStateAction<string[]>>,
) => {
  const docRef = doc(firestore, 'myprojects', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    setLikedProjects(docSnap.data().likedProjects);
  }
};
