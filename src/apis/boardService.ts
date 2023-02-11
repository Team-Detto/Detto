import { firestore } from 'apis/firebaseService';
import { addDoc, collection } from 'firebase/firestore';
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
