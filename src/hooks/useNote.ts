import { firestore } from 'apis/firebaseService';
import { addDoc, collection, getDoc, doc } from 'firebase/firestore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth, useToastPopup } from 'hooks';

const useNote = () => {
  const sender = useAuth();
  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();

  /**
   * @description messages 컬렉션에 쪽지를 저장하는 함수
   * @returns Promise<void>
   */
  const updateNoteCollection = async ({
    note,
    receiverUid,
  }: {
    note: SendNote;
    receiverUid: string;
  }) => {
    const data = await getDoc(doc(firestore, 'users', receiverUid));
    if (!data.exists()) throw new Error('존재하지 않는 사용자입니다.');
    const receiver = data.data();
    await addDoc(collection(firestore, 'notes'), {
      senderUid: sender.uid,
      receiverUid: receiver.uid,
      date: Date.now(),
      title: note.title,
      content: note.content,
      isRead: false,
    });
  };

  const queryClient = useQueryClient();
  const { mutate: sendNote } = useMutation(updateNoteCollection, {
    onSuccess: () => queryClient.invalidateQueries(['outbox', sender.uid]),
  });

  // 쪽지 유효성 검사
  const checkNoteValidation = (note: any) => {
    if (!note.title || !note.content) {
      handleToastPopup('제목은 2자 이상, 내용은 5자 이상 입력해주세요.');
      return false;
    }
    if (note.title.length < 2 || note.content.length < 5) {
      handleToastPopup('제목은 2자 이상, 내용은 5자 이상 입력해주세요.');
      return false;
    }
    if (note.title.length > 30 || note.content.length > 500) {
      handleToastPopup('제목은 30자 이하, 내용은 500자 이하 입력해주세요.');
      return false;
    }
    return true;
  };

  return {
    sendNote,
    checkNoteValidation,
    showToast,
    ToastMessage,
    handleToastPopup,
  };
};

export default useNote;
