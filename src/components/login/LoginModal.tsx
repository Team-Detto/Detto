import { useLoginModal } from 'hooks';
import { useEffect } from 'react';
import {
  LoginPage0,
  LoginPage1,
  LoginPage2,
  LoginPage3,
  LoginPage4,
} from 'components/login';

// 페이지 0 : 로그인
// 페이지 1 : 포지션 선택
// 페이지 2 : 기술스택 선택
// 페이지 3 : 프로필 사진, 닉네임 변경
// 페이지 4 : 환영합니다!

export default function LoginModal() {
  const {
    modal: { page },
    updateModalSize,
  } = useLoginModal();

  // 페이지에 따라 모달 크기 조절
  useEffect(() => {
    modalSizes.forEach((size) => {
      size.page === page && updateModalSize(size.width, size.height);
    });
  }, [page]);

  if (page === 0) return <LoginPage0 />;
  if (page === 1) return <LoginPage1 />;
  if (page === 2) return <LoginPage2 />;
  if (page === 3) return <LoginPage3 />;
  if (page === 4) return <LoginPage4 />;

  return <div>modal</div>;
}

const modalSizes = [
  { page: 0, width: '41.0625rem', height: '31.4375rem' },
  { page: 1, width: '44.0625rem', height: '27.25rem' },
  { page: 2, width: '70rem', height: '39rem' },
  { page: 3, width: '47.8125rem', height: '33.3125rem' },
  { page: 4, width: '37.5625rem', height: '22.9375rem' },
];
