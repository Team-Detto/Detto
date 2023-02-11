import { MessageContainer, MessageDateDiv, MessageTitleDiv } from './styles';

type MessageProps = {
  title: string;
  date: string;
  isRead: boolean;
};

export default function NotificationMessage({
  title,
  date,
  isRead,
}: MessageProps) {
  return (
    <MessageContainer>
      <MessageTitleDiv isRead={isRead}>{title}</MessageTitleDiv>
      <MessageDateDiv>{date}</MessageDateDiv>
    </MessageContainer>
  );
}
