import { useCallback, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
import { userInfoState } from '../recoil/atoms';
import { contactValidation, nicknameValidation } from 'utils/validation';
import { updateUserInfoData } from 'apis/mypageUsers';
import useAuth from './useAuth';
import useToastPopup from './useToastPopup';

// 마이페이지 개인정보를 위한 훅
const useUpdateProfile = () => {
  const [userInfo, setUserInfo] = useRecoilState<UserInfo>(userInfoState);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [contactValidationMessage, setContactValidationMessage] =
    useState<string>('');
  const [defaultUserInfo, setDefaultUserInfo] = useState<UserInfo>(defaultInfo);
  const { uid } = useAuth();
  const { showToast, ToastMessage, handleToastPopup } = useToastPopup();

  // 정보 수정 파이어베이스 mutatation
  const queryClient = useQueryClient();
  const { mutate: updateUserInfoMutate } = useMutation(
    () => updateUserInfoData(uid, userInfo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users', uid]);
      },
    },
  );

  // 텍스트 인풋 변경 핸들러
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;

      const isValidate =
        name === 'displayName'
          ? nicknameValidation(value)
          : contactValidation(value);

      if (!isValidate) {
        if (name === 'displayName') {
          value.length < 2
            ? setValidationMessage('닉네임은 2자 이상이어야 합니다.')
            : setValidationMessage('닉네임은 7자 이하여야 합니다.');
        } else {
          value === ''
            ? setContactValidationMessage('이메일을 입력해주세요.')
            : setContactValidationMessage('이메일을 올바르게 입력해주세요.');
        }
      } else {
        setValidationMessage('');
        setContactValidationMessage('');
      }

      setUserInfo((prevState) => {
        return { ...prevState, [name]: value };
      });
    },
    [],
  );

  // 텍스트 인풋 클리어
  const handleInputClear = useCallback((e: React.MouseEvent<SVGAElement>) => {
    const { name, value } = e.currentTarget
      .previousElementSibling as HTMLInputElement;

    if (value === '') return;

    setUserInfo((prevState) => {
      return { ...prevState, [name]: '' };
    });
  }, []);

  // 정보완료 버튼 유효성 검사
  const checkInfoValidation = () => {
    const nickname = userInfo.displayName;
    if (nickname.length < 2 || nickname.length > 7) {
      handleToastPopup('닉네임은 2자 이상 7자 이하로 입력해주세요.');
      return false;
    }

    if (userInfo.email && !contactValidation(userInfo.email)) {
      handleToastPopup('연락처를 올바르게 입력해주세요.');
      return false;
    }

    if (userInfo.positions.length === 0) {
      handleToastPopup('포지션을 선택해주세요.');
      return false;
    }
    return true;
  };

  const updateDefaultUserInfoState = useCallback((user: UserInfo) => {
    setDefaultUserInfo({
      displayName: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      isJunior: user?.isJunior,
      positions: user?.positions,
      plannerStack: user?.plannerStack || [''],
      designerStack: user?.designerStack || [''],
      developerStack: user?.developerStack || [''],
    });
  }, []);

  return {
    validationMessage,
    handleInputChange,
    handleInputClear,
    contactValidationMessage,
    ToastMessage,
    showToast,
    defaultUserInfo,
    setDefaultUserInfo,
    handleToastPopup,
    checkInfoValidation,
    updateUserInfoMutate,
    updateDefaultUserInfoState,
  };
};

export default useUpdateProfile;

export const defaultInfo = {
  displayName: '',
  email: '' || null,
  photoURL: '',
  isJunior: false,
  positions: [],
  plannerStack: [],
  designerStack: [],
  developerStack: [],
};
