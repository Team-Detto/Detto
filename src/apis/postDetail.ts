import { firestore } from 'apis/firebaseService';
import {
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  FieldValue,
  deleteDoc,
} from 'firebase/firestore';

// 프로젝트 상세 조회
export const viewProject = async (pid: any) => {
  const postDocRef = doc(firestore, 'post', pid);
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
  const docRef = doc(firestore, 'myprojects', uid);
  if (isLiked === true) {
    await updateDoc(docRef, { likedProjects: arrayUnion(pid) });
  } else if (isLiked === false) {
    await updateDoc(docRef, { likedProjects: arrayRemove(pid) });
  }
};
export const updateApplicants = async (
  pid: string,
  uid: string,
  displayName: string,
  profileURL: string,
  skills: any,
  position: string,
  motive: string,
  recruit?: boolean,
) => {
  // const applicants = {
  //   displayName: displayName,
  //   profileURL: profileURL,
  //   skills: skills,
  //   position: position,
  //   motive: motive,
  // };
  console.log('skills', skills);
  const docRef = doc(firestore, 'post', pid);
  // await setDoc(docRef, { applicants }, { merge: true });
  await setDoc(
    docRef,
    {
      applicants: {
        [uid]: {
          uid: uid,
          displayName: displayName,
          profileURL: profileURL,
          skills: skills,
          position: position,
          motive: motive,
          recruit: recruit,
        },
      },
    },
    { merge: true },
  );
};

export const updateParticipants = async (
  pid: string,
  uid: string,
  recruit?: boolean,
) => {
  const docRef = doc(firestore, 'post', pid);
  await setDoc(
    docRef,
    {
      applicants: {
        [uid]: {
          recruit: recruit,
        },
      },
    },
    { merge: true },
  );
};

export const deleteProject = async (pid: string) => {
  const docRef = doc(firestore, 'post', pid);
  await deleteDoc(docRef);
};
