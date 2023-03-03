import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// 메인 페이지에서 스크롤이 MAIN_SCROLL_Y 값 이상 되면 헤더의 배경색을 투명에서 하얀색으로 변경
const MAIN_SCROLL_Y = 500;

const useGradient = () => {
  const [hideGradient, setHideGradient] = useState<boolean>(true);
  const location = useLocation();
  const isMain = location.pathname === '/';

  // 높이에 따라 배경색 그라디언트 표시 여부 결정하는 함수
  const showHeaderGradientBackground = () => {
    const { scrollY } = window;
    scrollY > MAIN_SCROLL_Y ? setHideGradient(false) : setHideGradient(true);
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

  return {
    isMain,
    hideGradient,
  };
};

export default useGradient;
