import { firestore } from 'apis/firebaseService';
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { WriteType } from 'types/write/writeType';

export const firebaseCreateProjectRequest = async (
  formData: WriteType.WriteFormType,
  markdownText: string,
) => {
  await addDoc(collection(firestore, 'post'), {
    ...formData,
    startDate: new Date(formData.startDate).getTime(),
    endDate: new Date(formData.endDate).getTime(),
    deadline: new Date(formData.deadline).getTime(),
    content: markdownText,
    view: 0,
    like: 0,
    createdAt: Date.now(),
    isRecruiting: false,
    isClosed: false,
  });
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
