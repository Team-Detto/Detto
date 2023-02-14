import styled from '@emotion/styled';
import COLORS from 'assets/styles/colors';
import { useCallback, useState } from 'react';
import { nicknameValidation } from 'utils/validation';
import { UserInfo } from './MyPageInfo';

interface NicknameInputProps {
  nickname: string;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

const NicknameInput = ({ nickname, setUserInfo }: NicknameInputProps) => {
  const [validationMessage, setValidationMessage] = useState<string>('');

  const handleNicknameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      setUserInfo((prevState) => {
        return { ...prevState, nickname: value };
      });
      const isValidate = nicknameValidation(value);

      if (!isValidate) {
        if (e.currentTarget.value.length === 0) {
          setValidationMessage('닉네임은 2자 이상이어야 합니다.');
        } else {
          setValidationMessage('닉네임은 20자 이하여야 합니다.');
        }
      } else {
        setValidationMessage('');
      }
    },
    [],
  );

  return (
    <InputBox>
      <InfoNicknameInput
        type="text"
        defaultValue={nickname}
        onChange={handleNicknameChange}
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
