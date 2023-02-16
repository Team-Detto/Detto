import { useQuery } from '@tanstack/react-query';
import { getUserInfoData } from 'apis/mypageUsers';
import { useGlobalModal } from 'hooks';
import { getDateAndTime } from 'utils/date';
import { MessageContainer, MessageDateDiv, MessageTitleDiv } from './styles';

interface NoteMessageProps {
  type: string;
  data: Note;
}

const [INBOX, OUTBOX] = ['inbox', 'outbox'];

export default function NoteMessage({ type, data }: NoteMessageProps) {
  const { openModalWithData } = useGlobalModal();

  const { data: sender } = useQuery({
    queryKey: ['user', data.senderUid],
    queryFn: getUserInfoData,
  });

  const handleTitleClick = () => {
    if (type === INBOX) openModalWithData('inbox', data);
    if (type === OUTBOX) openModalWithData('outbox', data);
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
