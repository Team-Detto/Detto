import { useGlobalModal, useIsMobile } from 'hooks';
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

export default function LoginModal() {
  const isMobile = useIsMobile();

  const {
    modal: { page },
  } = useGlobalModal();

  if (isMobile) {
    return modals[page].mobileComponent;
  }
  return modals[page].component;
}

const modals = [
  {
    // 페이지 0 : 로그인
    component: <SocialLogin />,
    mobileComponent: <MobileSocialLogin />,
  },
  {
    // 페이지 1 : 포지션 선택
    component: <SetPositions />,
    mobileComponent: <MobileSetPositions />,
  },
  {
    // 페이지 2 : 기술스택 선택
    component: <SetSkills />,
    mobileComponent: <MobileSetSkills />,
  },
  {
    // 페이지 3 : 프로필 사진, 닉네임 변경
    component: <SetProfile />,
    mobileComponent: <MobileSetProfile />,
  },
  {
    // 페이지 4 : 환영합니다!
    component: <Welcome />,
    mobileComponent: <MobileWelcome />,
  },
];
