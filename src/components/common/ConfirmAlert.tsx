import styled from '@emotion/styled';

interface props {
  isOpen: boolean;
  onClickEvent: () => void;
  stack: string;
  nickname: string;
  message: string;
  confirmMessage: string;
}

const ConfirmAlert = ({
  isOpen,
  onClickEvent,
  stack,
  nickname,
  message,
  confirmMessage,
}: props) => {
  return (
    <ConfirmAlertBackDrop isOpen={isOpen}>
      <ConfirmAlertContainer isOpen={isOpen}>
        <ConfirmALertInfoContainer>
          <ConfirmAlertAvatar />
          <ConfirmAlertInfoTitle>
            {stack} 작업을 많이 한 팀원이네요!
          </ConfirmAlertInfoTitle>
          <ConfirmAlertInviteTitle>
            {nickname}님을 <br /> {message}?
          </ConfirmAlertInviteTitle>
        </ConfirmALertInfoContainer>
        <ConfirmAlertButtonContainer>
          <ConfirmAlertCancelButton onClick={onClickEvent}>
            No
          </ConfirmAlertCancelButton>
          <ConfirmAlertInviteButton>{confirmMessage}!</ConfirmAlertInviteButton>
        </ConfirmAlertButtonContainer>
      </ConfirmAlertContainer>
    </ConfirmAlertBackDrop>
  );
};

const ConfirmAlertBackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;
const ConfirmAlertContainer = styled.div`
  position: fixed;
  width: 38.125rem;
  height: 25.6875rem;
  left: 50%;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  padding: 15px;
  background: #fff;
  border-radius: 8px;
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
`;
const ConfirmALertInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 2rem;
  gap: 1rem;
`;
const ConfirmAlertAvatar = styled.img`
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background: #6f64f2;
`;
const ConfirmAlertInfoTitle = styled.p`
  width: 20rem;
  height: 1.5rem;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.5rem;
  color: #6b7684;
`;
const ConfirmAlertInviteTitle = styled.p`
  width: 20rem;
  height: 6rem;
  font-weight: 600;
  font-size: 2.125rem;
  text-align: start;
  white-space: pre-line;
  line-height: 140%;
  color: #191f28;
`;
const ConfirmAlertButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
