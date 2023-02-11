import { MessageContainer, MessageDateDiv, MessageTitleDiv } from './styles';

type MessageProps = {
  title: string;
  date: string;
  isRead: boolean;
  displayName: string;
};

export default function NoteMessage({
  title,
  date,
  isRead,
  displayName,
}: MessageProps) {
  return (
    <MessageContainer>
      <MessageTitleDiv isRead={isRead}>{title}</MessageTitleDiv>
      <MessageDateDiv>
        {displayName} | {date}
      </MessageDateDiv>
    </MessageContainer>
  );
}
