import { firestore } from 'apis/firebaseService';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { firebaseImageUploadRequest } from './imageService';
import { WriteType } from 'types/write/writeType';

export const firebaseCreateProjectRequest = async (
  formData: WriteType.WriteFormType,
  markdownText: string,
  image: any,
  uid?: string,
) => {
  try {
    const thumbnailUrl = await firebaseImageUploadRequest(image);

    await addDoc(collection(firestore, 'post'), {
      ...formData,
      startDate: new Date(formData.startDate).getTime(),
      endDate: new Date(formData.endDate).getTime(),
      deadline: new Date(formData.deadline).getTime(),
      content: markdownText,
      thumbnail: thumbnailUrl,
      view: 0,
      like: 0,
      createdAt: Date.now(),
      isRecruiting: true,
      applicants: {},
      uid,
    });
  } catch (e) {
    console.error(e);
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
      deadline: new Date(editFormData.deadline).getTime(),
    });
  } catch (e) {
    console.error(e);
  }
};

// firebase post 데이터 삭제
export const firebaseDeleteProjectRequest = async (id: string) => {
  await deleteDoc(doc(firestore, 'post', id));
};
