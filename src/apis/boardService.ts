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
) => {
  try {
    const sumnailUrl = await firebaseImageUploadRequest(image);

    await addDoc(collection(firestore, 'post'), {
      ...formData,
      startDate: new Date(formData.startDate).getTime(),
      endDate: new Date(formData.endDate).getTime(),
      deadline: new Date(formData.deadline).getTime(),
      content: markdownText,
      sumnail: sumnailUrl,
      view: 0,
      like: 0,
      createdAt: Date.now(),
      isRecruiting: false,
      isClosed: false,
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
) => {
  await updateDoc(doc(firestore, 'post', id), {
    ...editFormData,
    startDate: new Date(editFormData.startDate).getTime(),
    endDate: new Date(editFormData.endDate).getTime(),
    deadline: new Date(editFormData.deadline).getTime(),
  });
};

export const firebaseDeleteProjectRequest = async (id: string) => {
  await deleteDoc(doc(firestore, 'post', id));
};
