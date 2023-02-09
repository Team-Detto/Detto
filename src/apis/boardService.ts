import { firestore } from 'apis/firebaseService';
import { addDoc, collection } from 'firebase/firestore';
import { WriteFormValueType } from 'hooks/useWrite';

export const firebaseCreateProjectRequest = async (
  formData: WriteFormValueType,
) => {
  await addDoc(collection(firestore, 'post'), {
    ...formData,
    view: 0,
    like: 0,
    createdAt: new Date(),
    isRecruiting: false,
    isClosed: false,
  });
};
