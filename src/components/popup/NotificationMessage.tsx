import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firestore } from 'apis/firebaseService';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { getDateAndTime } from 'utils/date';
import { MessageContainer, MessageDateDiv, MessageTitleDiv } from './styles';

export default function NotificationMessage({ data }: { data: Notification }) {
  const navigate = useNavigate();
  const user = useAuth();
  const queryClient = useQueryClient();

  // 알림 읽음 처리
  const updateReadStatus = async () => {
    if (!data.isRead) {
      await updateDoc(doc(firestore, 'notifications', data.id), {
        isRead: true,
      });
    }
  };

  const { mutate: mutateReadStatus } = useMutation(updateReadStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications', user.uid]);
    },
  });

  const handleTitleClick = (link: Pick<Notification, 'link'>['link']) => {
    // 읽지 않은 알림 클릭 시 읽음 처리
    if (!data.isRead) {
      mutateReadStatus();
    }
    // 알림 클릭 시 해당 페이지로 이동
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
