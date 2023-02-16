import { ChangeEvent, useCallback, useState } from 'react';
import { nicknameValidation } from 'utils/validation';

const useUpdateProfile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [activeButton, setActiveButton] = useState<boolean>(false);

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

      handleButtonActive();
      setUserInfo((prevState) => {
        return { ...prevState, displayName: value };
      });
    },
    [],
  );

  const handleButtonActive = useCallback(() => {
    if (!activeButton) {
      setActiveButton(true);
    }
  }, []);

  return {
    userInfo,
    setUserInfo,
    handleUserInfoChange,
    validationMessage,
    handleNicknameChange,
    activeButton,
    handleButtonActive,
  };
};

export default useUpdateProfile;

const initialUserInfo = {
  displayName: '',
  email: '',
  photoURL: '',
  isJunior: false,
  positions: [],
  plannerStack: [],
  designerStack: [],
  developerStack: [],
};
