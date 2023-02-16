import { firestore } from 'apis/firebaseService';
import { addDoc, collection } from 'firebase/firestore';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useNotification = (receiverUid: string) => {
  /**
   * @description Notifications 컬렉션에 알림을 저장하는 함수
   * @returns Promise<void>
   */
  const updateNoteCollection = async ({
    title,
  }: {
    title: string;
    receiverUid: string;
  }) => {
    const date = Date.now();

    await addDoc(collection(firestore, 'notifications'), {
      uid: receiverUid,
      date,
      title,
      isRead: false,
    });
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation(updateNoteCollection, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications', receiverUid]);
    },
  });

  return { sendNotification: mutate };
};

export default useNotification;
