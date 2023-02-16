import { ChangeEvent, useCallback, useState } from 'react';
import { contactValidation, nicknameValidation } from 'utils/validation';

const useUpdateProfile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [contactValidationMessage, setContactValidationMessage] =
    useState<string>('');
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
      }

      handleButtonActive();
      setUserInfo((prevState) => {
        return { ...prevState, [name]: value };
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
    handleInputChange,
    activeButton,
    handleButtonActive,
    contactValidationMessage,
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
