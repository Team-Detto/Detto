import { firestore } from 'apis/firebaseService';
import { addDoc, collection } from 'firebase/firestore';
import { WriteFormValueType } from 'hooks/useWrite';

export const firebaseCreateProjectRequest = async (
  formData: WriteFormValueType,
) => {
  await addDoc(collection(firestore, 'post'), {
    ...formData,
    startDate: new Date(formData.startDate).getTime(),
    endDate: new Date(formData.endDate).getTime(),
    deadline: new Date(formData.deadline).getTime(),
    view: 0,
    like: 0,
    createdAt: Date.now(),
    isRecruiting: false,
    isClosed: false,
  });
};
