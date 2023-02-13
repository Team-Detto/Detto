import { useGlobalModal } from 'hooks';
import { MessageContainer, MessageDateDiv, MessageTitleDiv } from './styles';

interface NoteMessageProps {
  type: string;
  data: Note;
}

const [INBOX, OUTBOX] = ['inbox', 'outbox'];

export default function NoteMessage({ type, data }: NoteMessageProps) {
  const { title, date, isRead, displayName } = data;

  const { openModalWithData } = useGlobalModal();

  const handleTitleClick = () => {
    if (type === INBOX) openModalWithData('inbox', data);
    if (type === OUTBOX) openModalWithData('outbox', data);
  };

  return (
    <MessageContainer>
      <MessageTitleDiv isRead={isRead} onClick={handleTitleClick}>
        {title}
      </MessageTitleDiv>
      <MessageDateDiv>
        {displayName} | {date}
      </MessageDateDiv>
    </MessageContainer>
  );
}
