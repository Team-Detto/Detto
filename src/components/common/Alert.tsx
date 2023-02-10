import styled from '@emotion/styled';
import { useEffect } from 'react';
import { allowScroll, preventScroll } from 'utils/modal';

interface props {
  isOpen: boolean;
  onClickEvent: () => void;
  mainMsg: string;
  subMsg: string;
}

const Alert = ({ isOpen, onClickEvent, mainMsg, subMsg }: props) => {
  useEffect(() => {
    if (isOpen) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [isOpen]);

  return (
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
  );
};

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
  background: #6f64f2;
  color: #ffffff;
  border-radius: 16px;
`;

export default Alert;
