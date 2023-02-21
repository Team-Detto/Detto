import { firestore } from 'apis/firebaseService';
import {
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  deleteDoc,
} from 'firebase/firestore';

// 프로젝트 상세 조회
export const viewProject = async (pid: any) => {
  const postDocRef = doc(firestore, 'post', pid);
  const docSnap = await getDoc(postDocRef);
  return docSnap.data();
};

//좋아요 수 업데이트
export const updateLike = async (pid: any, countLike: number) => {
  if (pid === undefined) return;
  const docRef = doc(firestore, 'post', pid);
  await updateDoc(docRef, { like: countLike });
};

export const updateViews = async (pid: any, countViews: number) => {
  if (pid === undefined) return;
  const docRef = doc(firestore, 'post', pid);
  await updateDoc(docRef, { view: countViews });
};

// 좋아요한 프로젝트 업데이트
export const updateMyProject = async (
  uid: string,
  pid: string,
  isLiked: boolean,
) => {
  if (!uid) return;
  const docRef = doc(firestore, 'myprojects', uid);
  if (isLiked === true) {
    await updateDoc(docRef, { likedProjects: arrayUnion(pid) });
  } else if (isLiked === false) {
    await updateDoc(docRef, { likedProjects: arrayRemove(pid) });
  }
};

//프로젝트 지원, 초대 완료 시 업데이트
export const updateAppliedProject = async (
  uid: string,
  pid: string,
  recruited: boolean,
) => {
  const docRef = doc(firestore, 'myprojects', uid);
  await setDoc(
    docRef,
    {
      appliedProjects: { [pid]: { recruited: recruited } },
    },
    { merge: true },
  );
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
  const docRef = doc(firestore, 'post', pid);
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

//프로젝트 삭제
export const deleteProject = async (pid: string) => {
  const docRef = doc(firestore, 'post', pid);
  await deleteDoc(docRef);
};

//모집중, 모집마감 업데이트
export const updateRecruiting = async (pid: string, isRecruiting: any) => {
  if (pid === undefined) return;
  const docRef = doc(firestore, 'post', pid);
  await updateDoc(docRef, { isRecruiting: isRecruiting });
};

// 지원 여부 확인
export const firebaseGetIsApplicantRequest = async (pid: any, uid: string) => {
  const postDocRef = doc(firestore, 'post', pid);
  const docSnap = await getDoc(postDocRef);
  const applicants = docSnap.data()?.applicants;

  if (applicants?.[uid]?.recruit === false) {
    //지원자 중 초대된 사람까지 제외
    return applicants[uid] ? true : false;
  } else {
    return false;
  }
};

//지원 취소 시 지원자 목록에서 삭제
export const deleteApplicant = async (pid: string, uid: string) => {
  const docRef = doc(firestore, 'post', pid);
  await setDoc(
    docRef,
    {
      applicants: { [uid]: {} },
    },
    { merge: true },
  );
};
