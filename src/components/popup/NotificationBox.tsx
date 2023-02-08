import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import usePopup from 'hooks/usePopup';
import Message from './Message';
import { PopupWrapper } from './styles';

export default function NotificationBox() {
  const {
    notificationBoxOpen,
    // setNotificationBoxOpen
  } = usePopup();

  return (
    <>
      {notificationBoxOpen && (
        <PopupWrapper popup="notification">
          <TitleWrapper>
            읽지 않은 알림 <MessageCountSpan>(3)</MessageCountSpan>
          </TitleWrapper>
          <MessageWrapper>
            {messages.map((message, index) => (
              <Message
                key={index}
                title={message.title}
                date={message.date}
                isRead={message.isRead}
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

const messages = [
  {
    title: '{프로젝트 이름}의 지원이 완료되었어요! ',
    date: '2021.10.10 10:10',
    isRead: false,
  },
  {
    title: '[프론트앤드 팀원 모집] 이 프로젝트는 어때요?',
    date: '2021.10.10 10:10',
    isRead: false,
  },
  {
    title: '{닉네임}님이 지원하신 {프로젝트 이름}이 마감되었어요',
    date: '2021.10.10 10:10',
    isRead: true,
  },
  {
    title: '{프로젝트 이름}의 지원이 완료되었어요! ',
    date: '2021.10.10 10:10',
    isRead: false,
  },
  {
    title: '[프론트앤드 팀원 모집] 이 프로젝트는 어때요?',
    date: '2021.10.10 10:10',
    isRead: true,
  },
  {
    title: '{닉네임}님이 지원하신 {프로젝트 이름}이 마감되었어요',
    date: '2021.10.10 10:10',
    isRead: true,
  },
];
