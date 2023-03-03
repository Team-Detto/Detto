import useNotificationMessage from 'hooks/useNotificationMessage';
import { getDateAndTime } from 'utils/date';
import { MessageContainer, MessageDateDiv, MessageTitleDiv } from './styles';

export default function NotificationMessage({ data }: { data: Notification }) {
  const { handleTitleClick } = useNotificationMessage(data);

  return (
    <MessageContainer>
      <MessageTitleDiv isRead={data.isRead} onClick={handleTitleClick}>
        {data.title}
      </MessageTitleDiv>
      <MessageDateDiv>{getDateAndTime(data.date)}</MessageDateDiv>
    </MessageContainer>
  );
}
