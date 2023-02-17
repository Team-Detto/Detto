import { getDateAndTime } from 'utils/date';
import { MessageContainer, MessageDateDiv, MessageTitleDiv } from './styles';

export default function NotificationMessage({ data }: any) {
  return (
    <MessageContainer>
      <MessageTitleDiv isRead={data.isRead} disabled>
        {data.title}
      </MessageTitleDiv>
      <MessageDateDiv>{getDateAndTime(data.date)}</MessageDateDiv>
    </MessageContainer>
  );
}
