import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

type MessageProps = {
  title: string;
  date: string;
  isRead: boolean;
};

export default function Message({ title, date, isRead }: MessageProps) {
  return (
    <MessageContainer>
      <MessageTitleDiv isRead={isRead}>{title}</MessageTitleDiv>
      <MessageDateDiv>{date}</MessageDateDiv>
    </MessageContainer>
  );
}

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.75rem;
  gap: 0.125rem;

  height: 3.5625rem;

  background: #ffffff;

  border-bottom: 1px solid #e1e5eb;
`;

const MessageTitleDiv = styled.div<Pick<MessageProps, 'isRead'>>`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: ${(props) => (props.isRead ? '400' : '700')};
  font-size: 0.75rem;
  line-height: 140%;

  display: flex;
  align-items: center;

  color: ${COLORS.gray850};

  cursor: pointer;
`;

const MessageDateDiv = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 0.625rem;
  line-height: 140%;

  display: flex;
  align-items: center;

  color: ${COLORS.gray800};
`;
