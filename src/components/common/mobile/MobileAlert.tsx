import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useEffect } from 'react';
import { allowScroll, preventScroll } from 'utils/modal';

interface props {
  isOpen: boolean;
  onClickEvent: () => void;
  mainMsg: string;
  subMsg: string;
  page?: string;
}

const MobileAlert = ({
  isOpen,
  onClickEvent,
  mainMsg,
  subMsg,
  page,
}: props) => {
  useEffect(() => {
    if (page !== ('sendNote' || 'apply')) {
      if (isOpen) {
        const prevScrollY = preventScroll();
        return () => {
          allowScroll(prevScrollY);
        };
      }
    }
  }, [isOpen]);

  return (
    <AlertBackDrop isOpen={isOpen}>
      <AlertContainer isOpen={isOpen}>
        <AlertMessageContainer>
          <AlertMessageEmotion>🎉</AlertMessageEmotion>
          <AlertMessageMainMessage>{mainMsg}!</AlertMessageMainMessage>
          <AlertMessageSubMessage>{subMsg}</AlertMessageSubMessage>
        </AlertMessageContainer>
        <AlertButtonContainer>
          <AlertButton onClick={onClickEvent}>확인</AlertButton>
        </AlertButtonContainer>
      </AlertContainer>
    </AlertBackDrop>
  );
};

export default MobileAlert;

const AlertBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  background: rgba(24, 24, 24, 0.14);
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;

const AlertContainer = styled.div`
  position: fixed;
  width: 20rem;
  height: 18rem;
  left: 50%;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  padding: 0.9375rem;
  background: ${COLORS.white};
  border-radius: 1rem;
  box-shadow: 0rem 0.25rem 0.625rem rgba(117, 117, 117, 0.25);
  z-index: 999;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;
const AlertMessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  gap: 0.5rem;
`;
const AlertMessageEmotion = styled.p`
  width: 5rem;
  height: 5rem;
  font-size: 3.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AlertMessageMainMessage = styled.p`
  width: 100%;
  text-align: start;
  /* margin-top: 2rem; */
  height: 1.75rem;
  font-weight: 700;
  font-size: 1.125rem;
  color: ${COLORS.gray850};
`;
const AlertMessageSubMessage = styled.p`
  width: 100%;
  text-align: start;
  font-weight: 500;
  font-size: 0.875rem;
  color: ${COLORS.gray750};
`;
const AlertButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const AlertButton = styled.button`
  padding: 1.3125rem 5.9375rem;

  width: 17.75rem;
  height: 3.25rem;

  background: #6f64f2;
  border-radius: 1rem;
  color: ${COLORS.white};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${COLORS.violetB300};
  }
`;
