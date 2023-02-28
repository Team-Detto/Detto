import { useGlobalModal, useIsMobile } from 'hooks';
import { useEffect } from 'react';
import {
  SocialLogin,
  SetPositions,
  SetSkills,
  SetProfile,
  Welcome,
  MobileSocialLogin,
  MobileSetPositions,
  MobileSetSkills,
  MobileSetProfile,
  MobileWelcome,
} from 'components/login';
import { allowScroll, preventScroll } from 'utils/modal';

export default function LoginModal() {
  const isMobile = useIsMobile();

  const {
    modal: { page },
    updateModalSize,
  } = useGlobalModal();

  // 페이지에 따라 모달 크기 조절
  useEffect(() => {
    if (isMobile) {
      updateModalSize(modals[page].mobileWidth, modals[page].mobileHeight);
    } else {
      updateModalSize(modals[page].width, modals[page].height);
    }
  }, [page]);

  // 모달이 열려있을 때 body 스크롤 방지
  useEffect(() => {
    const prevScrollY = preventScroll();
    return () => {
      allowScroll(prevScrollY);
    };
  }, []);

  if (isMobile) return modals[page].mobileComponent;
  return modals[page].component;
}

const modals = [
  {
    // 페이지 0 : 로그인
    width: '28.875rem',
    height: '32.5rem',
    mobileWidth: '20rem',
    mobileHeight: '24.875rem',
    component: <SocialLogin />,
    mobileComponent: <MobileSocialLogin />,
  },
  {
    // 페이지 1 : 포지션 선택
    width: '44.25rem',
    height: '32rem',
    mobileWidth: '20rem',
    mobileHeight: '22rem',
    component: <SetPositions />,
    mobileComponent: <MobileSetPositions />,
  },
  {
    // 페이지 2 : 기술스택 선택
    width: '68.0625rem',
    height: '44.75rem',
    mobileWidth: '20rem',
    mobileHeight: '26.1875rem',
    component: <SetSkills />,
    mobileComponent: <MobileSetSkills />,
  },
  {
    // 페이지 3 : 프로필 사진, 닉네임 변경
    width: '47.8125rem',
    height: '38.5625rem',
    mobileWidth: '20rem',
    mobileHeight: '26.1875rem',
    component: <SetProfile />,
    mobileComponent: <MobileSetProfile />,
  },
  {
    // 페이지 4 : 환영합니다!
    width: '37.5625rem',
    height: '22.9375rem',
    mobileWidth: '20rem',
    mobileHeight: '21.5rem',
    component: <Welcome />,
    mobileComponent: <MobileWelcome />,
  },
];
