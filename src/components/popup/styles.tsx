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
