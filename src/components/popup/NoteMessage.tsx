import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { firestore } from 'apis/firebaseService';
import { getUserInfoData } from 'apis/mypageUsers';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth, useGlobalModal } from 'hooks';
import { amplitudeToNoneButtonClick } from 'utils/amplitude';
import { getDateAndTime } from 'utils/date';
import { staleTime } from 'utils/staleTime';
import { MessageContainer, MessageDateDiv, MessageTitleDiv } from './styles';

interface NoteMessageProps {
  type: string;
  data: Note;
}

const [INBOX, OUTBOX] = ['inbox', 'outbox'];

export default function NoteMessage({ type, data }: NoteMessageProps) {
  const user = useAuth();
  const { openModalWithData } = useGlobalModal();

  // sender의 프로필 정보
  const { data: sender } = useQuery({
    queryKey: ['users', data.senderUid],
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

  if (!sender) return null;
  return (
    <MessageContainer>
      <MessageTitleDiv isRead={data.isRead} onClick={handleTitleClick}>
        {data.title}
      </MessageTitleDiv>
      <MessageDateDiv>
        {sender.displayName} | {getDateAndTime(data.date)}
      </MessageDateDiv>
    </MessageContainer>
  );
}
