import useNoteMessage from 'hooks/useNoteMessage';
import { getDateAndTime } from 'utils/date';
import { MessageContainer, MessageDateDiv, MessageTitleDiv } from './styles';

interface NoteMessageProps {
  type: string;
  data: Note;
}

export default function NoteMessage({ type, data }: NoteMessageProps) {
  const { handleTitleClick, sender } = useNoteMessage(type, data);

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
