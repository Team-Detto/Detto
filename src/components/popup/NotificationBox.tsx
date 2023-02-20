import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { getNotifications } from 'apis/notifications';
import COLORS from 'assets/styles/colors';
import { useAuth, usePopup } from 'hooks';
import { useEffect, useState } from 'react';
import { staleTime } from 'utils/staleTime';
import NotificationMessage from './NotificationMessage';
import { PopupWrapper } from './styles';

export default function NotificationBox() {
  const {
    popup: { isNotificationOpen },
  } = usePopup();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const { uid } = useAuth();
  const { data: notifications }: any = useQuery({
    queryKey: ['notifications', uid],
    queryFn: getNotifications,
    enabled: !!uid,
    staleTime: staleTime.notifications,
  });

  useEffect(() => {
    if (notifications) {
      setUnreadCount(notifications.filter((data: any) => !data.isRead).length);
    }
  }, [notifications]);

  if (!isNotificationOpen) return null;
  return (
    // 팝업창 이외의 영역 클릭 시 팝업창 닫기. 팝업창 클릭 시 이벤트 propagation 막기
    <PopupWrapper popup="notification" onClick={(e) => e.stopPropagation()}>
      <TitleWrapper>
        읽지 않은 알림
        <MessageCountSpan>
          {unreadCount > 0 && `(${unreadCount})`}
        </MessageCountSpan>
      </TitleWrapper>
      <MessageWrapper>
        {notifications?.length === 0 ? (
          <NoDataText>🔔 아직 받은 알림이 없어요</NoDataText>
        ) : (
          notifications?.map((data: any) => (
            <NotificationMessage key={data.id} data={data} />
          ))
        )}
      </MessageWrapper>
    </PopupWrapper>
  );
}

const TitleWrapper = styled.div`
  width: 100%;
  height: 2.5625rem;

  font-size: 0.75rem;
  font-weight: 700;

  display: flex;
  flex-direction: row;
  align-items: flex-start;

  padding: 0.75rem;
  gap: 0.125rem;

  background-color: ${COLORS.violetB400};
  color: ${COLORS.white};
`;

const MessageCountSpan = styled.span`
  color: ${COLORS.violetB100};
`;

const MessageWrapper = styled.div`
  flex: 1;

  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const NoDataText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  font-weight: 400;
  font-size: 0.75rem;
  line-height: 140%;

  color: ${COLORS.gray850};
`;
