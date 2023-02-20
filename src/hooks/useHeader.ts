import { authService } from 'apis/firebaseService';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

// 메인 페이지에서 스크롤이 MAIN_SCROLL_Y 값 이상 되면 헤더의 배경색을 투명에서 하얀색으로 변경
const MAIN_SCROLL_Y = 480;

const useHeader = () => {
  const [hideGradient, setHideGradient] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showDropwdown, setShowDropdown] = useState<boolean>(false);
  const localUser = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const isMain = location.pathname === '/';

  // 높이에 따라 배경색 그라디언트 표시 여부 결정하는 함수
  const showHeaderGradientBackground = () => {
    const { scrollY } = window;
    scrollY > MAIN_SCROLL_Y ? setHideGradient(false) : setHideGradient(true);
  };

  // 로그아웃
  const handleLogoutClick = () => {
    signOut(authService).then(() => {
      localStorage.removeItem('user');
      navigate('/', { replace: true });
      setIsLoggedIn(false);
    });
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

  // 메인 페이지일 경우 스크롤에 따른 배경 그라이언트 함수 이벤트 적용
  useEffect(() => {
    if (isMain) {
      window.addEventListener('scroll', showHeaderGradientBackground);
    }

    return () => {
      window.removeEventListener('scroll', showHeaderGradientBackground);
    };
  }, [isMain]);

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
  };
};

export default useHeader;
