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

const Alert = ({ isOpen, onClickEvent, mainMsg, subMsg, page }: props) => {
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
          <AlertMessageEmotion>'🎉'</AlertMessageEmotion>
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

const AlertBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
  background: rgba(24, 24, 24, 0.14);
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;

const AlertContainer = styled.div`
  position: fixed;
  width: 30.375rem;
  height: 22.9375rem;
  left: 50%;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  padding: 15px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(117, 117, 117, 0.25);
  z-index: 999;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;
const AlertMessageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1rem;
`;
const AlertMessageEmotion = styled.p`
  width: 100%;
  text-align: start;
  height: 3.75rem;
  font-weight: 600;
  font-size: 3.75rem;
  line-height: 4.5rem;
`;
const AlertMessageMainMessage = styled.p`
  width: 100%;
  text-align: start;
  margin-top: 2rem;
  height: 1.75rem;
  font-weight: 600;
  font-size: 2.125rem;
  line-height: 1.75rem;
  color: #191f28;
`;
const AlertMessageSubMessage = styled.p`
  width: 100%;
  text-align: start;
  height: 1.5rem;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: #6b7684;
`;
const AlertButtonContainer = styled.div`
  width: 100%;
`;
const AlertButton = styled.button`
  width: 27.75rem;
  height: 3.875rem;
  background: ${COLORS.violetB400};
  color: #ffffff;
  border-radius: 16px;
  font-weight: 600;
  transition: all 100ms ease-in-out;

  &:hover {
    background-color: ${COLORS.violetB300};
  }
`;

export default Alert;
