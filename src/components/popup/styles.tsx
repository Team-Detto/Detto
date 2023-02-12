import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

export const PopupWrapper = styled.div<{ popup: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  width: 20.25rem;
  height: 20.375rem; // 5개 높이

  // 쪽지/알림함 위치 조정
  right: ${(props) => (props.popup === 'notification' ? '0' : '72px')};
  top: 3rem;

  background-color: ${COLORS.white};

  border-radius: 8px;
  border: 1px solid ${COLORS.gray200};

  overflow: hidden;
`;

// Message
export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.75rem;
  gap: 0.125rem;

  height: 3.5625rem;

  background: #ffffff;

  border-bottom: 1px solid #e1e5eb;
`;

export const MessageTitleDiv = styled.div<{ isRead: boolean }>`
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

export const MessageDateDiv = styled.div`
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 0.625rem;
  line-height: 140%;

  display: flex;
  align-items: center;

  color: ${COLORS.gray800};
`;
