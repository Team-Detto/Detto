import { firestorage, firestore } from './firebaseService';
import {
  collection,
  doc,
  getDoc,
  query,
  updateDoc,
  getDocs,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';

// 유저 프로필 기본정보 조회
export const getUserInfoData = async (params: any) => {
  const [_, uid] = params.queryKey;

  const docRef = doc(firestore, 'users', `${uid}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
};

/**
 * 스토리지에 프로필 파일 업로드 후 이미지 url을 반환받는 함수
 * @param file : 선택해서 올린 파일 객체 (ex. e.target.files[0])
 * @param uid : 유저 uid
 * @returns imgUrl : 스토리지에 업로드된 이미지 객체 Promise
 */
export const uploadProfileImg = async (file: any, uid: string) => {
  await uploadBytes(ref(firestorage, `${uid}.jpg`), file);

  const imgUrl = await getDownloadURL(ref(firestorage, `${uid}.jpg`));
  return imgUrl;
};

/**
 * 스토리지의 유저 프로필 파일 삭제
 * @param uid : 유저 uid
 */
export const deleteProfileImg = async (uid: string) => {
  const deleteRef = ref(firestorage, `${uid}.jpg`);
  deleteObject(deleteRef)
    // TODO :: 삭제 성공 시
    .catch((error) =>
      // TODO :: 삭제 실패 시 에러 페이지 이동
      console.log('delete fail', error),
    );
};

/**
 * 유저 프로필 업데이트
 * @param uid : 유저 uid
 * @param userInfo : 수정한 유저 정보 객체
 */
export const updateUserInfoData = async (uid: string, userInfo: UserInfo) => {
  try {
    await updateDoc(doc(firestore, 'users', `${uid}`), {
      ...userInfo,
    });
  } catch (error) {
    // TODO:: 에러 페이지 이동
    console.log('update fail', error);
  }
};

// 유저의 프로젝트 리스트 조회
export const getUserProjectList = async (params: any) => {
  const [_, uid] = params.queryKey;

  const docRef = doc(firestore, 'myprojects', `${uid}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
};

export const getProjectIdList = async () => {
  const docRef = collection(firestore, `post`);
  const q = query(docRef);
  const querySnapshot = await getDocs(q);
  const docs = querySnapshot.docs.map((doc) => doc.id);
  return docs;
};
