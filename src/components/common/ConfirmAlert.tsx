import { useEffect } from 'react';
import { allowScroll, preventScroll } from 'utils/modal';
import styled from '@emotion/styled';

interface props {
  isOpen: boolean;
  message: string;
  subMessage: string;
  onClickEvent: () => void;
  onCloseEvent: () => void;
}

const ConfirmAlert = ({
  isOpen,
  message,
  subMessage,
  onClickEvent,
  onCloseEvent,
}: props) => {
  useEffect(() => {
    if (isOpen) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [isOpen]);

  return (
    <ConfirmAlertContainer isOpen={isOpen}>
      <ConfirmALertInfoContainer>
        <ConfirmAlertInviteTitle>{message}</ConfirmAlertInviteTitle>
        <ConfirmAlertSubTitle>{subMessage}</ConfirmAlertSubTitle>
      </ConfirmALertInfoContainer>
      <ConfirmAlertButtonContainer>
        <ConfirmAlertCancelButton onClick={onCloseEvent}>
          NO
        </ConfirmAlertCancelButton>
        <ConfirmAlertInviteButton onClick={onClickEvent}>
          YES
        </ConfirmAlertInviteButton>
      </ConfirmAlertButtonContainer>
    </ConfirmAlertContainer>
  );
};

const ConfirmAlertContainer = styled.div`
  position: fixed;
  width: 38.125rem;
  height: 19.6875rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  background: #fff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  z-index: 999;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;
const ConfirmALertInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
`;
const ConfirmAlertInviteTitle = styled.p`
  width: 100%;
  font-weight: 600;
  font-size: 2.125rem;
  text-align: start;
  white-space: pre-line;
  line-height: 140%;
  color: #191f28;
`;
const ConfirmAlertSubTitle = styled.p`
  width: 100%;
  height: 1.5rem;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: #6b7684;
`;
const ConfirmAlertButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
`;
const ConfirmAlertCancelButton = styled.button`
  width: 15.9375rem;
  height: 3.75rem;
  background: #f2f4f6;
  border-radius: 0.5rem;
`;
const ConfirmAlertInviteButton = styled.button`
  width: 15.9375rem;
  height: 3.75rem;
  background: #6f64f2;
  color: #ffffff;
  border-radius: 0.5rem;
`;

export default ConfirmAlert;
