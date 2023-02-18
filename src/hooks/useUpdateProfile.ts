import { useCallback, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { mypageInfoButtonActiveState, userInfoState } from '../recoil/atoms';
import { contactValidation, nicknameValidation } from 'utils/validation';

const useUpdateProfile = () => {
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(userInfoState);
  const setActiveInfoBtn = useSetRecoilState(mypageInfoButtonActiveState);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [contactValidationMessage, setContactValidationMessage] =
    useState<string>('');

  // 텍스트 인풋 변경 핸들러
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      const isValidate =
        name === 'nickname'
          ? nicknameValidation(value)
          : contactValidation(value);

      if (!isValidate) {
        if (e.currentTarget.value === '') {
          name === 'nickname'
            ? setValidationMessage('닉네임은 2자 이상이어야 합니다.')
            : setContactValidationMessage('이메일을 입력해주세요.');
        } else {
          name === 'nickname'
            ? setValidationMessage('닉네임은 20자 이하여야 합니다.')
            : setContactValidationMessage('이메일을 올바르게 입력해주세요.');
        }
      } else {
        setValidationMessage('');
        setContactValidationMessage('');
        setActiveInfoBtn(true);
      }

      setUserInfo((prevState) => {
        return { ...prevState, [name]: value };
      });
    },
    [],
  );

  return {
    userInfo,
    setUserInfo,
    validationMessage,
    handleInputChange,

    contactValidationMessage,
  };
};

export default useUpdateProfile;
