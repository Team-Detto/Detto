import styled from '@emotion/styled';

interface Props {
  message: string;
  top?: number;
}

const ValidationToastPopup = ({ message, top }: Props) => {
  return (
    <ValidationToastAlertContainer top={top}>
      <ValidationToastAlertIcon>❌</ValidationToastAlertIcon>
      <ValidationToastAlertText>{message}</ValidationToastAlertText>
    </ValidationToastAlertContainer>
  );
};

const ValidationToastAlertContainer = styled.div<Partial<Props>>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0.25rem 1rem;
  gap: 0.625rem;

  width: 23rem;
  height: 2rem;

  position: fixed;

  top: ${(props) => (props.top ? `${props.top}rem` : '15%')};
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  background: radial-gradient(
    141.01% 171.08% at -9.84% -9.71%,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0) 100%
  );

  background-color: #6f64f2;

  filter: drop-shadow(0rem 0rem 0.625rem rgba(0, 0, 0, 0.25));
  backdrop-filter: blur(0.4375rem);

  border-radius: 0.5rem;

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
const ValidationToastAlertIcon = styled.div`
  width: 5%;
`;
const ValidationToastAlertText = styled.p`
  width: 95%;
  height: 100%;

  font-weight: 400;
  font-size: 0.875rem;
  line-height: 140%;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #ffffff;
`;

export default ValidationToastPopup;
