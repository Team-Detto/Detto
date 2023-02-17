import { firestore } from 'apis/firebaseService';
import { addDoc, collection } from 'firebase/firestore';
import { useMutation } from '@tanstack/react-query';

const useNotification = () => {
  /**
   * @description Notifications 컬렉션에 알림을 저장하는 함수
   * @returns Promise<void>
   */
  const updateNoteCollection = async ({
    title,
    receiverUid,
  }: {
    title: string;
    receiverUid: string;
  }) => {
    if (title.length === 0 || title.length > 25) {
      console.log('알림 title은 1자 이상 25자 이하로 입력해주세요.');
    }

    const date = Date.now();

    await addDoc(collection(firestore, 'notifications'), {
      uid: receiverUid,
      date,
      title,
      isRead: false,
    });
  };

  const { mutate: sendNotification } = useMutation(updateNoteCollection, {});

  return sendNotification;
};

export default useNotification;
