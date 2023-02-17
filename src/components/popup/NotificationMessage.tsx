import { useMutation, useQueryClient } from '@tanstack/react-query';
import { firestore } from 'apis/firebaseService';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuth } from 'hooks';
import { getDateAndTime } from 'utils/date';
import { MessageContainer, MessageDateDiv, MessageTitleDiv } from './styles';

export default function NotificationMessage({ data }: any) {
  const user = useAuth();

  // 알림 읽음 처리
  const updateReadStatus = async () => {
    if (!data.isRead) {
      await updateDoc(doc(firestore, 'notifications', data.id), {
        isRead: true,
      });
    }
  };

  const queryClient = useQueryClient();
  const { mutate: mutateReadStatus } = useMutation(updateReadStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications', user.uid]);
    },
  });

  const handleTitleClick = () => {
    if (!data.isRead) {
      mutateReadStatus();
    }
  };

  return (
    <MessageContainer>
      <MessageTitleDiv isRead={data.isRead} disabled>
        {data.title}
      </MessageTitleDiv>
      <MessageDateDiv>{getDateAndTime(data.date)}</MessageDateDiv>
    </MessageContainer>
  );
}
