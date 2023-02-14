import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';

interface NicknameInputProps {
  displayName: string;
  onChangeNickname: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validationMessage: string;
}

const NicknameInput = ({
  displayName,
  onChangeNickname,
  validationMessage,
}: NicknameInputProps) => {
  return (
    <InputBox>
      <InfoNicknameInput
        type="text"
        defaultValue={displayName}
        onChange={onChangeNickname}
        minLength={2}
        maxLength={30}
      />
      <ValidationMessage>{validationMessage}</ValidationMessage>
    </InputBox>
  );
};

export default NicknameInput;

const InputBox = styled.div`
  height: 2.875rem;
`;

const InfoNicknameInput = styled.input`
  width: 22rem;
  padding: 0.625rem 1.25rem;
  border: 1px solid #ced3db;
  border-radius: 4px;
`;

const ValidationMessage = styled.p`
  font-size: 0.75rem;
  padding-left: 0.25rem;
  color: ${COLORS.red};
`;
