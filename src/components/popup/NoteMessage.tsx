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

  const handleTitleClick = () => {
    if (type === INBOX) openModalWithData('inbox', data);
    if (type === OUTBOX) openModalWithData('outbox', data);
  };

  return (
    <MessageContainer>
      <MessageTitleDiv isRead={data.isRead} onClick={handleTitleClick}>
        {data.title}
      </MessageTitleDiv>
      <MessageDateDiv>
        {data.senderDisplayName} | {getDateAndTime(data.date)}
      </MessageDateDiv>
    </MessageContainer>
  );
}
