import { useGlobalModal } from 'hooks';
import { useEffect } from 'react';
import {
  LoginPage0,
  LoginPage1,
  LoginPage2,
  LoginPage3,
  LoginPage4,
} from 'components/login';
import { allowScroll, preventScroll } from 'utils/modal';

export default function LoginModal() {
  const {
    modal: { page },
    updateModalSize,
  } = useGlobalModal();

  // 페이지에 따라 모달 크기 조절
  useEffect(() => {
    updateModalSize(modals[page].width, modals[page].height);
  }, [page]);

  // 모달이 열려있을 때 body 스크롤 방지
  // TODO: 스크롤 없는 페이지에서는 스크롤 생기지 않게 하기
  useEffect(() => {
    const prevScrollY = preventScroll();
    return () => {
      allowScroll(prevScrollY);
    };
  }, []);

  return modals[page].component;
}

const modals = [
  {
    // 페이지 0 : 로그인
    width: '41.0625rem',
    height: '31.4375rem',
    component: <LoginPage0 />,
  },
  {
    // 페이지 1 : 포지션 선택
    width: '44.0625rem',
    height: '28.875rem',
    component: <LoginPage1 />,
  },
  {
    // 페이지 2 : 기술스택 선택
    width: '70rem',
    height: '46.625rem',
    component: <LoginPage2 />,
  },
  {
    // 페이지 3 : 프로필 사진, 닉네임 변경
    width: '47.8125rem',
    height: '38.5625rem',
    component: <LoginPage3 />,
  },
  {
    // 페이지 4 : 환영합니다!
    width: '37.5625rem',
    height: '22.9375rem',
    component: <LoginPage4 />,
  },
];
