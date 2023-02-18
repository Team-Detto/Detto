import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { mypageInfoButtonActiveState, userInfoState } from '../recoil/atoms';
import { contactValidation, nicknameValidation } from 'utils/validation';

const useUpdateProfile = () => {
  const setUserInfo = useSetRecoilState<UserInfo>(userInfoState);
  const setActiveInfoBtn = useSetRecoilState(mypageInfoButtonActiveState);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [contactValidationMessage, setContactValidationMessage] =
    useState<string>('');

  // 텍스트 인풋 변경 핸들러
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;

      const isValidate =
        name === 'displayName'
          ? nicknameValidation(value)
          : contactValidation(value);

      console.log('isValidate', isValidate);

      if (name === 'displayName' && !isValidate) {
        if (value.length < 2) {
          setValidationMessage('닉네임은 2자 이상이어야 합니다.');
          return;
        } else {
          setValidationMessage('닉네임은 7자 이하여야 합니다.');
          return;
        }
      }

      if (name === 'email' && !isValidate) {
        if (value === '') {
          setContactValidationMessage('이메일을 입력해주세요.');
          return;
        } else {
          setContactValidationMessage('이메일을 올바르게 입력해주세요.');
          return;
        }
      }

      setValidationMessage('');
      setContactValidationMessage('');
      setActiveInfoBtn(true);

      setUserInfo((prevState) => {
        return { ...prevState, [name]: value };
      });
    },
    [],
  );

  return {
    validationMessage,
    handleInputChange,
    contactValidationMessage,
  };
};

export default useUpdateProfile;
