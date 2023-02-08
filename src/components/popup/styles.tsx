import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

export const PopupWrapper = styled.div<{ popup: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;

  position: absolute;
  width: 20.25rem;
  height: 13.25rem;
  // 쪽지/알림함 위치 조정
  right: ${(props) =>
    props.popup === 'notification' ? '2.625rem' : '7.125rem'};
  top: 80px;
  background-color: ${COLORS.white};

  border-radius: 8px;
  border: 1px solid ${COLORS.gray200};

  overflow: hidden;
`;
