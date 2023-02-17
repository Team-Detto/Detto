import { useGlobalModal } from 'hooks';
import { useEffect } from 'react';
import {
  SocialLogin,
  SetPositions,
  SetSkills,
  SetProfile,
  Welcome,
} from 'components/login';

export default function LoginModal() {
  const {
    modal: { page },
    updateModalSize,
  } = useGlobalModal();

  // 페이지에 따라 모달 크기 조절
  useEffect(() => {
    updateModalSize(modals[page].width, modals[page].height);
  }, [page]);

  return modals[page].component;
}

const modals = [
  {
    // 페이지 0 : 로그인
    width: '41.0625rem',
    height: '31.4375rem',
    component: <SocialLogin />,
  },
  {
    // 페이지 1 : 포지션 선택
    width: '44.0625rem',
    height: '28.875rem',
    component: <SetPositions />,
  },
  {
    // 페이지 2 : 기술스택 선택
    width: '70rem',
    height: '46.625rem',
    component: <SetSkills />,
  },
  {
    // 페이지 3 : 프로필 사진, 닉네임 변경
    width: '47.8125rem',
    height: '38.5625rem',
    component: <SetProfile />,
  },
  {
    // 페이지 4 : 환영합니다!
    width: '37.5625rem',
    height: '22.9375rem',
    component: <Welcome />,
  },
];
