import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userInfoState } from '../recoil/atoms';
import { useGradient, useAuth } from 'hooks';
import { signOut } from 'firebase/auth';
import { authService } from 'apis/firebaseService';
import { defaultInfo } from './useUpdateProfile';
import { resetAmplitude } from 'utils/amplitude';

const useHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showDropwdown, setShowDropdown] = useState<boolean>(false);
  const setUserInfo = useSetRecoilState(userInfoState);

  const navigate = useNavigate();

  const localUser = useAuth();
  const { isMain, hideGradient } = useGradient();

  // 로그아웃
  const handleLogoutClick = () => {
    signOut(authService).then(() => {
      localStorage.removeItem('user');
      navigate('/', { replace: true });
      setUserInfo(defaultInfo);
      window.location.reload();
    });
    resetAmplitude();
  };

  // 회원탈퇴
  const withdrawalAccount = () => {
    localStorage.removeItem('user');
    setUserInfo(defaultInfo);
    navigate('/', { replace: true });
  };

  // 모바일에서 드롭다운 메뉴 표시 여부
  const handleDropdownClick = () => {
    setShowDropdown((prev) => !prev);
  };

  // 모바일에서 이전 페이지 돌아가기
  const handleGoBackClick = () => {
    navigate(-1);
  };

  // 드롭다운 메뉴 닫기
  const closeDropdownMenu = () => {
    setShowDropdown(false);
  };

  // 유저 로그인 여부 판단
  useEffect(() => {
    // 빈 객체({}) 인지 판단
    if (
      Object.keys(localUser).length !== 0 &&
      localUser.constructor === Object
    ) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [localUser]);

  return {
    isMain,
    isLoggedIn,
    showDropwdown,
    hideGradient,
    handleLogoutClick,
    handleDropdownClick,
    handleGoBackClick,
    closeDropdownMenu,
    withdrawalAccount,
  };
};

export default useHeader;
