import { useNavigate } from 'react-router-dom';
import { getDateAndTime } from 'utils/date';
import { MessageContainer, MessageDateDiv, MessageTitleDiv } from './styles';

export default function NotificationMessage({ data }: { data: Notification }) {
  const navigate = useNavigate();

  const handleTitleClick = (link: Pick<Notification, 'link'>['link']) => {
    if (!link) return;
    if (link.type === 'project') {
      return navigate(`/project/${link.id}`);
    }
    if (link.type === 'profile') {
      return navigate(`/profile/${link.id}`);
    }
  };

  return (
    <MessageContainer>
      <MessageTitleDiv
        isRead={data.isRead}
        disabled={!data.link}
        onClick={() => {
          if (!data.link) return;
          handleTitleClick(data.link);
        }}
      >
        {data.title}
      </MessageTitleDiv>
      <MessageDateDiv>{getDateAndTime(data.date)}</MessageDateDiv>
    </MessageContainer>
  );
}
