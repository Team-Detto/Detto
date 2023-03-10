import { amplitudeToNoneButtonClick } from 'utils/amplitude';
import { updateDoc, doc } from 'firebase/firestore';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useAuth } from 'hooks';
import { useNavigate } from 'react-router-dom';
import { firestore } from 'apis/firebaseService';

const useNotificationMessage = (data: Notification) => {
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

  const handleTitleClick = () => {
    // 읽지 않은 알림 클릭 시 읽음 처리
    if (!data.isRead) {
      mutateReadStatus();
      amplitudeToNoneButtonClick('read_notification');
    }
    // 알림 클릭 시 해당 페이지로 이동
    if (!data.link) return;
    amplitudeToNoneButtonClick('notification_link');
    if (data.link.type === 'project') {
      return navigate(`/project/${data.link.id}`);
    }
    if (data.link.type === 'profile') {
      return navigate(`/profile/${data.link.id}`);
    }
  };

  return { handleTitleClick };
};

export default useNotificationMessage;
