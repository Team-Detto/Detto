import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

export const MobilePopupWrapper = styled.div<{ popup: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  width: 20.25rem;
  height: 20.375rem; // 5개 높이 (하나에 3.5rem + 타이틀 2.5rem)

  top: 3rem;
  right: 23px;

  background-color: ${COLORS.white};
  border-radius: 8px;

  filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.2));

  overflow: hidden;
`;
