import { firestore } from 'apis/firebaseService';
import { addDoc, collection, getDoc, doc } from 'firebase/firestore';
import { getUserInfoData } from 'apis/mypageUsers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from 'hooks';
import { staleTime } from 'utils/staleTime';

const useNote = (receiverUid: string) => {
  const sender = useAuth();
  const { data: receiver } = useQuery({
    queryKey: ['users', receiverUid],
    queryFn: getUserInfoData,
    staleTime: staleTime.user,
  });

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
    if (!data.exists()) {
      throw new Error('존재하지 않는 사용자입니다.');
    }
    const receiver = data.data();

    const date = Date.now();

    await addDoc(collection(firestore, 'notes'), {
      senderUid: sender.uid,
      receiverUid: receiver.uid,
      date,
      title: note.title,
      content: note.content,
      isRead: false,
    });
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation(updateNoteCollection, {
    onSuccess: () => {
      queryClient.invalidateQueries(['inbox', sender.uid]);
      queryClient.invalidateQueries(['outbox', sender.uid]);
    },
  });

  return { sendNote: mutate, receiver };
};

export default useNote;
