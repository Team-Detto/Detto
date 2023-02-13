import { firestore } from 'apis/firebaseService';
import {
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';

// 프로젝트 상세 조회
export const viewProject = async (params: any) => {
  const postDocRef = doc(firestore, 'post', params.id);
  const docSnap = await getDoc(postDocRef);
  return docSnap.data();
};

// 정보 조회
export const findWithCollectionName = async (
  collectionName: string,
  uid: string,
) => {
  const docRef = doc(firestore, collectionName, uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

//좋아요 수 업데이트
export const updateLike = async (pid: any, countLike: number) => {
  const docRef = doc(firestore, 'post', pid);
  await updateDoc(docRef, { like: countLike });
};

// 좋아요한 프로젝트 업데이트
export const updateMyProject = async (
  uid: string,
  pid: string,
  isLiked: boolean | undefined,
) => {
  const docRef = doc(firestore, 'myproject', uid);
  if (isLiked === true) {
    await updateDoc(docRef, { likedProjects: arrayUnion(pid) });
  } else if (isLiked === false) {
    await updateDoc(docRef, { likedProjects: arrayRemove(pid) });
  }
};
