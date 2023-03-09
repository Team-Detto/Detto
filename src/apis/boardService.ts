import { firestore } from 'apis/firebaseService';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  updateDoc,
  increment,
  getDoc,
} from 'firebase/firestore';
import { firebaseImageUploadRequest } from './imageService';
import { WriteType } from 'types/write/writeType';

export const firebaseCreateProjectRequest = async (
  formData: WriteType.WriteFormType,
  markdownText: string,
  image: any,
  uid: string,
) => {
  try {
    const thumbnailUrl = image ? await firebaseImageUploadRequest(image) : null;

    const postDoc = await addDoc(collection(firestore, 'post'), {
      ...formData,
      startDate: new Date(formData.startDate).getTime(),
      endDate: new Date(formData.endDate).getTime(),
      deadline: new Date(formData.deadline).setHours(23, 59, 59, 999),
      content: markdownText,
      thumbnail: thumbnailUrl,
      view: 0,
      like: 0,
      createdAt: Date.now(),
      isRecruiting: true,
      applicants: {},
      uid,
    });

    await updateDoc(doc(firestore, 'myprojects', uid), {
      postedProjects: arrayUnion(postDoc.id),
    });

    return postDoc.id;
  } catch (e) {
    throw new Error('프로젝트 생성에 실패했습니다.');
  }
};

// firebase post 데이터 가져오기
export const firebaseGetProjectDataRequest = (setProjectData: any) => {
  const q = query(collection(firestore, 'post'), orderBy('createdAt', 'desc'));

  onSnapshot(q, (querySnapshot) => {
    const data: any = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data(), id: doc.id });
    });
    setProjectData(data);
  });
};

export const firebaseInfinityScrollProjectDataRequest = async ({
  pageParam = null,
}) => {
  let q;
  if (pageParam) {
    q = query(
      collection(firestore, 'post'),
      orderBy('createdAt', 'desc'),
      limit(9),
      startAfter(pageParam),
    );
  } else {
    q = query(
      collection(firestore, 'post'),
      orderBy('createdAt', 'desc'),
      limit(15),
    );
  }

  const querySnapshot = await getDocs(q);
  const data: any = [];
  querySnapshot.forEach((doc) => {
    data.push({ ...doc.data(), id: doc.id });
  });

  return data;
};

export const firebaseEditProjectRequest = async (
  id: string,
  editFormData: any,
  markdownText: string,
  image: any,
) => {
  try {
    const thumbnailUrl = await firebaseImageUploadRequest(image);
    await updateDoc(doc(firestore, 'post', id), {
      ...editFormData,
      content: markdownText,
      thumbnail: thumbnailUrl === null ? editFormData.thumbnail : thumbnailUrl,
      startDate: new Date(editFormData.startDate).getTime(),
      endDate: new Date(editFormData.endDate).getTime(),
      deadline: new Date(editFormData.deadline).setHours(23, 59),
    });
  } catch (e) {
    throw new Error('프로젝트 수정에 실패했습니다.');
  }
};

export const firebaseGetLikedCountRequest = async (id: string) => {
  try {
    const postRef = doc(firestore, 'post', id);
    const snapshot = await getDoc(postRef);
    if (snapshot.exists()) {
      return snapshot.data().like;
    }
  } catch (e) {
    throw new Error('좋아요 수를 가져오는데 실패했습니다.');
  }
};
