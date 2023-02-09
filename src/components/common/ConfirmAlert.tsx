import styled from '@emotion/styled';

interface props {
  isOpen: boolean;
  onClickEvent: () => void;
  message: string;
}

const ConfirmAlert = ({ isOpen, onClickEvent, message }: props) => {
  return (
    <ConfirmAlertContainer isOpen={isOpen}>
      <ConfirmALertInfoContainer>
        <ConfirmAlertInfoTitle>
          작업을 많이 한 팀원이네요!
        </ConfirmAlertInfoTitle>
        <ConfirmAlertInviteTitle>{message}</ConfirmAlertInviteTitle>
      </ConfirmALertInfoContainer>
      <ConfirmAlertButtonContainer>
        <ConfirmAlertCancelButton onClick={onClickEvent}>
          아니오
        </ConfirmAlertCancelButton>
        <ConfirmAlertInviteButton>예</ConfirmAlertInviteButton>
      </ConfirmAlertButtonContainer>
    </ConfirmAlertContainer>
  );
};

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
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
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
