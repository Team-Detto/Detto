import { amplitudeToNoneButtonClick } from 'utils/amplitude';
import { firestore } from 'apis/firebaseService';
import { updateDoc, doc } from 'firebase/firestore';
import { getUserInfoData } from 'apis/mypageUsers';
import { staleTime } from 'utils/staleTime';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useAuth, useGlobalModal } from 'hooks';

const [INBOX, OUTBOX] = ['inbox', 'outbox'];

const useNoteMessage = (type: string, data: Note) => {
  const user = useAuth();
  const { openModalWithData } = useGlobalModal();

  // 받은 쪽지함은 보낸 사람 닉네임을 표시, 보낸 쪽지함은 받는 사람 닉네임을 표시
  const { data: displayUser } = useQuery({
    queryKey: ['users', type === 'inbox' ? data.senderUid : data.receiverUid],
    queryFn: getUserInfoData,
    staleTime: staleTime.user,
  });

  // 메시지 읽음 처리
  const updateReadStatus = async () => {
    if (!data.isRead) {
      await updateDoc(doc(firestore, 'notes', data.id), { isRead: true });
    }
  };

  const queryClient = useQueryClient();
  const { mutate: mutateReadStatus } = useMutation(updateReadStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['inbox', user.uid]);
    },
  });

  const handleTitleClick = () => {
    if (type === INBOX) {
      // 받은 메세지함에서 메세지 클릭 시 읽음 처리
      if (!data.isRead) mutateReadStatus();
      openModalWithData('inbox', data);
      amplitudeToNoneButtonClick('read_inbox_note');
    }
    if (type === OUTBOX) {
      openModalWithData('outbox', data);
      amplitudeToNoneButtonClick('read_outbox_note');
    }
  };

  return { handleTitleClick, displayUser };
};

export default useNoteMessage;
