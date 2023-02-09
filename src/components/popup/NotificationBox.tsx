import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { getNotifications } from 'apis/notification';
import COLORS from 'assets/styles/colors';
import usePopup from 'hooks/usePopup';
import { getDate } from 'utils/date';
import Message from './Message';
import { PopupWrapper } from './styles';

export default function NotificationBox() {
  const {
    popup: { isNotificationOpen },
  } = usePopup();

  const { data: notifications }: any = useQuery({
    queryKey: ['notifications'],
    queryFn: getNotifications,
  });

  return (
    <>
      {isNotificationOpen && (
        <PopupWrapper popup="notification">
          <TitleWrapper>
            읽지 않은 알림
            <MessageCountSpan>
              (
              {notifications
                ? notifications.filter(({ isRead }: any) => !isRead).length
                : 0}
              )
            </MessageCountSpan>
          </TitleWrapper>
          <MessageWrapper>
            {notifications?.map(({ id, title, date, isRead }: any) => (
              <Message
                key={id}
                title={title}
                date={getDate(date)}
                isRead={isRead}
              />
            ))}
          </MessageWrapper>
        </PopupWrapper>
      )}
    </>
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

  background-color: ${COLORS.gray200};
  color: ${COLORS.gray850};
`;

const MessageCountSpan = styled.span`
  color: ${COLORS.violetB500};
`;

const MessageWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;
