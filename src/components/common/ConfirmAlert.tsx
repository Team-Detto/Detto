import { useEffect } from 'react';
import { allowScroll, preventScroll } from 'utils/modal';
import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

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
    <ConfirmAlertBackDrop isOpen={isOpen}>
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
    </ConfirmAlertBackDrop>
  );
};

export const ConfirmAlertBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
  background: rgba(24, 24, 24, 0.14);
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
  z-index: 99;
`;

export const ConfirmAlertContainer = styled.div`
  position: fixed;
  width: 38.125rem;
  height: 19.6875rem;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  background: ${COLORS.white};
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  z-index: 999;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;
export const ConfirmALertInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
`;
export const ConfirmAlertInviteTitle = styled.p`
  width: 100%;
  font-weight: 600;
  font-size: 2.125rem;
  text-align: start;
  white-space: pre-line;
  line-height: 140%;
  color: ${COLORS.gray900};
`;
export const ConfirmAlertSubTitle = styled.p`
  width: 100%;
  height: 1.5rem;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: ${COLORS.gray750};
`;
export const ConfirmAlertButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
`;
export const ConfirmAlertCancelButton = styled.button`
  width: 15.9375rem;
  height: 3.75rem;
  background: ${COLORS.gray100};
  border-radius: 0.5rem;
  transition: all 100ms ease-in-out;
  color: #505967; //색상표에 없음
  font-weight: 600;

  &:hover {
    background-color: ${COLORS.gray200};
  }
`;
const ConfirmAlertInviteButton = styled(ConfirmAlertCancelButton)`
  background: ${COLORS.violetB400};
  color: ${COLORS.white};

  &:hover {
    background-color: ${COLORS.violetB300};
  }
`;

export default ConfirmAlert;
