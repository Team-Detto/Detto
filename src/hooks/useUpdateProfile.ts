import { ChangeEvent, useCallback, useState } from 'react';
import { UserInfo } from 'types/mypage/userInfo';
import { nicknameValidation } from 'utils/validation';

const useUpdateProfile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [validationMessage, setValidationMessage] = useState<string>('');

  const handleUserInfoChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setUserInfo((prev: UserInfo) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    },
    [setUserInfo],
  );

  // 닉네임 변경 핸들러
  const handleNicknameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;

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

      setUserInfo((prevState) => {
        return { ...prevState, displayName: value };
      });
    },
    [],
  );

  return {
    userInfo,
    setUserInfo,
    handleUserInfoChange,
    validationMessage,
    handleNicknameChange,
  };
};

export default useUpdateProfile;

const initialUserInfo = {
  displayName: '',
  photoURL: '',
  isJunior: false,
  positions: [],
  plannerStack: [],
  designerStack: [],
  developerStack: [],
};
