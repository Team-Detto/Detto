import { useIsMobile } from 'hooks';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

interface Props {
  message: string;
  top?: number;
  isCopy?: boolean;
  isCheck?: boolean;
  isMobile?: boolean;
}

const ValidationToastPopup = ({ message, top, isCopy, isCheck }: Props) => {
  const isMobile = useIsMobile();

  return (
    <ValidationToastAlertContainer top={top} isMobile={isMobile}>
      <ValidationToastAlertIcon isMobile={isMobile}>{`${
        isCopy ? '🔗' : isCheck ? '✅' : '❌'
      }`}</ValidationToastAlertIcon>
      <ValidationToastAlertText isMobile={isMobile}>
        {message}
      </ValidationToastAlertText>
    </ValidationToastAlertContainer>
  );
};

const ValidationToastAlertContainer = styled.div<Partial<Props>>`
  width: ${(props) => (props.isMobile ? '90%' : '30%')};
  height: ${(props) => (props.isMobile ? '1.8rem' : '2.5rem')};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0.5rem 0.625rem;
  gap: 0.625rem;
  position: fixed;
  top: ${(props) => (props.top ? `${props.top}rem` : '15%')};
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background: linear-gradient(180deg, #9586ef 0%, #7a67ec 100%);
  filter: drop-shadow(0rem 0rem 0.625rem rgba(0, 0, 0, 0.25));
  backdrop-filter: blur(0.4375rem);
  border-radius: 0.625rem;
  animation: toast 0.5s ease-in-out;
  @keyframes toast {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const ValidationToastAlertIcon = styled.div<Partial<Props>>`
  width: 5%;
  height: ${(props) => (props.isMobile ? '100%' : '')};
  display: ${(props) => (props.isMobile ? 'flex' : 'none')};
  text-align: center;
  align-items: center;
`;

const ValidationToastAlertText = styled.p<Partial<Props>>`
  width: 95%;
  height: 100%;
  font-weight: 500;
  font-size: ${(props) => (props.isMobile ? '0.7rem' : '0.8rem')};
  line-height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${COLORS.white};
`;

export default ValidationToastPopup;
