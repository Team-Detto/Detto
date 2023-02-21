import {} from 'react';
import COLORS from 'assets/styles/colors';
import styled from '@emotion/styled';

interface Props {
  isOpen: boolean;
  message: string;
  subMessage: string;
  onClickEvent: () => void;
  onCloseEvent: () => void;
}

const MobileConfirmAlert = ({
  isOpen,
  message,
  subMessage,
  onClickEvent,
  onCloseEvent,
}: Props) => {
  return (
    <MobileConfirmAlertBackDrop isOpen={isOpen}>
      <MobileConfirmAlertContainer isOpen={isOpen}>
        <MobileConfirmAlertMsgBox>
          <MobileConfirmAlertMsg>{message}</MobileConfirmAlertMsg>
          <MobileConfirmAlertSubMsg>{subMessage}</MobileConfirmAlertSubMsg>
        </MobileConfirmAlertMsgBox>
        <MobileConfirmAlertButtonBox>
          <MobileConfirmAlertCancelButton onClick={onCloseEvent}>
            NO
          </MobileConfirmAlertCancelButton>
          <MobileConfirmAlertComfirmButton onClick={onClickEvent}>
            YES
          </MobileConfirmAlertComfirmButton>
        </MobileConfirmAlertButtonBox>
      </MobileConfirmAlertContainer>
    </MobileConfirmAlertBackDrop>
  );
};

const MobileConfirmAlertBackDrop = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(24, 24, 24, 0.14);
  z-index: 99;
`;
const MobileConfirmAlertContainer = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  width: 21.5rem;
  height: 12.3125rem;
  border-radius: 1rem;
  top: 50%;
  left: 50%;
  background-color: ${COLORS.white};
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  z-index: 999;
`;
const MobileConfirmAlertMsgBox = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const MobileConfirmAlertMsg = styled.p`
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.625rem;
  color: ${COLORS.gray850};
`;
const MobileConfirmAlertSubMsg = styled.p`
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 140%;
  display: flex;
  align-items: center;
  letter-spacing: -0.02em;
  color: ${COLORS.gray750};
`;
const MobileConfirmAlertButtonBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;
const MobileConfirmAlertComfirmButton = styled.button`
  width: 8.75rem;
  height: 3.25rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 17px;
  line-height: 20px;
  color: ${COLORS.white};
  background-color: ${COLORS.violetB400};

  &:hover {
    background-color: ${COLORS.violetB300};
  }
`;
const MobileConfirmAlertCancelButton = styled.button`
  width: 8.75rem;
  height: 3.25rem;
  border-radius: 1rem;
  font-weight: 600;
  font-size: 17px;
  line-height: 20px;
  color: ${COLORS.gray850};
  background-color: ${COLORS.gray100};

  &:hover {
    background-color: ${COLORS.gray200};
  }
`;

export default MobileConfirmAlert;
