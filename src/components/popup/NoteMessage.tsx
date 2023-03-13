import useNoteMessage from 'hooks/useNoteMessage';
import { getDateAndTime } from 'utils/date';
import { MessageContainer, MessageDateDiv, MessageTitleDiv } from './styles';

interface NoteMessageProps {
  type: string;
  data: Note;
}

const NoteMessage = ({ type, data }: NoteMessageProps) => {
  const { handleTitleClick, displayUser } = useNoteMessage(type, data);

  if (!displayUser) return null;
  return (
    <MessageContainer>
      <MessageTitleDiv isRead={data.isRead} onClick={handleTitleClick}>
        {data.title}
      </MessageTitleDiv>
      <MessageDateDiv>
        {displayUser.displayName} | {getDateAndTime(data.date)}
      </MessageDateDiv>
    </MessageContainer>
  );
};

export default NoteMessage;
